import { useEffect, useState } from "react";
import university from "../../../models/university";

function ListingForm({onSubmit, editingListing, clearEditing}) {
    const [formData, setFormData] = useState ({
        title: "",
        description: "",
        price: "",
        condition: "Good", // default
        type:"sell",
        imageUrl: "",
        contactInfo:"info@example.com",
        userID: "69e88ae6f70f51613dfcf7fa",
        universityID: "69e88a19f70f51613dfcf7f5"
    });

    useEffect(() => {
        if (editingListing) { //Runs when editinglistings changes
            setFormData({
                title:editingListing.title || "",
                description:editingListing.description || "",
                price:editingListing.price || "",
                condition:editingListing.condition || "Good",
                type:editingListing.type || "sell",
                imageUrl:editingListing.imageUrl || "",
                contactInfo:editingListing.contactInfo || "",
                userID:editingListing.userID._id || editingListing.userID,
                universityID: editingListing.universityID._id || editingListing.universityID
            });
        }
    }, [editingListing]);

    const changeHandler = (e) => { //Denna körs när användare ändrar ett fält
        const { name, value } = e.target; // Tar ut namn och värde från inputfältet

        setFormData((prev) => ({ 
            ...prev,
            [name]: name === "price" ? Number(value) : value //price ska göras om till ett nummer annars behåll som en sträng
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Undvika vanlig sidoomladdning
        onSubmit(formData) // skickar formulärdatan till app-komponeneten

        setFormData({ // Här så återställer vi alla fält efter att föregående fält skickats 
            title: "",
            description: "",
            price: "",
            condition: "Good", // default
            type:"sell",
            imageUrl: "",
            contactInfo:"info@example.com",
            userID: "69e88ae6f70f51613dfcf7fa",
            universityID: "69e88a19f70f51613dfcf7f5"
        });
    };

    return (
        <form className="listing-form" onSubmit={handleSubmit}> {/* formulär med submit funktion */}
            <h2>{editingListing ? "Edit Listing": "Create Listing"}</h2> {/* Olika title beroend på mode*/}

            <input name="title" placeholder="Title" value={formData.title} onChange={changeHandler} required/>
            <input name="description" placeholder="Description" value={formData.description} onChange={changeHandler} required/>
            <input name="price" placeholder="Price" value={formData.price} onChange={changeHandler} required/>

            <select name="condition" value={formData.condition} onChange={changeHandler}>
                <option value="Okay">Okay</option>
                <option value="Good">Good</option>
                <option value="Great">Great</option>
                <option value="Like new">Like New</option>
                <option value="New">New</option>
            </select>

            <select name="type" value={formData.type} onChange={changeHandler}>
                <option name="sell">Sell</option>
                <option name="lend">Lend</option>
            </select>

            <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={changeHandler} required></input>

            <div className="form-buttons">
                <button type="submit">{editingListing ? "Update" : "Create"}</button>
                {editingListing && (
                    <button type="button" onClick={clearEditing}>Cancel</button>
                )}
            </div>
        </form>
    );
}   

export default ListingForm;
