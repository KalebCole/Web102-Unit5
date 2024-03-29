import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [bookData, setBookData] = useState(null);
  const [author, setAuthor] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRangeOfPages, setSelectedRangeOfPages] = useState([0, 0]);
  const [selectMinimumRating, setSelectMinimumRating] = useState(0);
  const [selectMaximumRating, setSelectMaximumRating] = useState(0);

  const [searchInput, setSearchInput] = useState("");

  function buildURL(author, searchInput) {
    let baseURL = "https://openlibrary.org/search.json?";
    let params = [];

    if (author) {
      params.push(`author=${author}`);
    }

    if (searchInput) {
      let updatedSearchInput = searchInput.split(" ").join("+");
      params.push(`q=${updatedSearchInput}`);
    }
    let isParamsEmpty = params.length === 0;
    return !isParamsEmpty
      ? baseURL + params.join("&")
      : baseURL + "author=tolkein"; // if no parameters, give it a default search
  }

  useEffect(() => {
    let URL = buildURL(author, searchInput);
    const getListOfBooks = async () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          let filteredBooks = data.docs;

          if (selectedLanguage) {
            console.log(selectedLanguage);
            filteredBooks = filteredBooks.filter(
              (book) =>
                book.language && book.language.includes(selectedLanguage)
            );
            console.log(filteredBooks);
          }

          if (selectedSubject) {
            console.log(selectedSubject);
            filteredBooks = filteredBooks.filter(
              (book) => book.subject && book.subject.includes(selectedSubject)
            );
            console.log(filteredBooks);
          }

          if (selectMinimumRating) {
            filteredBooks = filteredBooks.filter(
              (book) =>
                book.ratings_average &&
                book.ratings_average >= selectMinimumRating
            );
            console.log(filteredBooks);
          }

          if (selectMaximumRating) {
            filteredBooks = filteredBooks.filter(
              (book) =>
                book.ratings_average &&
                book.ratings_average <= selectMaximumRating
            );
            console.log(filteredBooks);
          }
          setBookData({
            ...data,
            docs: filteredBooks,
            numFound: filteredBooks.length,
          });
          // console.log(data.docs);
        });
    };
    getListOfBooks().catch(console.error);
  }, [
    selectedLanguage,
    selectedSubject,
    selectMinimumRating,
    selectMaximumRating,
  ]);

  // Form submission handler
const handleSearchSubmit = async (e) => {
  e.preventDefault();
  // Make your API call here using the searchInput state variable
  // For example:
  const response = await fetch(`https://api.example.com/search?query=${searchInput}`);
  const data = await response.json();
  setBookData(data);
};

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSearchSubmit(e)
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search for a book"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>

      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="">Select a language</option>
        <option value="eng">English</option>
        <option value="spa">Spanish</option>
        <option value="dut">Dutch</option>
        <option value="ita">Italian</option>
        <option value="por">Portuguese</option>
        <option value="rus">Russian</option>
        <option value="pol">Polish</option>
        <option value="ger">German</option>
      </select>

      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">Select a subject</option>

        <option value="Architecture">Architecture</option>
        <option value="Art_Instruction">Art Instruction</option>
        <option value="Art_History">Art History</option>
        <option value="Dance">Dance</option>
        <option value="Design">Design</option>
        <option value="Fashion">Fashion</option>
        <option value="Film">Film</option>
        <option value="Graphic_Design">Graphic Design</option>
        <option value="Music">Music</option>
        <option value="Music_Theory">Music Theory</option>
        <option value="Painting">Painting</option>
        <option value="Photography">Photography</option>
        <option value="Bears">Bears</option>
        <option value="Cats">Cats</option>
        <option value="Kittens">Kittens</option>
        <option value="Dogs">Dogs</option>
        <option value="Puppies">Puppies</option>
        <option value="Fiction">Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical_Fiction">Historical Fiction</option>
        <option value="Horror">Horror</option>
        <option value="Humor">Humor</option>
        <option value="Literature">Literature</option>
        <option value="Magic">Magic</option>
        <option value="Mystery_and_detective_stories">
          Mystery and detective stories
        </option>
        <option value="Plays">Plays</option>
        <option value="Poetry">Poetry</option>
        <option value="Romance">Romance</option>
        <option value="Science_Fiction">Science Fiction</option>
        <option value="Short_Stories">Short Stories</option>
        <option value="Thriller">Thriller</option>
        <option value="Young_Adult">Young Adult</option>
        <option value="ScienceMathematics">Science & Mathematics</option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Physics">Physics</option>
        <option value="Programming">Programming</option>
        <option value="Management">Management</option>
        <option value="Entrepreneurship">Entrepreneurship</option>
        <option value="Business_Economics">Business Economics</option>
        <option value="Business_Success">Business Success</option>
        <option value="Finance">Finance</option>
        <option value="Children's">Children's</option>
        <option value="Kids_Books">Kids Books</option>
        <option value="Stories_in_Rhyme">Stories in Rhyme</option>
        <option value="Baby_Books">Baby Books</option>
        <option value="Bedtime_Books">Bedtime Books</option>
        <option value="Picture_Books">Picture Books</option>
        <option value="History">History</option>
        <option value="Ancient_Civilization">Ancient Civilization</option>
        <option value="Archaeology">Archaeology</option>
        <option value="Anthropology">Anthropology</option>
        <option value="World_War_II">World War II</option>
        <option value="Social_Life_and_Customs">Social Life and Customs</option>
        <option value="Health_&_Wellness">Health & Wellness</option>
        <option value="Cooking">Cooking</option>
        <option value="Cookbooks">Cookbooks</option>
        <option value="Mental_Health">Mental Health</option>
        <option value="Exercise">Exercise</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Self-help">Self-help</option>
        <option value="Biography">Biography</option>
        <option value="Autobiographies">Autobiographies</option>
        <option value="History">History</option>
        <option value="Politics_and_Government">Politics and Government</option>
        <option value="World_War_II">World War II</option>
        <option value="Women">Women</option>
        <option value="Kings_and_Rulers">Kings and Rulers</option>
        <option value="Composers">Composers</option>
        <option value="Artists">Artists</option>
        <option value="Social_Sciences">Social Sciences</option>
        <option value="Anthropology">Anthropology</option>
        <option value="Religion">Religion</option>
        <option value="Political_Science">Political Science</option>
        <option value="Psychology">Psychology</option>
        <option value="Places">Places</option>
        <option value="Brazil">Brazil</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="United_States">United States</option>
        <option value="Textbooks">Textbooks</option>
        <option value="History">History</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Geography">Geography</option>
        <option value="Psychology">Psychology</option>
        <option value="Algebra">Algebra</option>
        <option value="Education">Education</option>
        <option value="Business_&_Economics">Business & Economics</option>
        <option value="Science">Science</option>
        <option value="Chemistry">Chemistry</option>
        <option value="English_Language">English Language</option>
        <option value="Physics">Physics</option>
        <option value="Computer_Science">Computer Science</option>
      </select>

      <select
        value={selectMinimumRating}
        onChange={(e) => setSelectMinimumRating(e.target.value)}
      >
        <option value="">Select a minimum rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <select
        value={selectMaximumRating}
        onChange={(e) => setSelectMaximumRating(e.target.value)}
      >
        <option value="">Select a maximum rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      
      {bookData === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total Books: {bookData.numFound}</p>
          {bookData.docs.map((book) => (
            <div key={book.key}>
              <h2>
                {book.title}
                {/* {book.title} by {book.author_name[0]} */}
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

// export default App;
