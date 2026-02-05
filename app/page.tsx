/**
 * UsersPage Component
 * 
 * Main container component for the user management feature.
 * This is a CLIENT component (uses hooks and interactivity).
 * 
 * Responsibilities:
 * - Fetch and manage users data (via useUsers hook)
 * - Manage filter state (search query, selected city)
 * - Apply filters to users list
 * - Handle user editing flow
 * - Coordinate between all child components
 * 
 * Architecture:
 * - Uses custom hooks for data management (useUsers, useDebounce)
 * - Uses utility functions for filtering (applyFilters, getUniqueCities)
 * - Delegates rendering to specialized components
 * - Follows container/presentational pattern
 * 
 * Data Flow:
 * 1. useUsers hook fetches data and provides updateUser function
 * 2. User types in search/filter -> state updates
 * 3. useMemo calculates filtered list (prevents unnecessary recalculation)
 * 4. Filtered list passed to UserList component
 * 5. User clicks Edit -> modal opens with EditUserForm
 * 6. Form submitted -> updateUser called -> state updates -> UI updates
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { User } from '@/types/user';

import { useDebounce } from '@/hooks/useDebounce';
import { applyFilters, getUniqueCities } from '@/utils/filters';
import { FilterControls } from '@/components/FilterControls';
import { UserList } from '@/components/UserList';
import { EditUserForm } from '@/components/EditUserForm';
import {useUsers} from "@/hooks/useUser";

export default function UsersPage() {
  /**
   * Data Management Hook
   * 
   * useUsers encapsulates all data fetching and state management.
   * Returns users array, loading/error states, and updateUser function.
   */
  const { users, loading, error, updateUser } = useUsers();

  /**
   * Filter State
   * 
   * searchQuery: Current text in search input
   * selectedCity: Currently selected city in dropdown (empty string = all cities)
   */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  /**
   * Debounced Search Query
   * 
   * We debounce the search query to improve performance.
   * Instead of filtering on every keystroke, we wait 300ms
   * after the user stops typing.
   * 
   * Benefits:
   * - Reduces number of filter operations
   * - Reduces re-renders
   * - Better UX (less flickering)
   */
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  /**
   * Edit Modal State
   * 
   * Tracks which user is being edited.
   * null = modal closed
   * User object = modal open for that user
   */
  const [editingUser, setEditingUser] = useState<User | null>(null);

  /**
   * Unique Cities List
   * 
   * useMemo ensures we only recalculate cities when users array changes.
   * Without memoization, this would run on every render.
   * 
   * Dependencies: [users]
   * - Recalculates only when users array changes
   * - Returns same reference if users array hasn't changed
   */
  const cities = useMemo(() => {
    return getUniqueCities(users);
  }, [users]);

  /**
   * Filtered Users List
   * 
   * useMemo prevents unnecessary filtering operations.
   * Filtering only happens when:
   * 1. users array changes
   * 2. debouncedSearchQuery changes (after 300ms of no typing)
   * 3. selectedCity changes
   * 
   * This is critical for performance when the users list is large.
   * Without memoization, filtering would run on EVERY render,
   * even if filters haven't changed.
   */
  const filteredUsers = useMemo(() => {
    return applyFilters(users, debouncedSearchQuery, selectedCity);
  }, [users, debouncedSearchQuery, selectedCity]);

  /**
   * Edit Handler
   * 
   * useCallback ensures this function has a stable reference.
   * Without it, a new function would be created on every render,
   * causing child components to re-render unnecessarily.
   * 
   * Opens the edit modal for the specified user.
   */
  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  /**
   * Save Handler
   * 
   * Called when user submits the edit form.
   * 
   * Flow:
   * 1. Update user in state (via useUsers hook)
   * 2. Close modal
   * 
   * The updateUser function does an optimistic update,
   * immediately reflecting changes in the UI.
   */
  const handleSaveUser = (updates: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser.id, updates);
      setEditingUser(null); // Close modal
    }
  };

  /**
   * Cancel Handler
   * 
   * Closes the edit modal without saving changes.
   */
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            View, search, and edit user information
          </p>
        </header>

        {/* Filter Controls */}
        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
        />

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}

        {/* User List */}
        <UserList
          users={filteredUsers}
          loading={loading}
          error={error}
          onEditUser={handleEditUser}
        />

        {/* Edit Modal - Only renders when editingUser is not null */}
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
}
