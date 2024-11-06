import React, { useState } from "react";
import searchIcon from '../assets/search.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function EditBookForm(props) {
	const navigate = useNavigate();
	const { book } = props;

	// Fix incorrect date bug
	let date = new Date(book.read_date);
	const day = date.getDate() + 1;
	date.setDate(day);
	const formattedDate = date.toISOString();

	const [newBook, setNewBook] = useState({
		title: book.title,
		author: book.author,
		isbn: book.isbn,
		readStatus: book.status,
		date: book.status ? formattedDate : null,
		rating: book.status ? book.rating : "",
		notes: book.status ? book.notes : ""
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setNewBook(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	const handleStatus = (event) => {
		const status = event.target.value === 'yes' ? true : false;

		setNewBook(prevValue => {
			return {
				...prevValue,
				readStatus: status
			}
		})
	}

	async function handleSubmit() {
		try {
			const response = await axios.post(`http://localhost:3000/edit/${book.id}`, newBook);
			console.log(response);
			navigate('/');
		} catch (err) {
			console.error('Error adding book:', err);
		}
	}



	return (
		<div className="container small-container">
			<div className="add-form">
				<div className="add-info">
					<div className="form-floating mb-3">
						<input
							id="title"
							type="text"
							name="title"
							className="form-control"
							placeholder="Title..."
							value={newBook.title}
							onChange={handleChange}
							autoComplete="off"
						/>
						<label htmlFor="title">Title</label>
					</div>
					<div className="form-floating mb-3">
						<input id="author" type="text" name="author" className="form-control" placeholder="Author..." value={newBook.author} onChange={handleChange} autoComplete="off" />
						<label htmlFor="author">Author</label>
					</div>
					<div className="form-floating mb-3">
						<input id="isbn" type="text" name="isbn" className="form-control" placeholder="ISBN..." value={newBook.isbn} onChange={handleChange} autoComplete="off" />
						<label htmlFor="isbn">ISBN</label>
					</div>
					<div className="toggle mb-4">
						<div
							className={`slider ${newBook.readStatus ? 'left' : 'right'}`}
						></div>
						<button
							value='yes'
							className={newBook.readStatus ? 'active' : ''}
							onClick={handleStatus}
						>
							Have Read
						</button>
						<button
							value='no'
							className={!newBook.readStatus ? 'active' : ''}
							onClick={handleStatus}
						>
							Want to Read
						</button>
					</div>
				</div>

				{newBook.readStatus ?
					<div>
						<h5>Add your thoughts: </h5>
						<div className="form-floating mb-3">
							<input id="date" type="date" name="date" className="form-control" placeholder="Date..." value={newBook.date ? newBook.date.split('T')[0] : null} onChange={handleChange} />
							<label htmlFor="date">Date Read</label>
						</div>
						<div className="form-floating mb-3">
							<select id="rating" className="form-select" name="rating" value={newBook.rating} onChange={handleChange} >
								<option value="" disabled>Rating...</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<label htmlFor="rating">Rating</label>
						</div>
						<div className="form-floating mb-3">
							<textarea id="notes" name="notes" className="notes-input form-control" placeholder="Notes..." onChange={handleChange} value={newBook.notes}></textarea>
							<label htmlFor="notes">Notes</label>
						</div>
					</div> :
					<></>}
				<div className="edit-btn-box">
					<button onClick={handleSubmit} className="save-btn edit-page-btn">Save Changes</button>
					<button onClick={() => { navigate(-1) }} className="cancel-btn edit-page-btn">Cancel</button>
				</div>
			</div>


		</div>
	)
}

export default EditBookForm;