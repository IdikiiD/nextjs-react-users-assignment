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
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 font-medium mb-2">Error loading users</p>
                <p className="text-red-600 text-sm">{error}</p>
            </div>
        );
    }
    if (users.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No users found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
        );
    }

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