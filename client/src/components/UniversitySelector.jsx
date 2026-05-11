function UniversitySelector({ universities, selectedUniversity, onSelectUniversity}) {
    return (
        <section className="university-section">
            <div className="section-header">
                <p className="choose">Choose your campus</p>
                <p>Only listings from selected university will be displayed</p>
            </div>

            <div className="university-grid">
                {universities.map((university) => (
                    <button
                        key={university.id} // unik key fron
                        className={selectedUniversity === university.code ? "university-card active" : "university-card"}
                        onClick={() => onSelectUniversity(university.code)}
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