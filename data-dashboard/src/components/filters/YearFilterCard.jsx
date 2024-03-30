export default function YearFilterCard({ yearFilter, setYearFilter }) {
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
}