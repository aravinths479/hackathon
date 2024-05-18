import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const PropertyCard = ({ property, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState({ ...property });

  const handleCloseModal = () => setShowModal(false);

  const handleUpdate = () => {
    console.log(updatedProperty);
    onUpdate(updatedProperty);
    handleCloseModal();
  };

  return (
    <>
      <Card className="mb-3">
        {/* Add image to the Card */}
        <Card.Img variant="top" src={property.imageUrl} />

        <Card.Body>
          <Card.Title>{property.place}</Card.Title>
          <Card.Text>
            <strong>Area:</strong> {property.area}
            <br />
            <strong>Bedrooms:</strong> {property.bedrooms}
            <br />
            <strong>Bathrooms:</strong> {property.bathrooms}
            <br />
            <strong>Nearby Hospitals:</strong> {property.nearbyHospitals}
            <br />
            <strong>Nearby Colleges:</strong> {property.nearbyColleges}
            <br />
          </Card.Text>
          <Button variant="danger" onClick={() => onDelete(property._id)}>
            Delete
          </Button>
          <Button variant="primary" className="ms-2" onClick={() => setShowModal(true)}>
            Edit
          </Button>
        </Card.Body>
      </Card>

      {/* Edit Property Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="place">
              <Form.Label>Place:</Form.Label>
              <Form.Control
                type="text"
                value={updatedProperty.place}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, place: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="area">
              <Form.Label>Area:</Form.Label>
              <Form.Control
                type="number"
                value={updatedProperty.area}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, area: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bedrooms">
              <Form.Label>Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                value={updatedProperty.bedrooms}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, bedrooms: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bathrooms">
              <Form.Label>Bathrooms:</Form.Label>
              <Form.Control
                type="number"
                value={updatedProperty.bathrooms}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, bathrooms: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nearbyHospitals">
              <Form.Label>Nearby Hospitals:</Form.Label>
              <Form.Control
                type="text"
                value={updatedProperty.nearbyHospitals}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, nearbyHospitals: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nearbyColleges">
              <Form.Label>Nearby Colleges:</Form.Label>
              <Form.Control
                type="text"
                value={updatedProperty.nearbyColleges}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, nearbyColleges: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                value={updatedProperty.imageUrl}
                onChange={(e) => setUpdatedProperty({ ...updatedProperty, imageUrl: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyCard;
