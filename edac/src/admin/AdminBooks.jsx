import React, { useEffect, useState } from "react";
import axios from "../pages/axios";
import { toast } from "react-toastify";
import "../styles/AdminResources.css";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data);
    } catch (error) {
      toast.error("Failed to load books");
    }
  };

  const addBook = async () => {
    const { title, author } = newBook;
    if (!title.trim() || !author.trim()) {
      toast.warning("Both title and author are required.");
      return;
    }

    try {
      await axios.post("/api/books", newBook);
      toast.success("Book added!");
      setNewBook({ title: "", author: "" });
      fetchBooks();
    } catch (error) {
      toast.error("Failed to add book.");
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`/api/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book deleted.");
    } catch (error) {
      toast.error("Failed to delete book.");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-header">Manage Reference Books</h2>

      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Author Name"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button className="btn btn-primary" onClick={addBook}>
          Add Book
        </button>
      </div>

      <ul className="list-group">
        {books.map((b) => (
          <li
            key={b._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{b.title}</strong>
              <br />
              <small className="text-muted">by {b.author}</small>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteBook(b._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminBooks;
