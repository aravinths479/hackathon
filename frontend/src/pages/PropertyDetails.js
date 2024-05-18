import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeError, setLikeError] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DEV_API}/api/property/${propertyId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data);
        setLikes(data.likes);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleInterestClick = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch(
        `${process.env.REACT_APP_DEV_API}/api/property/${propertyId}/interest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ propertyId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to express interest");
      }
      // Handle success response
      setMailSent(true); // Set mailSent state to true
      setLoading(false); // Reset loading state
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Reset loading state in case of error
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_API}/api/like/like/${propertyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("You have Alredy like this property");
      }
      // Update the like count in the state using the functional form of setLikes
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error(error.message);
      setLikeError(error.message);
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={property.imageUrl}
                alt="image not found"
                style={{
                  marginBottom: "10px",
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              />
              {/* Like Button */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleLikeClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    ></path>
                  </svg>
                  {likes} Likes
                </button>
              </div>
              {likeError != "" && (
                <div className="alert alert-dismissible alert-danger">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                  ></button>
                  {likeError}
                </div>
              )}
            </div>
          </div>
          <div className="col">
            <div>
              <h2
                style={{
                  borderBottom: "2px solid #007bff",
                  paddingBottom: "10px",
                }}
              >
                Property Details
              </h2>
              <p>
                <strong>Place:</strong> {property.place}
              </p>
              <p>
                <strong>Area:</strong> {property.area}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </p>
              <p>
                <strong>Nearby Hospitals:</strong> {property.nearbyHospitals}
              </p>
              <p>
                <strong>Nearby Colleges:</strong> {property.nearbyColleges}
              </p>
            </div>
          </div>
          <div className="col">
            <div>
              <h2
                style={{
                  borderBottom: "2px solid #007bff",
                  paddingBottom: "10px",
                }}
              >
                Seller Details
              </h2>
              <p>
                <strong>Name:</strong> {property.user.firstName}{" "}
                {property.user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {property.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {property.user.phone}
              </p>
            </div>

            {loading ? ( // Display loading indicator if loading is true
              <div>Loading...</div>
            ) : mailSent ? ( // Display success message if mailSent is true
              <div className="alert alert-dismissible alert-success">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                ></button>
                Mail sent to Seller
              </div>
            ) : (
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleInterestClick}
              >
                I am Interested
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
