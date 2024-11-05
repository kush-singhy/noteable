import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import Input from "./ui/Input";
import RatingSelect from "./ui/RatingSelect";
import Textarea from "./ui/Textarea";
import Toggle from "./ui/Toggle";


function AddBookForm() {
	const navigate = useNavigate();

	const [newBook, setNewBook] = useState({
		title: "",
		author: "",
		isbn: "",
		readStatus: true,
		date: null,
		rating: "",
		notes: ""
	});

	const handleBookSearch = (value) => {
		setNewBook(prevValue => {
			return {
				...prevValue,
				title: value.title,
				author: value.author,
				isbn: value.isbn
			}
		})
	}

	const handleChange = (event) => {
		const { name, value } = event.target;

		setNewBook(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	const handleStatus = (status) => {
		setNewBook(prevValue => {
			return {
				...prevValue,
				readStatus: status
			}
		})
	}

	async function handleSubmit() {
		try {
			const response = await axios.post('http://localhost:3000/book', newBook);
			console.log(response);
			navigate('/');
		} catch (err) {
			console.error('Error adding book:', err);
		}
	}



	return (
		<div className="container small-container">
			<SearchBar onResultChange={handleBookSearch} />

			<div className="add-form">
				<h5>Or enter details here: </h5>
				<div className="add-info">
					<Input id="title" type="text" value={newBook.title} onChange={handleChange} label="Title" />
					<Input id="author" type="text" value={newBook.author} onChange={handleChange} label="Author" />
					<Input id="isbn" type="text" value={newBook.isbn} onChange={handleChange} label="ISBN" />
					<Toggle status={newBook.readStatus} setStatus={handleStatus} leftText="Have Read" rightText="Want to Read" />
				</div>

				<div className={newBook.readStatus ? `` : `hide-inputs`}>
					<h5>Add your thoughts: </h5>
					<Input id="date" type="date" value={newBook.date ? newBook.date.split('T')[0] : null} onChange={handleChange} label="Date Read" />
					<RatingSelect id="rating" value={newBook.rating} onChange={handleChange} label="Rating" />
					<Textarea id="notes" value={newBook.notes} onChange={handleChange} label="Notes" />
				</div>

				<button onClick={handleSubmit} className="add-book-btn">Add</button>

			</div>


		</div>
	)
}

export default AddBookForm;