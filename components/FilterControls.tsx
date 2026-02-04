'use client';

import React from 'react';

interface FilterControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCity: string;
    onCityChange: (city: string) => void;
    cities: string[];
}

export function FilterControls({
                                   searchQuery,
                                   onSearchChange,
                                   selectedCity,
                                   onCityChange,
                                   cities,
                               }: FilterControlsProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCityChange(e.target.value);
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Input */}
                <div>
                    <label
                        htmlFor="search"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Search by Name
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Type to search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Helper text */}
                    <p className="text-xs text-gray-500 mt-1">
                        Search filters as you type
                    </p>
                </div>

                {/* City Filter Dropdown */}
                <div>
                    <label
                        htmlFor="city-filter"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Filter by City
                    </label>
                    <select
                        id="city-filter"
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {/* Default option - shows all users */}
                        <option value="">All Cities</option>

                        {/* Dynamically generated city options */}
                        {cities.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {/* Helper text showing current filter status */}
                    <p className="text-xs text-gray-500 mt-1">
                        {selectedCity ? `Showing users from ${selectedCity}` : 'Showing all cities'}
                    </p>
                </div>
            </div>
        </div>
    );
}