import { useEffect, useState } from "react";

import "./App.css";

function App() {
  // i should probably only store the list of books. the other data can be derived from the list of books
  const [bookData, setBookData] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedRangeOfPages, setSelectedRangeOfPages] = useState([0, 0]);

  const [searchInput, setSearchInput] = useState("");

  const URL = `https://openlibrary.org/search.json?author=${selectedAuthor}`;
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
            setBookData(filteredBooks);
          }
          else{
            setBookData(data);
          }
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
      {bookData === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total Books: {bookData.numFound}</p>
          <p>Total Books in </p>
          {bookData.docs.map((book) => (
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
