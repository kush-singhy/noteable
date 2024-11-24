import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from './ui/StatusBadge';
import defaultCover from '../assets/gradient.jpg';
import formatDate from '../util/formatDate';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function BookView(props) {
  const navigate = useNavigate();
  const { book } = props;
  const status = book.status === 'Completed';
  const date = formatDate(book.read_date);

  const handleEdit = () => {
    navigate(`/edit/${book.id}`, {
      state: book,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/delete/${book.id}`
      );
      navigate('/');
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div className="container medium">
      <div className="notes-header">
        <img
          src={book.cover ? book.cover : defaultCover}
          className="notes-img"
          alt="Book Cover"
        />
        <span>
          <h1>{book.title}</h1>
          <h5>{book.author}</h5>
          <StatusBadge status={status} />
        </span>
      </div>

      {status ? (
        <div>
          <div className="notes-info">
            <p>Read: {date}</p>
            <p>Rating: {book.rating}/5</p>
          </div>

          <div className="notes-body">
            <h3>My Notes</h3>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: book.note }}
              className="book-card-text"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="notes-buttons">
        <button onClick={handleEdit} className="icon-btn edit-btn">
          <img src={editIcon} alt="edit" />
        </button>
        <button
          className="icon-btn delete-btn"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          <img src={deleteIcon} alt="delete" />
        </button>
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
              <button
                onClick={handleDelete}
                className="modal-btn delete-btn"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
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
