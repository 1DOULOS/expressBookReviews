const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10.1 — Get all books using async/await
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("All Books:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
};

// Task 10.2 — Get book by ISBN using Promise callbacks
const getBookByISBN = (isbn) => {
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log(`\nBook with ISBN ${isbn}:`);
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(error => {
      console.error(`Error fetching book by ISBN ${isbn}:`, error.message);
    });
};

// Task 10.3 — Get books by author using async/await
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log(`\nBooks by author "${author}":`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`Error fetching books by author "${author}":`, error.message);
  }
};

// Task 10.4 — Get books by title using async/await
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    console.log(`\nBooks with title "${title}":`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`Error fetching books by title "${title}":`, error.message);
  }
};

// Run all four methods
(async () => {
  await getAllBooks();
  getBookByISBN(1);
  await getBooksByAuthor("Jane Austen");
  await getBooksByTitle("Things Fall Apart");
})();
