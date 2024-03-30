export default function RatingFilterCard({ ratingFilter, setRatingFilter }) {
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
}