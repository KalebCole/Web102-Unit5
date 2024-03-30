import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import AuthorSelect from "./components/AuthorSelect";
import RatingFilterCard from "./components/filters/RatingFilterCard";
import SubjectFilterCard from "./components/filters/SubjectFilterCard";
import YearFilterCard from "./components/filters/YearFilterCard";
import StatisticsCards from "./components/StatisticsCards";
import BooksList from "./components/BooksList";

const CollectionHeader = ({ author }) => <h2>Collection from {author}</h2>;

function filterBooks(books, ratingFilter, subjectFilter, yearFilter = "") {
  return books.filter((book) => {
    const meetsRatingCriteria =
      book.ratings_average !== undefined &&
      book.ratings_average >= ratingFilter;
    const meetsSubjectCriteria = true;
    book.subject &&
      book.subject.length > 0 &&
      (subjectFilter === "All" ||
        book.subject
          .map((subject) => subject.toLowerCase())
          .includes(subjectFilter.toLowerCase()));
    const meetsYearCriteria =
      yearFilter === "" || book.first_publish_year === parseInt(yearFilter);
    return meetsRatingCriteria && meetsSubjectCriteria && meetsYearCriteria;
  });
}

function App() {
  const [authorName, setAuthorName] = useState("");
  const [detailedBooks, setDetailedBooks] = useState([]);
  const [seenKeys, setSeenKeys] = useState(new Set()); // Set to track seen book keys
  const [ratingFilter, setRatingFilter] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books when authorName changes
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
  }, [authorName]);

  // Filter books when filters change
  useEffect(() => {
    const filtered = filterBooks(
      detailedBooks,
      ratingFilter,
      subjectFilter,
      yearFilter
    );
    setFilteredBooks(filtered);
  }, [ratingFilter, subjectFilter, yearFilter, detailedBooks]);

  return (
    <div className="App">
      <h1>BiblioBlend</h1>
      <h2>Mixing authors, blending stories, shaping perspectives.</h2>
      <AuthorSelect setAuthorName={setAuthorName} />

      {authorName && (
        <>
          <CollectionHeader author={authorName} />
          <SearchBox
            books={detailedBooks}
            setFilteredBooks={setFilteredBooks}
          />

          {filteredBooks.length > 0 && (
            <>
              <StatisticsCards books={filteredBooks} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RatingFilterCard
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                />
                <SubjectFilterCard
                  subjectFilter={subjectFilter}
                  setSubjectFilter={setSubjectFilter}
                />
                <YearFilterCard
                  yearFilter={yearFilter}
                  setYearFilter={setYearFilter}
                />
              </div>
              <BooksList books={filteredBooks} />
            </>
          )}

          {filteredBooks.length === 0 && detailedBooks.length > 0 && (
            <>
              <StatisticsCards books={detailedBooks} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RatingFilterCard
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                />
                <SubjectFilterCard
                  subjectFilter={subjectFilter}
                  setSubjectFilter={setSubjectFilter}
                />
                <YearFilterCard
                  yearFilter={yearFilter}
                  setYearFilter={setYearFilter}
                />
              </div>
              <BooksList books={detailedBooks} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
