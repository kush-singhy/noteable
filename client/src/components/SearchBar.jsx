import React, { useState, useRef } from 'react';
import axios from 'axios';
import searchIcon from '../assets/search.svg';

function SearchBar(props) {
	const { onResultChange } = props;
	const inputRef = useRef(null);

	const [input, setInput] = useState('');
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	const handleFocus = () => {
		setShowResults(true);
	}

	const handleBlur = () => {
		setShowResults(false);
	}

	const handleChange = async (event) => {
		const value = event.target.value;
		setInput(value);
	}

	const handleSubmit = async () => {
		if (inputRef.current) inputRef.current.focus();
		if (input.length === 0) {
			setResults([]);
			return;
		}

		try {
			const response = await axios.post('http://localhost:3000/search', { input });
			const searchResults = response.data;
			setResults(searchResults);
			setShowResults(true);
		} catch (err) {
			console.error('Error searching for book:', err);
		}
	}

	function singleResult(result) {
		const handleSelectResult = () => {
			onResultChange(result);
			setShowResults(false);
		}

		return (
			<button onClick={handleSelectResult} class="list-group-item list-group-item-action">
				<strong>{result.title}</strong> by {result.author}
			</button>
		)
	}


	return (
		<div className="add-search">
			<div className="search-bar input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Search for a title..."
					ref={inputRef}
					value={input}
					onChange={handleChange}
					// onBlur={handleBlur}
					onFocus={handleFocus}
				/>
				<button onClick={handleSubmit} className="search-btn">
					<img src={searchIcon} className="search-icon" alt="Search" />
				</button>
			</div>
			<div className='search-results'>
				{(results.length > 0 && showResults) &&
					<ul class="list-group">
						{results.map(singleResult)};
					</ul>
				}
			</div>
		</div>
	)
}

export default SearchBar;