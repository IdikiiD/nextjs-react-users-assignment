import {FormErrors, EditableUser} from '@/types/user';

export function isValidEmail(email: string): boolean {
    // Basic email regex - checks for format: anything@anything.anything
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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