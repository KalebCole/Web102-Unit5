import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";

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

const RatingFilter = ({ ratingFilter, setRatingFilter }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <label htmlFor="ratingFilter" style={{ marginRight: "10px" }}>
        Rating:
      </label>
      <input
        id="ratingFilter"
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
      />
      <div>{ratingFilter}</div>
    </div>
  );
};
const SubjectFilter = ({ subjectFilter, setSubjectFilter }) => {
  // Example subjects list. Replace or extend with your subjects as needed.
  const subjects = [
    "All",
    "Fiction",
    "Science Fiction",
    "Action & Adventure",
    "Drama",
  ];

  return (
    <div>
      <label htmlFor="subjectFilter">Subject: </label>
      <select
        id="subjectFilter"
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
      >
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};
const YearFilter = ({ yearFilter, setYearFilter }) => {
  return (
    <div style={{ margin: "0 20px" }}>
      <label htmlFor="yearFilter">Publication Year:</label>
      <input
        id="yearFilter"
        type="text"
        placeholder="Enter year..."
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

function filterBooks(books, ratingFilter, subjectFilter, yearFilter = "") {
  {
    console.log(books);
  }
  return books.filter((book) => {
    const meetsRatingCriteria =
      book.ratings_average !== undefined &&
      book.ratings_average >= ratingFilter;
    const meetsSubjectCriteria =
      book.subjects &&
      book.subjects.length > 0 &&
      (subjectFilter === "All" ||
        book.subjects
          .map((subject) => subject.toLowerCase())
          .includes(subjectFilter.toLowerCase()));
    const meetsYearCriteria =
      yearFilter === "" || book.first_publish_year === parseInt(yearFilter);
    console.log(ratingFilter);
    return meetsRatingCriteria;
    //   &&
    // meetsSubjectCriteria
    // &&
    // meetsYearCriteria
  });
}

const StatisticsCards = ({ books }) => {
  // Filter out books without a ratings_average and calculate the average rating
  const filteredBooksForRating = books.filter(
    (book) => book.ratings_average !== undefined
  );
  const averageRating =
    filteredBooksForRating.reduce(
      (acc, curr) => acc + curr.ratings_average,
      0
    ) / filteredBooksForRating.length;

  // Avoid division by zero
  const displayAverageRating = isNaN(averageRating)
    ? 0
    : averageRating.toFixed(2); // Round to 2 decimal places

  // Calculate the earliest publication year
  const earliestPublicationYear = books.reduce((min, book) => {
    if (book.first_publish_year && (!min || book.first_publish_year < min)) {
      return book.first_publish_year;
    }
    return min;
  }, null);

  // Count the number of eBooks that are borrowable
  const ebooksCount = books.reduce((count, book) => {
    return count + (book.ebook_access === "borrowable" ? 1 : 0);
  }, 0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "10px",
      }}
    >
      {/* Average Rating Card */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Average Rating</h2>
        <p>{displayAverageRating}</p>
      </div>

      {/* Earliest Publication Year Card */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Earliest Publication Year</h2>
        <p>{earliestPublicationYear || "N/A"}</p>
      </div>
      {/* Number of Borrowable eBooks Card */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Available eBooks</h2>
        <p>{ebooksCount}</p>
      </div>
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
      {/* {console.log(books)} */}
      {books.map((book) => {
        if (book.cover_i && book.title) {
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
                  <p>{book.number_of_pages_median}</p>
                )}
              </div>
            </div>
          );
        }
        return null; // Or render a placeholder
      })}
    </div>
  );
};

function App() {
  const [authorName, setAuthorName] = useState("");
  const [authorData, setAuthorData] = useState([]);
  const [detailedBooks, setDetailedBooks] = useState([]);
  const [seenKeys, setSeenKeys] = useState(new Set()); // Set to track seen book keys
  const [ratingFilter, setRatingFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (authorName) {
      const author_fixed = authorName.toLowerCase().split(" ").join("%20");
      const URL = `https://openlibrary.org/search/authors.json?q=${author_fixed}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.docs[0] && data.docs[0].key) {
            return fetch(
              `https://openlibrary.org/authors/${data.docs[0].key}/works.json`
            );
          } else {
            throw new Error("No data found");
          }
        })
        .then((response) => response.json())
        .then((worksData) => {
          setAuthorData(worksData.entries);
          return worksData.entries.length === 25
            ? worksData.entries.slice(0, 25)
            : worksData.entries;
        })
        .then((entries) => {
          entries.forEach((entry) => {
            const titleQuery = entry.title.split(" ").join("+");
            fetch(`https://openlibrary.org/search.json?title="${titleQuery}"`)
              .then((response) => response.json())
              .then((searchData) => {
                if (searchData.docs && searchData.docs.length > 0) {
                  const detailedBook = searchData.docs[0];
                  if (!seenKeys.has(detailedBook.key)) {
                    // Check if the book key hasn't been seen
                    setDetailedBooks((prevBooks) => [
                      ...prevBooks,
                      detailedBook,
                    ]);
                    setSeenKeys(
                      (prevKeys) => new Set(prevKeys.add(detailedBook.key))
                    ); // Add the key to the seen set
                  }
                }
              })
              .catch((error) => console.error(error));
          });
        })
        .catch((error) => console.error(error));
    }
  }, [authorName, ratingFilter, subjectFilter]);

  return (
    <div className="App">
      <h1>Books!</h1>
      <AuthorSelect setAuthorName={setAuthorName} />
      {authorName && (
        <>
          <CollectionHeader author={authorName} />
          <SearchBox
            books={detailedBooks}
            setFilteredBooks={setFilteredBooks}
          />
        </>
      )}

      {filteredBooks.length > 0 && (
        <>
          <StatisticsCards
            books={filterBooks(
              filteredBooks,
              ratingFilter,
              subjectFilter,
              yearFilter
            )}
          />
          <BooksList
            books={filterBooks(
              filteredBooks,
              ratingFilter,
              subjectFilter,
              yearFilter
            )}
          />
        </>
      )}

      {filteredBooks.length === 0 && detailedBooks.length > 0 && (
        <>
          <StatisticsCards
            books={filterBooks(
              detailedBooks,
              ratingFilter,
              subjectFilter,
              yearFilter
            )}
          />
          <BooksList
            books={filterBooks(
              detailedBooks,
              ratingFilter,
              subjectFilter,
              yearFilter
            )}
          />
        </>
      )}
    </div>
  );
}

export default App;
