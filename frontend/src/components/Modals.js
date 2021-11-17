
import React, { useState } from 'react';
import { Row, Col, Card, Modal, Button, Container } from '@themesberg/react-bootstrap';;


export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <h1 className="h2">Modals</h1>
            <p className="mb-0">
              Use modals to develop faster and more interactive user interfaces.
          </p>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="mb-4">
          </Col>
        </Row>
      </Container>
    </article>
  );
};
