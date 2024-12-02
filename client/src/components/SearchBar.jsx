import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import searchIcon from '../assets/search.svg';
import notFound from '../assets/not-found.svg';
import loading from '../assets/loading.svg';

function SearchBar(props) {
  const { onResultChange } = props;
  const inputRef = useRef(null);

  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setShowResults(false);
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const handleSubmit = async () => {
    if (inputRef.current) inputRef.current.focus();
    if (input.length === 0) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.post('/search', {
        input,
      });
      const searchResults = response.data;
      setResults(searchResults);
      setShowResults(true);

      searchResults.forEach(async (result, index) => {
        try {
          const coverResponse = await axios.get(
            `https://bookcover.longitood.com/bookcover/${result.isbn}`
          );
          setResults((prevResults) =>
            prevResults.map((r, i) =>
              i === index ? { ...r, cover: coverResponse.data.url } : r
            )
          );
        } catch {
          setResults((prevResults) =>
            prevResults.map((r, i) =>
              i === index ? { ...r, cover: notFound } : r
            )
          );
        }
      });
    } catch (err) {
      console.error('Error searching for book:', err);
    }
  };

  function singleResult(result) {
    const handleSelectResult = () => {
      setShowResults(false);
      onResultChange(result);
    };

    return (
      <button onClick={handleSelectResult} className="single-result">
        <img
          src={
            result.cover
              ? result.cover === 'loading'
                ? loading
                : result.cover
              : notFound
          }
          alt={result.title}
          className="book-cover"
        />
        <div className="result-info">
          <strong>{result.title}</strong>
          <div>{result.author}</div>
        </div>
      </button>
    );
  }

  return (
    <div className="add-search" onBlur={handleBlur} onFocus={handleFocus}>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a title..."
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit} className="search-btn">
          <img src={searchIcon} className="search-icon" alt="Search" />
        </button>
      </div>
      <div
        className={`search-results ${
          results.length > 0 && showResults ? 'show' : ''
        }`}
      >
        <ul className="search-list">{results.map(singleResult)}</ul>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onResultChange: PropTypes.func.isRequired,
};

export default SearchBar;
