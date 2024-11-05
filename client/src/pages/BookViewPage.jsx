import React from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import BookView from "../components/BookView"

function BookViewPage() {
	const location = useLocation();
	const book = location.state || {};

	return (
		<div className="page">
			<Header />
			<BookView book={book} />
		</div>
	)
}

export default BookViewPage;
