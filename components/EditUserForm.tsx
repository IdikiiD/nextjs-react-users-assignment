/**
 * EditUserForm Component
 *
 * Form component for editing user information.
 *
 * Responsibilities:
 * - Render controlled form inputs
 * - Handle form state
 * - Validate input data
 * - Display validation errors
 * - Submit form data
 *
 * Design decisions:
 * - Controlled inputs (React manages input state)
 * - Real-time validation on blur for better UX
 * - Submit validation to prevent invalid data
 * - Clear separation between form logic and validation logic
 *
 * Props:
 * - user: User being edited (for initial values)
 * - onSave: Callback with updated data
 * - onCancel: Callback to close form
 */

'use client';

import React, {useState} from 'react';
import {User, EditableUser, FormErrors} from '@/types/user';
import {validateUserForm, hasErrors} from '@/utils/validation';

interface EditUserFormProps {
    user: User;
    onSave: (updates: Partial<User>) => void;
    onCancel: () => void;
}

export function EditUserForm({user, onSave, onCancel}: EditUserFormProps) {
    /**
     * Form state - contains current values of form fields
     *
     * We initialize with user data and flatten the city field
     * from user.address.city for easier form handling.
     */
    const [formData, setFormData] = useState<EditableUser>({
        name: user.name,
        email: user.email,
        city: user.address.city,
    });
    /**
     * Validation errors state
     *
     * Stores error messages for each field.
     * Empty object means no errors.
     */

    const [errors, setErrors] = useState<FormErrors>({});
    /**
     * Handles input changes for all form fields
     *
     * Using a single handler for all inputs:
     * - Reduces code duplication
     * - Easier to maintain
     * - Follows DRY principle
     *
     * The input name must match the formData property name.
     */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        /**
         * Clear error for this field when user starts typing
         * Provides immediate feedback that they're fixing the issue
         */
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };
    /**
     * Handles blur event - validates field when user leaves it
     *
     * We validate on blur instead of on every keystroke:
     * - Better UX - doesn't show errors while user is typing
     * - Better performance - fewer validation calls
     * - Less distracting for the user
     */
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;

        // Validate only the current field
        const fieldErrors = validateUserForm(formData);

        // Update errors only for this field
        if (fieldErrors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: fieldErrors[name as keyof FormErrors],
            }));
        }
    };
    /**
     * Handles form submission
     *
     * Flow:
     * 1. Prevent default form submission
     * 2. Validate all fields
     * 3. If errors exist, show them and stop
     * 4. If valid, prepare updates and call onSave
     *
     * We convert the flat formData back to the nested User structure
     * that matches the User type.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const validationErrors = validateUserForm(formData);

        // If there are errors, show them and don't submit
        if (hasErrors(validationErrors)) {
            setErrors(validationErrors);
            return;
        }

        /**
         * Prepare updates in the format expected by the parent
         *
         * We need to restructure the flat formData back into
         * the nested User structure, specifically for address.city
         */
        const updates: Partial<User> = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            address: {
                ...user.address,
                city: formData.city.trim(),
            },
        };


        onSave(updates);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                {/* Modal Header */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {/* Error message for name */}
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {/* Error message for email */}
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* City Field */}
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.city
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {/* Error message for city */}
                        {errors.city && (
                            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        {/* Cancel button - secondary action */}
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>

                        {/* Submit button - primary action */}
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}