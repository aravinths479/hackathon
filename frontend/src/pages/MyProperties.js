import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import { useAuthContext } from "../hooks/useAuthContext";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuthContext();

  // Function to fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/property/my-property`, {headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },});
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      
      setProperties(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to delete property
  const deleteProperty = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/property/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to delete property");
      }
      // Filter out the deleted property from the list
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to update property
  const updateProperty = async (updatedProperty) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/property/update/${updatedProperty._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(updatedProperty),
      });
      if (!response.ok) {
        throw new Error("Failed to update property");
      }
      // Update the property in the list
      setProperties(properties.map((property) => (property._id === updatedProperty._id ? updatedProperty : property)));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <Container className="mt-5">
      <h2>My Properties</h2>
      <br />
      <Row xs={1} md={2} lg={3} className="g-4">
        {properties.map((property) => (
          <Col key={property._id}>
            <PropertyCard property={property} onDelete={deleteProperty} onUpdate={updateProperty} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyProperties;
