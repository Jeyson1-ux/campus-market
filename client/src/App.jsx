import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

const API_URL = "http://localhost:5000/api";

function App() {
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/listings`);

      setListings(res.data); // React uppdaterar UL automatiskt

      setError("") // Om det lyckas så kan vi rensa alla tidigare fel

    } catch (err) {
      setError("Failed to fecth listings")
    } finally {
      setLoading(false) // Vare sig det lyckas eller inte, sluta visa loading läget(att sidan laddas)
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <h1>Campus Market</h1>
      {/* If loading is true, show this */}
      {loading && <p> Loading...</p>}
      {/* Om error innehåller text visas detta */}
      {error && <p>{error}</p>}

      {/* Loop thorugh all the listings if the site is no longer loading */}
      {!loading &&
        listings.map((listing) => (
          <div key={listing._id}>
            <h3>{listing.title}</h3>
            <p>{listing.price} SEK</p>
          </div>
        ))}
      </div>
  );
}

export default App
