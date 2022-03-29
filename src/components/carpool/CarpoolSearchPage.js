import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CarpoolSearchList from "./CarpoolSearchList";

const CarpoolSearchPage = () => {
  return (
    <div>
      <div>
        <h2>Search Carpools</h2>
      </div>

      <Container>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by date and time"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="2022-01-01" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by pick-up location"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="SM Megamall, Ortigas" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Filter by drop-off location"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="NEX Tower, Makati" />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>

      <div className="mt-4">
        <CarpoolSearchList />
      </div>
    </div>
  );
};

export default CarpoolSearchPage;
