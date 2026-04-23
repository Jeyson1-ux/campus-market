import { useState, useEffect } from 'react'
import axios from "axios";
import ListingTable from './components/ListingTable';
import "./App.css";
import StatsBar from './components/Statsbar';

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
    <div className='app'>
      <h1>Campus Market</h1>
      <p className='subtitle'>Buy, sell, and lend within your own unviersity</p>

      {loading && <p> Loading...</p>}
      {/* Om error innehåller text visas detta */}
      {error && <p className='error-text'>{error}</p>}


      {/* Loop thorugh all the listings if the site is no longer loading */}
      {!loading && !error && <ListingTable listings={listings} />}
    </div>
  );
}

export default App;
