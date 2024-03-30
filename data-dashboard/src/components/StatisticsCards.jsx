export default function StatisticsCards({ books }) {
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
}