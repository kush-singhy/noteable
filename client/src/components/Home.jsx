import React, { useEffect, useState } from 'react';
import axios from 'axios';

import bookNotes from '../mock-data';

import Bookgrid from './Bookgrid';
import Toggle from './ui/Toggle';
import SortSelect from './ui/SortSelect';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [readStatus, setReadStatus] = useState(true);
  const [sortType, setSortType] = useState('date');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books', {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Error fetching books');
        setBooks(bookNotes);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container large">
      <div className="filters">
        <Toggle
          status={readStatus}
          setStatus={setReadStatus}
          leftText="Notes"
          rightText="Wishlist"
        />
        <SortSelect status={readStatus} setSortType={setSortType} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Bookgrid books={books} readStatus={readStatus} sortType={sortType} />
      )}
    </div>
  );
}

export default Home;
