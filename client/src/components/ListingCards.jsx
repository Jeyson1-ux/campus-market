import ListingForm from "./ListingForm";

function ListingCards({ listings, onEdit, onDelete}) {
    return (
        <section className="card-section">
            <h2>Listings</h2>

            <div className="cards-grid"> 
                {listings.length === 0 ? (
                    <p className="text-info">No Listings found for this university</p>
                ) : ( 
                    listings.map((listings) => (
                        <article className="card-listing" key={listings._id}> 
                            <div className="card-badge">{listings.type}</div>
                            <h3>{listings.title}</h3>
                            <p className="card-description">{listings.description}</p>

                            <div className="card-meta">
                                <span>{listings.condition}</span>
                                <strong>{listings.price} kr</strong>
                            </div>

                            <p className="card-contact">{listings.contactInfo}</p>

                            <div className="card-actions">
                                <button onClick={() => onEdit(listings)}>Edit</button>
                                <button className="delete-button" onClick={() => onDelete(listings._id)}>Delete</button>
                            </div>

                        </article>
                    ))
                )}

            </div>
        </section>
    );
}


export default ListingCards;