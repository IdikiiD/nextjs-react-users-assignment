/**
 * User Types
 *
 * This file contains all type definitions related to users.
 * Keeping types in a separate file ensures:
 * 1. Single source of truth for data structure
 * 2. Easy to maintain and update
 * 3. Can be imported across components
 */

/**
 * Address structure from JSONPlaceholder API
 */
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

/**
 * Company structure from JSONPlaceholder API
 */

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

/**
 * Complete User model matching JSONPlaceholder API response
 * We keep all fields even if not displaying them all,
 * to maintain data integrity when updating users
 */

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

/**
 * Editable user fields
 * This type represents only the fields that can be edited in the form.
 * Using a separate type makes the form component more focused and clear.
 */

export interface EditableUser {
    name: string;
    email: string;
    city: string;
}

/**
 * Form validation errors
 * Maps field names to error messages
 */
export interface FormErrors {
    name?: string;
    email?: string;
    city?: string;
}