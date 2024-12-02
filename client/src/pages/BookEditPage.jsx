import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../util/formatDate';
import Header from '../components/ui/Header';

import calendarIcon from '../assets/Calendar.svg';
import starIcon from '../assets/Star.svg';
import NotesInput from '../components/NotesInput';

function BookEditPage() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/book/${id}`, {
          withCredentials: true,
        });
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const status = book.status === 'Completed';
  const date = formatDate(book.read_date);

  if (loading) {
    return (
      <div className="page">
        <Header />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <div className="container medium">
        <div className="notes-header">
          <img src={book.cover} className="notes-img" alt="Book Cover" />
          <span>
            <h1>{book.title}</h1>
            <h5>{book.author}</h5>
          </span>
        </div>
        <div className="book-details">
          <div>
            <img src={calendarIcon} />
            <span>{date}</span>
          </div>
          <div>
            <img src={starIcon} />
            <span>{book.rating}/5</span>
          </div>
        </div>

        <NotesInput />
      </div>
    </div>
  );
}

export default BookEditPage;
