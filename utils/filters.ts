/**
 * Filter Utilities
 *
 * Pure functions for filtering user data.
 *
 * Why separate filtering logic:
 * 1. Keeps components clean and focused on rendering
 * 2. Easy to test - pure functions with predictable output
 * 3. Performance - can memoize results
 * 4. Reusability - can use same logic in different components
 *
 * All functions are case-insensitive for better UX.
 */

import { User } from '@/types/user';

/**
 * Filters users by name search query
 *
 * Performs case-insensitive partial match on user names.
 * Returns all users if query is empty.
 */

export function filterUsersByName(users: User[], query: string): User[] {
    if (!query.trim()) {
        return users;
    }
    const lowerQuery = query.toLowerCase();

    return users.filter(user =>
        user.name.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filters users by city
 *
 * Exact match (case-insensitive) on city name.
 * Returns all users if no city is selected.
 *
 */

export function filterUsersByCity(users: User[], city: string): User[] {
    // Return all users if no city selected
    if (!city) {
        return users;
    }

    const lowerCity = city.toLowerCase();

    return users.filter(user =>
        user.address.city.toLowerCase() === lowerCity
    );
}
/**
 * Applies multiple filters to users array
 *
 * This is the main filtering function that combines all filters.
 * Filters are applied in sequence: name first, then city.
 *
 * Using function composition makes it easy to add more filters later.
 */

export function applyFilters(
    users: User[],
    searchQuery: string,
    selectedCity: string
): User[] {
    let filtered = users;

    // Apply name filter
    filtered = filterUsersByName(filtered, searchQuery);

    // Apply city filter
    filtered = filterUsersByCity(filtered, selectedCity);

    return filtered;
}
/**
 * Extracts unique cities from users array
 *
 * Used to populate the city filter dropdown.
 * Returns sorted array of unique city names.
 */
export function getUniqueCities(users: User[]): string[] {
    // Use Set to get unique values
    const cities = new Set(users.map(user => user.address.city));

    // Convert Set to array and sort alphabetically
    return Array.from(cities).sort();
}