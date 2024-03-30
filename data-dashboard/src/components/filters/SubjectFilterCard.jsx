export default function SubjectFilterCard({ subjectFilter, setSubjectFilter }) {
    const subjects = [
        "All",
        "Fiction",
        "Science Fiction",
        "Action & Adventure",
        "Drama",
        "bdfsdf"
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
}