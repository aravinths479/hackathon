import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {  Alert } from 'react-bootstrap';

const AddProperty = () => {
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState("");
  const [nearbyColleges, setNearbyColleges] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const { user } = useAuthContext();

  const validateForm = () => {
    if (!place.trim()) {
      return "Place should not be Empty !";
    }

    if (!area || isNaN(area) || Number(area) <= 0) {
      return "Area should be a positive number";
    }
    if (!nearbyHospitals || isNaN(nearbyHospitals)) {
      return "Add no. of nearby Hospitals";
    }
    if (!nearbyColleges || isNaN(nearbyColleges)) {
      return "Add no. of nearby colleges";
    }

    if (!bedrooms || isNaN(bedrooms) || Number(bedrooms) <= 0 || !Number.isInteger(Number(bedrooms))) {
      return "Bedrooms should be a positive integer";
    }

    if (!bathrooms || isNaN(bathrooms) || Number(bathrooms) <= 0 || !Number.isInteger(Number(bathrooms))) {
      return "Bathrooms should be a positive integer";
    }

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if (!imageUrl || !urlPattern.test(imageUrl)) {
      return "Image URL is invalid";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          place,
          area,
          bedrooms,
          bathrooms,
          nearbyHospitals,
          nearbyColleges,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      // Reset form fields
      setPlace("");
      setArea("");
      setBedrooms("");
      setBathrooms("");
      setNearbyHospitals("");
      setNearbyColleges("");
      setImageUrl("");
      setSuccess("Property added successfully")
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Property</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="place" className="form-label">Place:</label>
          <input
            type="text"
            className="form-control"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">Area:</label>
          <input
            type="number"
            className="form-control"
            id="area"
            placeholder="Area in sq.feet"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bedrooms" className="form-label">Bedrooms:</label>
          <input
            type="number"
            className="form-control"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bathrooms" className="form-label">Bathrooms:</label>
          <input
            type="number"
            className="form-control"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nearbyHospitals" className="form-label">Nearby Hospitals:</label>
          <input
            type="text"
            className="form-control"
            id="nearbyHospitals"
            value={nearbyHospitals}
            onChange={(e) => setNearbyHospitals(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nearbyColleges" className="form-label">Nearby Colleges:</label>
          <input
            type="text"
            className="form-control"
            id="nearbyColleges"
            value={nearbyColleges}
            onChange={(e) => setNearbyColleges(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
