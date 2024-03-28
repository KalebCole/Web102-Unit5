import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [bookData, setBookData] = useState({
    books: null,
    author: null,
    subjects: null,
    languages: null,
    pages: null,
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const URL = `https://openlibrary.org/search.json?author=${bookData.author}`;
  useEffect(() => {
    const getListOfBooks = async () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          let filteredBooks = data.docs;
          if (selectedLanguage) {
            console.log(selectedLanguage);
            const languages = data.docs.map(book => book.language);
            filteredBooks = data.docs.filter(book => book.language && book.language.includes(selectedLanguage));
            console.log(filteredBooks);
          }
          setBookData(prevState => ({ ...prevState, books: { ...data, docs: filteredBooks } }));
          console.log(data.docs);
        });
    };
    getListOfBooks().catch(console.error);
  }, [selectedLanguage]); // Add selectedLanguage to the dependency array

  return (
    <>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="">Select a language</option>
        <option value="eng">English</option>
        <option value="spa">Spanish</option>
        <option value="fre">French</option>
      </select>
      {bookData.books === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total Books: {bookData.books.numFound}</p>
          <p>Total Books in </p>
          {bookData.books.docs.map((book) => (
            <div key={book.key}>
              <h2>
                {book.title} by {book.author_name[0]}
              </h2>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt=""
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default App;
