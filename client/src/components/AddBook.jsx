import React from "react"
import Header from "./Header"
import Homepage from "./Homepage"
import AddBookForm from "./AddBookForm"

function AddBook() {
  return (
    <div className="page">
        <Header />
        <AddBookForm />      
    </div>
  )
}

export default AddBook;
