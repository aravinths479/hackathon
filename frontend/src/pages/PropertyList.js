import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const [filters, setFilters] = useState({
    place: "",
    areaMin: "",
    areaMax: "",
    bedrooms: "",
    bathrooms: "",
    colleges: null,
    hospitals: null
  });

  // Function to fetch properties from the API
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/property`);
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  // Apply filters to properties
  const applyFilters = () => {
    let filtered = properties;

    if (filters.place) {
      filtered = filtered.filter(property =>
        property.place.toLowerCase().includes(filters.place.toLowerCase())
      );
    }
    if (filters.areaMin || filters.areaMax) {
      filtered = filtered.filter(property => {
        const area = property.area;
        if (filters.areaMin && area < filters.areaMin) return false;
        if (filters.areaMax && area > filters.areaMax) return false;
        return true;
      });
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(property =>
        property.bedrooms.toString() === filters.bedrooms
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(property =>
        property.bathrooms.toString() === filters.bathrooms
      );
    }
    

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredProperties.length / propertiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container className="mt-5">
      <center><h2>Properties</h2></center>
      <br />
      <h3>Filters</h3>
      <Row>
        {/* Filter Form Column */}
        <Col md={3}>
          <Form className="mb-4">
            <Form.Group controlId="filterPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                name="place"
                value={filters.place}
                placeholder="Enter place"
                onChange={handleFilterChange}
              />
            </Form.Group>
            <Form.Group controlId="filterAreaMin">
              <Form.Label>Min Area</Form.Label>
              <Form.Control
                type="number"
                name="areaMin"
                value={filters.areaMin}
                placeholder="Min area (sqft)"
                onChange={handleFilterChange}
              />
            </Form.Group>
            <Form.Group controlId="filterAreaMax">
              <Form.Label>Max Area</Form.Label>
              <Form.Control
                type="number"
                name="areaMax"
                value={filters.areaMax}
                placeholder="Max area (sqft)"
                onChange={handleFilterChange}
              />
            </Form.Group>
            
            
          </Form>
        </Col>

        {/* Property Cards Column */}
        <Col md={9}>
          <Row xs={1} md={2} lg={2} xl={3} className="g-4">
            {currentProperties.map((property) => (
              <Col key={property._id}>
                <Card style={{ width: "18rem" }}>
                  {/* Image */}
                  <Card.Img variant="top" src={property.imageUrl} />
                  <Card.Body>
                    {/* Property Name */}
                    <Card.Title>{property.place}</Card.Title>
                    {/* Area */}
                    <Card.Text>
                      {`${property.area} sqft`}
                      <br />
                      {`${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms`}
                      
                    </Card.Text>
                    {/* Likes Icon with Count */}
                    <Button variant="">
                      <i className="bi bi-heart">Likes: </i> {property.likes}
                    </Button>
                    {/* View Details Button */}
                    <Link to={`/property/${property._id}`} className="btn btn-primary">View Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

            

          {/* Pagination */}
          <Pagination className="mt-4">
            <Pagination.Prev onClick={goToPrevPage} disabled={currentPage === 1} />
            {Array.from({ length: Math.ceil(filteredProperties.length / propertiesPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={goToNextPage} disabled={currentPage === Math.ceil(filteredProperties.length / propertiesPerPage)} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyList;
