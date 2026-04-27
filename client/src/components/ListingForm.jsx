import { useEffect, useState } from "react";

function ListingForm({ onSubmit, editingListing, clearEditing }) {
    const emptyForm = {
        title: "",
        description: "",
        price: "",
        condition: "Good",
        type: "sell",
        imageUrl: "",
        contactInfo: "",
        userId: "69e88ae6f70f51613dfcf7fa",
        universityId: "69e88a19f70f51613dfcf7f5"
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (editingListing) {
            setFormData({
                title: editingListing.title || "",
                description: editingListing.description || "",
                price: editingListing.price || "",
                condition: editingListing.condition || "Good",
                type: editingListing.type || "sell",
                imageUrl: editingListing.imageUrl || "",
                contactInfo: editingListing.contactInfo || "",
                userId: editingListing.userId?._id || editingListing.userId,
                universityId: editingListing.universityId?._id || editingListing.universityId
            });
        }
    }, [editingListing]);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                imageUrl: reader.result
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...formData,
            price:Number(formData.price) // Converts price to number before sending to backend
        });

        setFormData(emptyForm);
    };

    return (
        <form className="listing-form" onSubmit={handleSubmit}>
            <h2>{editingListing ? "Edit Listing" : "Create Listing"}</h2>

            <input name="title" placeholder="Title" value={formData.title} onChange={changeHandler} required />
            <input name="description" placeholder="Description" value={formData.description} onChange={changeHandler} required />
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={changeHandler} required />

            <select name="condition" value={formData.condition} onChange={changeHandler}>
                <option value="Okay">Okay</option>
                <option value="Good">Good</option>
                <option value="Great">Great</option>
                <option value="Like new">Like New</option>
                <option value="New">New</option>
            </select>

            <select name="type" value={formData.type} onChange={changeHandler}>
                <option value="sell">Sell</option>
                <option value="lend">Lend</option>
            </select>

            <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={changeHandler} required />

            <label className="upload-button">
                Upload Image

                <input
                    type="file"
                    accept="image/*"
                    placeholder="info@example.com"
                    onChange={imageHandler}
                    hidden
                />
            </label>

            {formData.imageUrl && (
                <img
                    src={formData.imageUrl}
                    alt="preview"
                    style={{ width: "100%", marginTop:"10px", borderRadius: "10px"}}
                />
            )}

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