import React, { useState, useEffect } from "react";
import CalendarComponent from './calendar';
import Book from './Book';

// Material UI
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';

import '../App.css';

const BookSchedule = () => {
  const [books, setBooks] = useState([]);

  // State to add a new book
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookStart, setNewBookStart] = useState(new Date().toISOString());
  const [newBookEnd, setNewBookEnd] = useState(new Date().toISOString());

  // Fetch Data from Backend API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchData();
  }, []);
      
  // Add a new book to the backend and update UI
  const onAddNewBook = async () => {
    try {
      const res = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newBookTitle,
          start: newBookStart,
          end: newBookEnd
        })
      });

      const newBook = await res.json();
      setBooks((previousBooks) => [...previousBooks, newBook]);
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  // Render all books
  const existingBooks = books.map((book) => (
    <Book
      key={book.id}  
      bookId={book.id}
      bookTitle={book.title}
      bookStart={book.start}
      bookEnd={book.end}
      setBooks={setBooks}
    />
  ));

  return (
    <div>
      <CalendarComponent events={books} />
      <h3>Add a New Book to Read!</h3>
      <div className={'add-new'}>
        <form onSubmit={(e) => {
          e.preventDefault();
          onAddNewBook();
        }}>
          <Stack spacing={2}>
            <TextField
              required
              label="Add Book Title"
              variant="standard"
              onChange={e => setNewBookTitle(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                views={['year', 'month', 'day']}
                value={new Date(newBookStart)}
                onChange={(newValue) => setNewBookStart(newValue.toISOString())}
                slotProps={{ textField: { variant: 'outlined' } }}
              />
              <DatePicker
                label="End Date"
                views={['year', 'month', 'day']}
                value={new Date(newBookEnd)}
                onChange={(newValue) => setNewBookEnd(newValue.toISOString())}
                slotProps={{ textField: { variant: 'outlined' } }}
              />
            </LocalizationProvider>
            <Button variant="contained" type="submit">
              Add Book
            </Button>
          </Stack>
        </form>
      </div>
      <div className={'existing-books'}>
        <h3>Existing Book Schedules</h3>
        <List>
          {existingBooks}
        </List>
      </div>
    </div>
  )
}

export default BookSchedule;
