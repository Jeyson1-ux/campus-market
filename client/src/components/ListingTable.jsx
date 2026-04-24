import ListingRow from "./ListingRow";

function ListingTable({ listings, onEdit, onDelete }) {
    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Condition</th>
                        <th>Type</th>
                        <th>University</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.length === 0 ? (
                        <tr>
                            <td colSpan="7">No listings were found</td>
                        </tr>
                    ) : (
                        listings.map((listing) => (
                            <ListingRow key={listing._id} listing={listing} onEdit={onEdit} onDelete={onDelete} />

                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListingTable;