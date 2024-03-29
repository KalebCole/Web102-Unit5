import { useEffect, useState } from "react";
import "./App.css";

// Components (Placeholder implementations)
const AuthorSelect = ({ setAuthorName }) => {
  return (
    <select
      onChange={(e) => setAuthorName(e.target.value)}
      style={{ margin: "10px" }}
    >
      {/* This would be dynamically populated based on available authors */}
      <option value="">Select an author</option>
      <option value="J K Rowling">J.K. Rowling</option>
    </select>
  );
};

const CollectionHeader = ({ author }) => <h2>Collection from {author}</h2>;

const StatisticsCards = ({ books }) => {
  // Calculate statistics here based on books data
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "10px",
      }}
    >
      {/* Placeholder for cards */}
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </div>
  );
};

const BooksList = ({ books }) => {
    return (
      <div className="books-list">
        <div className="book-row">
            <div className="book-cell">
                <h3>Cover</h3>
            </div>
            <div className="book-cell">
                <h3>Title</h3>
            </div>
            <div className="book-cell">
                <h3>Pages</h3>
            </div>
        </div>
        {/* now I need to update this to get the image, title, and page number */}
        {console.log(books)}
        {books.map((book) => {
          if (book.cover_i && book.title){
            return (
              <div key={book.key} className="book-row">
                <div className="book-cell">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    style={{ maxWidth: "100px", maxHeight: "150px" }} // Adjust size as needed
                  />
                </div>
                <div className="book-cell">
                  <h3>{book.title}</h3>
                </div>
                <div className="book-cell">
                  {book.number_of_pages_median && (
                    <p>Pages: {book.number_of_pages_median}</p>
                  
                  ) }
                </div>
              </div>
            );
          }
          return null; // Or render a placeholder
        })}
      </div>
    );
  };
  

// Main App component
function App() {
    const [authorName, setAuthorName] = useState("");
    const [authorData, setAuthorData] = useState([]);
    const [detailedBooks, setDetailedBooks] = useState([]);
  
    useEffect(() => {
      if (authorName) {
        const author_fixed = authorName.toLowerCase().split(" ").join("%20");
        const URL = `https://openlibrary.org/search/authors.json?q=${author_fixed}`;
        fetch(URL)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.docs[0] && data.docs[0].key) {
              return fetch(`https://openlibrary.org/authors/${data.docs[0].key}/works.json`);
            } else {
              throw new Error("No data found");
            }
          })
          .then((response) => response.json())
          .then((worksData) => {
            setAuthorData(worksData.entries);
            return worksData.entries;
          })
          .then((entries) => {
            // For each book, fetch additional details by title
            entries.forEach((entry) => {
              const titleQuery = entry.title.split(" ").join("+");
              fetch(`https://openlibrary.org/search.json?title="${titleQuery}"`)
                .then((response) => response.json())
                .then((searchData) => {
                  if (searchData.docs && searchData.docs.length > 0) {
                    const detailedBook = searchData.docs[0];
                    // console.log(detailedBook)
                    setDetailedBooks((prevBooks) => [...prevBooks, detailedBook]);
                  }
                })
                .catch((error) => console.error(error));
            });
          })
          .catch((error) => console.error(error));
      }
    }, [authorName]);
  
    return (
      <div className="App">
        <h1>Books!</h1>
        <AuthorSelect setAuthorName={setAuthorName} />
        {authorName && <CollectionHeader author={authorName} />}
        {detailedBooks && detailedBooks.length > 0 && (
          <BooksList books={detailedBooks} />
        )}
      </div>
    );
  }
  
  export default App;