import university from "../../models/university";

function UniversitySelector({ universities, selectedUniversity, onSelectUniversity}) {
    return (
        <section className="university-section">
            <div className="section-header">
                <p className="choose">Choose your campus</p>
                <h2>Select your university</h2>
                <p>Only listings from selected university will be displayed</p>
            </div>

            <div className="university-grid">
                {universities.map((university) => (
                    <button
                        key={university._id} // unik key fron
                        className={selectedUniversity === university._id ? "university-card active" : "university-card"}
                        onClick={() => onSelectUniversity(university._id)}
                    >
                        <img src={university.logo} alt={university.name} />
                        <span>{university.name}</span> {/* visar namn */}
                        <small>{university.code}</small> {/* Visar kod, t.ex HKR */}
                    </button>
                ))}

            </div>
        </section>
    );
}

export default UniversitySelector; // Vi exporterar komponenten