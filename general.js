const axios = require('axios');

//Task 1: Get all Books - using Promise callbacks
let getData = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

getData().then(books => {
  console.log("All Books:", JSON.stringify(books, null, 4));
}).catch(err => {
  console.log(err.message);
});

//Task 2: Search by ISBN - using async-await with Axios
const getByISBN = async (isbn) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log("Book based on ISBN:", JSON.stringify(response.data, null, 4));
  } catch (error) {
    console.log(error.message);
  }
};

getByISBN(1);

//Task 3: Search by Author - using async-await with Axios
const getByAuthor = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log("Books by Author:", JSON.stringify(response.data, null, 4));
  } catch (error) {
    console.log(error.message);
  }
};

getByAuthor("Chinua Achebe");

//Task 4: Search by Title - using async-await with Axios
const getByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log("Books by Title:", JSON.stringify(response.data, null, 4));
  } catch (error) {
    console.log(error.message);
  }
};

getByTitle("Things Fall Apart");
