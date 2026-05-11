function ListingRow({ listing, onEdit, onDelete }) {
    return (
        <tr>
            <td>{listing.title}</td>
            <td>{listing.price} kr</td>
            <td>{listing.condition}</td>
            <td>{listing.type}</td>
            <td>{listing.universityId?.name || "Unknown"}</td>
            <td>{listing.contactInfo}</td>
            <td>
                <div className="the-actions">
                    <button onClick={() => onEdit(listing)}>Edit</button>
                    <button onClick={() => onDelete(listing._id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default ListingRow;