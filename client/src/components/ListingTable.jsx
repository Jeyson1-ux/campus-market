import ListingRow from "./ListingRow";

function ListingTable({ listings }) {
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
                    </tr>
                </thead>
                <tbody>
                    {listings.length === 0 ? (
                        <tr>
                            <td colSpan="6">No listings were found</td>
                        </tr>
                    ) : (
                        listings.map((listing) => (
                            <ListingRow key={listing._id} listing={listing} />

                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListingTable;