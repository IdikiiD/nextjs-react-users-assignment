'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';

interface UseUsersReturn{
    users: User[];
    loading: boolean;
    error: string | null;
    updateUser: (id: number, updates: Partial<User>) => void;
}

async function fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export function useUsers(): UseUsersReturn {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadUsers() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchUsers();

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

        return () => {
            isMounted = false;
        };
    }, []);

    const updateUser = (id: number, updates: Partial<User>) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, ...updates } : user
            )
        );
    };

    return { users, loading, error, updateUser };
}