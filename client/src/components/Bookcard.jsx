import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import StatusBadge from './ui/StatusBadge';
import defaultCover from '../assets/not-found-alt.svg';
import formatDate from '../util/formatDate';

function Bookcard({ book }) {
  const navigate = useNavigate();

  const date = formatDate(book.read_date);

  const handleClick = () => {
    navigate(`/book-edit/${book.id}`, { state: { editingStatus: false } });
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="row g-0">
        <div className="col-4 col-md-4">
          <img
            src={book.cover ? book.cover : defaultCover}
            className="cover-img"
            alt="Book Cover"
          />
        </div>
        <div className="col-8 col-md-8">
          <div className="book-card-body">
            <h5 className="book-card-title">{book.title}</h5>
            <p className="book-card-subtitle">{book.author}</p>
            <StatusBadge status={book.status} />
            {book.status === 'Completed' && (
              <p className="book-card-text">{date}</p>
            )}
            {book.status === 'Completed' && (
              <p className="book-card-text">{book.rating}/5</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
Bookcard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    read_date: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default Bookcard;
