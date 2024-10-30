import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch books
export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch('http://localhost:3000/books');
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Insert book
export const insertBook = createAsyncThunk(
  'book/insertBook',
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // bookData.author = getState().auth.name;

    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update book
export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (updatedBook, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete book
export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return id; // Return only the id of the deleted book
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch books
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Insert book
    builder
      .addCase(insertBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
      })
      .addCase(insertBook.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Update book
    builder
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete book
    builder
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default bookSlice.reducer;
