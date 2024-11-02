import React, { useState } from 'react';
import axios from 'axios';
import searchIcon from '../assets/search.svg';

function SearchBar() {
    const [input, setInput] = useState('');

    const handleChange = async (event) => {
        const value = event.target.value;
        setInput(value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/search', { input });
            console.log(response.data);
        } catch (err) {
            console.error('Error searching for book:', err);
        }
    }


  return (
    <div className="add-search">
      <div className="search-bar input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a title..."
          value={input}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className="search-btn">
          <img src={searchIcon} className="search-icon" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;