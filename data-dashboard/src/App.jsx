import { useEffect, useState } from "react";

import "./App.css";

const URL = `https://openlibrary.org/search.json?author=ferriss`;
function App() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getInitialListOfBooks = async () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
          console.log(data);
        });
    };
    getInitialListOfBooks().catch(console.error);
  }, []);


  return (
    <>
      
      {books === null ? (
        <p>Loading...</p>
      ) : (
        books.docs.map((book) => (
          <div key={book.key}>
            <h2>{book.title}</h2>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt="" />
            <p>{book.author_name[0]}</p>
          </div>
        ))
      )}
    </>
  );
}

export default App;
