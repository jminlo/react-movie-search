import React, { useState } from 'react';

import '../styles/search_section.css'

function TitleSearch({ onTitleSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        const trimmedText = searchText.trim();
        if (trimmedText) {
            onTitleSearch(trimmedText);
        }
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className='search-section'>
            <input
                type="text"
                placeholder="Enter title"
                value={searchText}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search Title</button>
        </div>
    );
}

export default TitleSearch;