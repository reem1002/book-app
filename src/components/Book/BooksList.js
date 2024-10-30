import React, { useState } from 'react';
import { deleteBook, updateBook } from '../../store/BookSlice';
import EditBookForm from './BookEdit'; // Import the EditBookForm

const BooksList = ({ loading, books, dispatch, getBook, isloggedIn }) => {
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    author: ''
  }); // Track the edited book's data
  const [searchQuery, setSearchQuery] = useState(''); // Track the search input

  // Delete handler
  const deleteBookHandler = (id) => {
    dispatch(deleteBook(id))
      .unwrap()
      .then((res) => {
        console.log('Book deleted:', res);
      });
  };

  // Edit handler
  const editBookHandler = (book) => {
    setEditingBook(book); // Set the book to be edited
    setFormData({
      title: book.title,
      price: book.price,
      description: book.description,
      author: book.author
    }); // Initialize the form with book data
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Submit handler for the edit form
  const submitEditHandler = (e) => {
    e.preventDefault();
    dispatch(updateBook({ ...editingBook, ...formData }))
      .unwrap()
      .then((res) => {
        console.log('Book updated:', res);
        setEditingBook(null); // Reset after editing
      });
  };

  // Cancel editing
  const cancelEditHandler = () => {
    setEditingBook(null);
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bookList =
    filteredBooks.length > 0
      ? filteredBooks.map((book) => (
        <li
          className='list-group-item d-flex justify-content-between align-items-center'
          key={book.id}
        >
          <div>
            <strong>{book.title}</strong> - ${book.price}
          </div>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => getBook(book)}
            >
              Read
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => deleteBookHandler(book.id)}
              disabled={!isloggedIn}
            >
              Delete
            </button>
            <button
              type='button'
              className='btn btn-success'
              onClick={() => editBookHandler(book)}
              disabled={!isloggedIn}
            >
              Edit
            </button>
          </div>
        </li>
      ))
      : 'No books found';

  return (
    <div>
      <h2>Books List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search books by title"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="form-control mb-3"
      />

      {loading ? 'loading...' : <ul className='list-group'>{bookList}</ul>}

      {/* Render the modal overlay for the edit form when editingBook is not null */}
      {editingBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Book</h2>
            <EditBookForm
              formData={formData}
              handleInputChange={handleInputChange}
              submitEditHandler={submitEditHandler}
              cancelEditHandler={cancelEditHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
