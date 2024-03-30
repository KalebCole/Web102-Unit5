export default function BooksList({ books }) {
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
}