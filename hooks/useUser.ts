/**
 * useUsers Hook
 *
 * Custom hook that encapsulates all user data management logic.
 *
 * Responsibilities:
 * - Fetching users from API
 * - Managing users state
 * - Updating individual users
 * - Providing loading and error states
 *
 * Benefits of this approach:
 * 1. Separation of concerns - data logic is separate from UI
 * 2. Reusability - can be used in multiple components
 * 3. Testability - easier to test isolated logic
 * 4. Cleaner components - components focus only on rendering
 */
'use client';

import {useState, useEffect} from 'react';
import {User} from '@/types/user';

interface UseUsersReturn {
    users: User[];
    loading: boolean;
    error: string | null;
    updateUser: (id: number, updates: Partial<User>) => void;
}
/**
 * Fetches users from JSONPlaceholder API
 * This is a pure function that can be easily tested
 */

async function fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export function useUsers(): UseUsersReturn {
    // State for users array
    const [users, setUsers] = useState<User[]>([]);
    // Loading state to show loading indicators
    const [loading, setLoading] = useState(true);
    // Error state for error handling
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadUsers() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchUsers();

                // Only update state if component is still mounted

                if (isMounted) {
                    setUsers(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError((err as Error).message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadUsers();

        // Cleanup function to set flag when component unmounts

        return () => {
            isMounted = false;
        };
    }, []);

    /**
     * Updates a user in the local state
     *
     * This performs an optimistic update - we update the UI immediately
     * without waiting for a server response.
     *
     * In a real application, you would:
     * 1. Send the update to the server
     * 2. Handle success/failure
     * 3. Possibly revert on failure
     */

    const updateUser = (id: number, updates: Partial<User>) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? {...user, ...updates} : user
            )
        );
    };

    return {users, loading, error, updateUser};
}