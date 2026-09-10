import React, { useState } from 'react';

import '../styles/search_section.css'

function ActorSelect({ onActorSelect, onActorChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = async () => {
        if (!inputValue.trim()) return;
        try {
            const response = await fetch(`/actors/${inputValue}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            onActorSelect(data);
            onActorChange(inputValue);
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className='search-section'>
            <input
                type="text"
                placeholder="Enter actor's name"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search Actor</button>
        </div>
    );
}

export default ActorSelect;