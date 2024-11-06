import React from "react"
import { useLocation } from "react-router-dom";
import Header from "../components/ui/Header"
import EditBookForm from "../components/EditBookForm";

function EditBookPage() {
	const location = useLocation();
	const book = location.state || {};

	return (
		<div className="page">
			<Header />
			<EditBookForm book={book} />
		</div>
	)
}

export default EditBookPage;
