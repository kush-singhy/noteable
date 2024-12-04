import { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bookgrid from '../components/Bookgrid';
import Toggle from '../components/ui/Toggle';
import SortSelect from '../components/ui/SortSelect';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setstatus] = useState('Completed');
  const [sortType, setSortType] = useState('date');
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/add');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books', {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="page">
      <Header
        button={
          <button onClick={handleAddBook} className="add-book-btn">
            Add Book
          </button>
        }
      />
      <div className="container large">
        <div className="filters">
          <Toggle
            status={status}
            setStatus={setstatus}
            leftText="Notes"
            rightText="Wishlist"
          />
          <SortSelect status={status} setSortType={setSortType} />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Bookgrid books={books} status={status} sortType={sortType} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
