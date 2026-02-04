import { User } from '@/types/user';

export function filterUsersByName(users: User[], query: string): User[] {
    if (!query.trim()) {
        return users;
    }
    const lowerQuery = query.toLowerCase();

    return users.filter(user =>
        user.name.toLowerCase().includes(lowerQuery)
    );
}

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
export function getUniqueCities(users: User[]): string[] {
    // Use Set to get unique values
    const cities = new Set(users.map(user => user.address.city));

    // Convert Set to array and sort alphabetically
    return Array.from(cities).sort();
}