/**
 * useDebounce Hook
 *
 * Debounces a value - delays updating the value until the user
 * stops typing for a specified delay.
 *
 * Why use debouncing?
 * - Improves performance by reducing the number of filter operations
 * - Better UX - doesn't filter on every keystroke
 * - Reduces unnecessary re-renders
 *
 * Example: If user types "John", without debouncing we'd filter 4 times.
 * With debouncing, we only filter once after they finish typing.
 */


'use client';

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        /**
         * Set up a timer to update the debounced value after the delay
         * If the value changes before the timer completes, the timer is cleared
         * and a new one is set up.
         */
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        /**
         * Cleanup function - clears the timer if:
         * 1. The value changes again (user keeps typing)
         * 2. The component unmounts
         *
         * This ensures we only set the debounced value after the user
         * has stopped changing the value for the full delay period.
         */

    return () => {
        clearTimeout(timer);
    };
}, [value, delay]); // Re-run effect when value or delay changes

return debouncedValue;
}