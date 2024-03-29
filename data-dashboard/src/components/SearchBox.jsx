import Fuse from 'fuse.js';
import { useState, useMemo } from 'react';

const SearchBox = ({ books, setFilteredBooks }) => {
  const [query, setQuery] = useState('');

  // Configure Fuse.js options
  const fuseOptions = {
    includeScore: true,
    // You can include other keys to search in, like 'author_name'
    keys: ['title']
  };

  // Use useMemo to prevent recalculating the search on every render
  const fuse = useMemo(() => new Fuse(books, fuseOptions), [books, fuseOptions]);

  const handleSearch = (event) => {
    const { value } = event.target;
    console.log(value)
    setQuery(value);

    if (value.length > 2) { // Only search if the query length is 3 or more characters
      const results = fuse.search(value);
      const matches = results.map(result => result.item);
      console.log(" in here")
      setFilteredBooks(matches);
    } else {
        console.log("No search query")
      setFilteredBooks(books); // If the search query is cleared, reset the filtered books to the original list
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search for books..."
      style={{ width: '100%', padding: '10px', margin: '20px 0', fontSize: '16px' }}
    />
  );
};

export default SearchBox;