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

export default AuthorSelect;