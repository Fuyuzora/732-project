import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Breadcrumb, Image } from '@themesberg/react-bootstrap'
import networking_icon from '../assets/img/networking_icon.png'
import interpersonal_icon from '../assets/img/interpersonal_icon.png'

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Friend Finder</Breadcrumb.Item>
            <Breadcrumb.Item active>Introduction</Breadcrumb.Item>
          </Breadcrumb>
          <h2>Friend Finder: Make your friendship tangible</h2>
          Preseneted by Yubo Chen, Hayden Yan, Zeyu Hu, Robert Wan
        </div>
      </div>
      <div>
        <h5 className='mt-4'>What is Friend Finder?</h5>
        <Row className="justify-content-md-center">
          <Col>

            Have you ever worried about you having no friends? Or do you often question weather the "friends" around you are <b>truly</b> your friends?
            We've got you covered!
            Friend Finder is a revolutionary tool that helps you quantify your friendship based on your social media activities.
            For each person inside your social network we generate a index demonstrates how likely that you have that person will become friends.
            With these numbers in your hand, all your friends relative questions will be solved once and for all.

          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>How do we do that?</h5>
        Based on extensive social science research, we take two major components into consideration: interpersonal likeliness and networking positions.
        <Row className="justify-content-md-center mt-4">
          <Col>
            <Row>
              <Col md={6}>
                <Card border="light" className="shadow-sm">
                  <Card.Body>
                    <Row className="justify-content-md-center">
                      <Col md={6}>
                        <Image src={interpersonal_icon} />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <h6>Interpersonal likeliness</h6>
                Describes how similar you and your potential friends are as people using your personalities. 
                This category focus on the pure interpersonal relationship without external influences
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col md={6}>
                <Card border="light" className="shadow-sm">
                  <Card.Body>
                    <Image src={networking_icon} />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <h6>Networking positioning</h6>
                Describes where you and your potential friends are within the network. This part focus solely on the social aspect and ignores personal likeliness
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}
