import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Breadcrumb } from '@themesberg/react-bootstrap'
import NodeGraph from "../components/NodeGraph"
import { DataInteractionForm } from "./DataInteractionForm"


export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <div className="d-block mb-4 mb-md-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
          <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
          <Breadcrumb.Item>Friend Finder</Breadcrumb.Item>
          <Breadcrumb.Item active>Demo</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Demo</h4>
        <p className="mb-0">Below is a demo showing the networking and some sample application on how this tool can help you to identify potential friends</p>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2"></div>

      <Row>
        <Col>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <div>
                <NodeGraph />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <DataInteractionForm />
        </Card.Body>
      </Card>
    </>
  )
}
