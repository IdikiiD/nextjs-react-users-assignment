/**
 * UserCard Component
 *
 * Presentational component that displays a single user's information.
 *
 * Responsibilities:
 * - Display user data (name, email, city)
 * - Provide edit action button
 * - Visual presentation only, no business logic
 *
 * Design decisions:
 * - Uses React.memo for performance - only re-renders if props change
 * - Receives callback for edit action (separation of concerns)
 * - Simple, focused component with single responsibility
 *
 * Props:
 * - user: User data to display
 * - onEdit: Callback function when edit button is clicked
 */

'use client';

import React from 'react';
import {User} from '@/types/user';

interface UserCardProps {
    user: User;
    onEdit: () => void;
}

/**
 * Using React.memo to prevent unnecessary re-renders.
 *
 * This component will only re-render if:
 * 1. The user prop changes (by reference)
 * 2. The onEdit function reference changes
 *
 * For better optimization, consider using useCallback for onEdit
 * in the parent component.
 */

export const UserCard = React.memo<UserCardProps>(({user, onEdit}) => {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                {/* User Name - Primary information */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {user.name}
                </h3>

                {/* User Email */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <span className="text-sm font-medium w-16">Email:</span>
                        <span className="text-sm">{user.email}</span>
                    </div>

                    {/* User City - extracted from nested address object */}
                    <div className="flex items-center text-gray-600">
                        <span className="text-sm font-medium w-16">City:</span>
                        <span className="text-sm">{user.address.city}</span>
                    </div>
                </div>

                {/* Edit Button */}
                <button
                    onClick={onEdit}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Edit
                </button>
            </div>
        );
    }
);
