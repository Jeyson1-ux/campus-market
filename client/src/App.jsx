import { useState, useEffect } from 'react'
import axios from "axios";
import ListingTable from './components/ListingTable';
import ListingForm from './components/ListingForm';
import "./App.css";
import StatsBar from './components/Statsbar';

import hkrLogo from "./assets/universities/hkr.png";
import lundLogo from "./assets/universities/lund.png";
import mauLogo from "./assets/universities/mau.webp";
import chalmersLogo from "./assets/universities/Chalmers.png";
import kthLogo from "./assets/universities/KTH.webp";
import UniversitySelector from './UniversitySelector';

const API_URL = "http://localhost:5000/api";

function App() {
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [editinglisting, setEditingListing] = useState(null);
  const [stats, setStats] = useState({totalListings: 0, averagePrice: 0});
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("HKR");

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

  const fetchStats = async () => {
    try{
      const res = await axios.get(`${API_URL}/listings/stats`);
      setStats(res.data); //Spara stats
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchListings();
    fetchStats();

    const interval = setInterval(() => {
      fetchListings(),
      fetchStats();
    }, 1000);
    return () => clearInterval(interval); //Rensa det sedan

  }, []);

  const universities = [
    {name: "Kristianstad University", code: "HKR", logo: hkrLogo},
    {name: "Malmö University", code: "MAU", logo: mauLogo},
    {name: "Lunds University", code: "LU", logo: lundLogo},
    {name: "Kungliga Tekniska Högskolan", code: "KTH", logo: kthLogo},
    {name: "Chalmers", code: "CHALMERS", logo: chalmersLogo},
  ]

  const handleCreateOrUpdate = async (FormData) => {
    try{
      if (editinglisting) {
        //UPDATE (PUT)
        await axios.put(`${API_URL}/listings/${editinglisting._id}`,FormData)
        setEditingListing(null); // Avsluta edit mode
      } else {
        await axios.post(`${API_URL}/listings`, FormData);
      }

      fetchListings();
      fetchStats();
      setError(""); // rensa fel
    } catch (err) {
      setError("Faile to save listing");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you wanna delete this listing?");
    if (!confirmed) return; // avbryt operationen om nej

    try{
      await axios.delete(`${API_URL}/listings/${id}`); // raderar den
      fetchListings();
      fetchStats();
      setError("");
    } catch (err) {
      setError("Failed to delete the listing")
    }
  }

  //Filter
  const filteredListings = listings.filter((listing) => 
    listing.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='app'>
      <h1>Campus Market</h1>
      <p className='subtitle'>Buy, sell, and lend within your own unviersity</p>
      <UniversitySelector //Selector = komponent där användaren väljer något
        universities={universities} // Visar alla universities till komponenten, de kommer visas med logga
        selectedUniversity={selectedUniversity} //spara vilken skola the user valde
        onSelectUniversity={setSelectedUniversity} // // ändrar vald skola när man klickar
      />
      <StatsBar stats={stats} />  {/* Kommer att visa count och average */}

      <input
        className='search-input'
        type='text'
        placeholder='Search by title'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      
      <ListingForm
        onSubmit={handleCreateOrUpdate} //Tar hand om update och delete
        editingListing={editinglisting}// Skickar edit-data
        clearEditing={() => setEditingListing(null)} //cancel edit
      />
      
      {loading && <p> Loading...</p>}
      {/* Om error innehåller text visas detta */}
      {error && <p className='error-text'>{error}</p>}


      {/* Loop thorugh all the listings if the site is no longer loading */}
      {!loading && !error && (
        <ListingTable 
          listings={filteredListings}
          onEdit={setEditingListing}
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}

export default App;
