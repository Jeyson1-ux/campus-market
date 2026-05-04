import { useState, useEffect, useRef } from 'react'
import axios from "axios";
import ListingTable from './components/ListingTable';
import ListingForm from './components/ListingForm';
import "./App.css";
import StatsBar from "./components/Statsbar.jsx";
import ListingCards from './components/ListingCards';

import hkrLogo from "./assets/universities/hkr.png";
import lundLogo from "./assets/universities/lund.png";
import mauLogo from "./assets/universities/mau.webp";
import stockholmLogo from "./assets/universities/Stockholm.webp";
import linkopingLogo from "./assets/universities/Linköpings.webp";
import UniversitySelector from "./components/UniversitySelector";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const DEFAULT_USER_ID = "69e89c3e4ed9badcbfa23f91";

function App() {
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [editinglisting, setEditingListing] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("HKR");
  const formRef = useRef(null);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/listings`);

      setListings(res.data); // React uppdaterar UL automatiskt

      setError("") // Om det lyckas så kan vi rensa alla tidigare fel

    } catch (err) {
      setError("Failed to fetch listings")
    } finally {
      setLoading(false) // Vare sig det lyckas eller inte, sluta visa loading läget(att sidan laddas)
    }
  };


  useEffect(() => {
    fetchListings();

    const interval = setInterval(() => {
      fetchListings()
    }, 10000); // Gör att sidan uppdateras automatiskt, hämtar nya listings och stats var 10:e sekund
    return () => clearInterval(interval); //Rensa det sedan

  }, []);

  const universities = [
    {
      name: "Kristianstad University", 
      code: "HKR", 
      location: "Kristianstad",
      logo: hkrLogo,
      id: "69e89c3e4ed9badcbfa23f8c"
    },
    {
      name: 
      "Malmö University", 
      code: "MAU",
      location: "Malmö",
      id: "69e89c3e4ed9badcbfa23f8e",
      logo: mauLogo
    },
    {
      name: "Lunds University", 
      code: "LU", 
      logo: lundLogo,
      location: "Lund",
      id: "69e89c3e4ed9badcbfa23f8d"
    },
    {
    name: "Stockholms universitet",
    code: "SU",
    location: "Stockholm",
    logo: stockholmLogo,
    id: "69e89c3e4ed9badcbfa23f8f"
  },
  {
    name: "Linköpings universitet",
    code: "LIU",
    location: "Linköping",
    logo: linkopingLogo,
    id: "69e89c3e4ed9badcbfa23f90"
  }
]

  const selectedUniversityObject = universities.find(
    (uni) => uni.code === selectedUniversity
  );

  const handleCreateOrUpdate = async (FormData) => {
    try{
      if (!selectedUniversityObject?.id) {
        setError("Selected university is missing a database id");
        return;
      }
      const finalData = {
        ...FormData,
        userId:FormData.userId?._id || DEFAULT_USER_ID,
        universityId: selectedUniversityObject.id
      };

      if (editinglisting) {
        //UPDATE (PUT)
        await axios.put(`${API_URL}/listings/${editinglisting._id}`,finalData)
        setEditingListing(null); // Avsluta edit mode
      } else {
        await axios.post(`${API_URL}/listings`, finalData);
      }

      fetchListings();
      setError(""); // rensa fel
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Failed to save listing");
    }
  };

  const handleEdit = (listing) => {
  setEditingListing(listing);

  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
};
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you wanna delete this listing?");
    if (!confirmed) return; // avbryt operationen om nej

    try{
      await axios.delete(`${API_URL}/listings/${id}`); // raderar den
      fetchListings();
      setError("");
    } catch (err) {
      setError("Failed to delete the listing")
    }
  }

  //Filter
  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase()) // kollar om title matchar sökfältet
    const matchesUniversity = listing.universityId?.code === selectedUniversity; // annonsen tillhör till vilket lärosäte

    return matchesSearch && matchesUniversity;
  });
  
  const universityStats = {
    totalListings: filteredListings.length,
    averagePrice:
      filteredListings.length > 0
        ? filteredListings.reduce((sum, listing) => sum + listing.price, 0) / filteredListings.length
        : 0
  };

  return (
    <div className='app'>
      <h1>Campus Market</h1>
      <p className='subtitle'>Buy, sell, and lend within your own university</p>
      <UniversitySelector //Selector = komponent där användaren väljer något
        universities={universities} // Visar alla universities till komponenten, de kommer visas med logga
        selectedUniversity={selectedUniversity} //spara vilken skola the user valde
        onSelectUniversity={setSelectedUniversity} // // ändrar vald skola när man klickar
      />
      <StatsBar stats={universityStats} />  {/* Kommer att visa count och average för vald universitet */}

      <input
        className='search-input'
        type='text'
        placeholder='Search by title'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div ref={formRef}>
        <ListingForm
          onSubmit={handleCreateOrUpdate} //Tar hand om update och delete
          editingListing={editinglisting}// Skickar edit-data
          clearEditing={() => setEditingListing(null)} //cancel edit
        />
      </div>
        
      {loading && <p> Loading...</p>}
      {/* Om error innehåller text visas detta */}
      {error && <p className='error-text'>{error}</p>}

       {!loading && !error && (
        <ListingCards 
          listings={filteredListings}
          onEdit={handleEdit}
          onDelete={handleDelete} 
        />
      )}

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
