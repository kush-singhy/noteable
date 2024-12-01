import Bookcard from './Bookcard';
import EmptyMessage from './EmptyMessage';
import PropTypes from 'prop-types';

function Bookgrid({ books, readStatus, sortType }) {
  function createCard(book) {
    return <Bookcard key={book.id} book={book} />;
  }

  const filteredBooks = books.filter((book) => {
    return book.status === readStatus;
  });

  if (sortType === 'date') {
    filteredBooks.sort((a, b) => new Date(b.read_date) - new Date(a.read_date));
  } else if (sortType === 'rating') {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  } else if (sortType === 'title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div>
      {filteredBooks.length === 0 ? (
        <EmptyMessage />
      ) : (
        <div className="book-grid">{filteredBooks.map(createCard)}</div>
      )}
    </div>
  );
}
Bookgrid.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      read_date: PropTypes.string,
      rating: PropTypes.number,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  readStatus: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
};

export default Bookgrid;
