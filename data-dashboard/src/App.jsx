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
                <h3>Description</h3>
            </div>
        </div>
        {books.map((book) => {
          if (book.covers && book.covers[0]) {
            return (
              <div key={book.key} className="book-row">
                <div className="book-cell">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                    alt={book.title}
                    style={{ maxWidth: "100px", maxHeight: "150px" }} // Adjust size as needed
                  />
                </div>
                <div className="book-cell">
                  <h3>{book.title}</h3>
                </div>
                <div className="book-cell">
                  {book.description && book.description.value ? (
                    <p>{book.description.value}</p>
                  ) : <p>No description available.</p>}
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

  useEffect(() => {
    if (authorName) {
      let author_fixed = authorName.toLowerCase().split(" ").join("%20");
      let URL = `https://openlibrary.org/search/authors.json?q=${author_fixed}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.docs[0] && data.docs[0].key) {
            console.log("in here");
            return fetch(
              `https://openlibrary.org/authors/${data.docs[0].key}/works.json`
            )
              .then((response) => response.json())
              .then((worksData) => {
                setAuthorData(worksData.entries);
                console.log(worksData.entries);
                // Set the works data to state here
              });
          } else {
            console.log("No data found");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [authorName]);

  return (
    <div className="App">
      <h1>Books!</h1>
      <AuthorSelect setAuthorName={setAuthorName} />
      {authorName && <CollectionHeader author={authorName} />}
      {/* for each book in the AuthorData.entries: get the title, cover (covers[0]), and description and pass it into item component for a table*/}
      {authorData && authorData.length > 0 && (
        <BooksList books={authorData} />
      )}
    </div>
  );
}
//   https://covers.openlibrary.org/b/id/1-S.jpg

export default App;
