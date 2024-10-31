import React from 'react';
import StatusBadge from './StatusBadge';
import formatDate from '../util/formatDate';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function BookView(props) {
	const { book } = props;

	const date = formatDate(book.read_date);

	return (
		<div className="container medium">
			<div className="notes-header">
				<img src={book.cover} className="notes-img" alt="Book Cover" />
				<span>
					<h1>{book.title}</h1>
					<h5>{book.author}</h5>
					<StatusBadge status={book.status} />
				</span>
				<div className="notes-buttons">
					<a href="" className="icon-btn edit-btn">
						<img src={editIcon} alt="edit" />
					</a>
					<button
						className="icon-btn delete-btn"
						data-bs-toggle="modal"
						data-bs-target="#deleteModal"
					>
						<img src={deleteIcon} alt="delete" />
					</button>
				</div>
			</div>

			<div className="notes-info">
				<p className="book-card-text">Read: {date}</p>
				<p className="book-card-text">Rating: {book.rating}/5</p>
			</div>

			<div className="notes-body">
				<h3>My Notes</h3>
				<p className="book-card-text">{book.notes}</p>
			</div>

			<div className="modal fade" id="deleteModal" tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="deleteModalLabel">
								Hold your horses!
							</h1>
						</div>
						<div className="modal-body">
							Are you sure you want to delete this entry?
						</div>
						<div className="modal-footer">
							<a href="" className="modal-btn delete-btn">
								Delete
							</a>
							<button
								type="button"
								className="modal-btn cancel-btn"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookView;
