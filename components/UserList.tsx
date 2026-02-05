/**
 * UserList Component
 *
 * Component responsible for rendering the list of users.
 *
 * Responsibilities:
 * - Render list of UserCard components
 * - Show loading state
 * - Show error state
 * - Show empty state (no users found)
 * - Handle edit action for each user
 *
 * Design decisions:
 * - Uses stable keys (user.id) for list items - critical for React performance
 * - Separates concerns - this component handles rendering, not filtering
 * - Provides good UX with loading, error, and empty states
 *
 * Props:
 * - users: Array of users to display
 * - loading: Loading state
 * - error: Error message if fetch failed
 * - onEditUser: Callback when edit is clicked
 */

'use client';

import React from 'react';
import {User} from "@/types/user";
import {UserCard} from "@/components/UserCard";

interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onEditUser: (user: User) => void;
}

export function UserList({users, loading, error, onEditUser}: UserListProps) {
    /**
     * Loading State
     *
     * Shows while data is being fetched.
     * In a production app, you might want a skeleton loader
     * for better perceived performance.
     */
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }
    /**
     * Error State
     *
     * Shows if the fetch request failed.
     * Provides clear feedback to the user about what went wrong.
     */
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 font-medium mb-2">Error loading users</p>
                <p className="text-red-600 text-sm">{error}</p>
            </div>
        );
    }
    /**
     * Empty State
     *
     * Shows when no users match the current filters.
     * Helps user understand why they're seeing no results.
     */
    if (users.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No users found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
        );
    }
    /**
     * Users Grid
     *
     * Renders users in a responsive grid layout:
     * - 1 column on mobile
     * - 2 columns on medium screens
     * - 3 columns on large screens
     *
     * IMPORTANT: We use user.id as the key, not array index.
     * This is critical for:
     * 1. React's reconciliation algorithm
     * 2. Preventing unnecessary re-renders
     * 3. Maintaining component state correctly
     *
     * Never use array index as key when items can be reordered,
     * filtered, or removed!
     */

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
                <UserCard
                    key={user.id} // Stable key from data, not index
                    user={user}
                    onEdit={() => onEditUser(user)}
                />
            ))}
        </div>
    );
}