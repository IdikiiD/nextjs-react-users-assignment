/**
 * Validation Utilities
 *
 * Pure functions for form validation.
 * Keeping validation separate from components makes it:
 * 1. Reusable across different forms
 * 2. Easy to test
 * 3. Easy to maintain and update rules
 */
import {FormErrors, EditableUser} from '@/types/user';

/**
 * Validates email format using a regex pattern
 *
 * This is a simple email validation. In production, you might want:
 * - More sophisticated regex
 * - Server-side validation
 * - Email verification
 */
export function isValidEmail(email: string): boolean {
    // Basic email regex - checks for format: anything@anything.anything
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Validates all form fields and returns errors
 *
 * This function contains all validation logic in one place.
 * Returns an object with error messages for invalid fields.
 *
 * Validation rules:
 * - Name: required, minimum 2 characters
 * - Email: required, valid format
 * - City: required, minimum 2 characters
 *
 */

export function validateUserForm(formData: EditableUser): FormErrors {
    const errors: FormErrors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
        errors.name = 'Name is required';
    } else if (trimmedName.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(trimmedEmail)) {
        errors.email = 'Please enter a valid email address';
    }
    // City validation

    const trimmedCity = formData.city.trim();
    if (!trimmedCity) {
        errors.city = 'City is required';
    } else if (trimmedCity.length < 2) {
        errors.city = 'City must be at least 2 characters';
    }
    return errors;
}
export function hasErrors(errors: FormErrors): boolean {
    return Object.keys(errors).length > 0;
}