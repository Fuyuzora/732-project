import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Breadcrumb, Image, Form, Button } from '@themesberg/react-bootstrap'
import raw_data from '../assets/img/raw_data.png'
import inertia_vs_k from '../assets/img/inertia vs k.png'
import fig_keans from '../assets/img/fig_kmeans.png'
import normalized_data from '../assets/img/normalized_data.png'
import centerData from '../data/center_location.json'
import Collapse from 'react-bootstrap/Collapse'

export default () => {
  const [cluster, setCluster] = useState(0)
  const [showResult, setShowResult] = useState(true)
  const getCluster = (a, b, c, d, e) => {
    let g = 0
    let curL2Dist = Infinity
    centerData.map((el, id) => {
      let l2Dist = (a - el.followers_count)**2 + (b - el.following_count)**2 + (c - el.post_count)**2 + (d - el.listed_count)**2 + (e - el.active_date)**2
      if (l2Dist < curL2Dist) {
        curL2Dist = l2Dist
        g = id
      }
    })
    return g+1
  }

  const onSubmit = e => {
    let followers = e.target.elements[0].value
    let followings = e.target.elements[1].value
    let posted = e.target.elements[2].value
    let listed = e.target.elements[3].value
    let activeDays = e.target.elements[4].value
    setCluster(getCluster(followers, followings, posted, listed, activeDays))
    // setCluster(getCluster(144, 173, 876, 1, 537))
    setShowResult(true)
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Friend Finder</Breadcrumb.Item>
            <Breadcrumb.Item active>Networking</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Networking: Human relationship analysis on relative positions within the networks</h4>
        </div>
      </div>
      <div>
        <h5>Raw Data</h5>
        <p>The most raw data we gathered from GitHub user <a href='https://github.com/jonbruner/twitter-analysis'>@jonbruner</a>, who extracted it earlier from Twitter</p>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={raw_data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Normalized data</h5>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={normalized_data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>2D Visualization</h5>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={fig_keans} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Let's give it a try</h5>
        <Row className="justify-content-center">
          <Col>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col md={4} className="mb-3">
                      <Form.Group id="following">
                        <Form.Label>Followers count</Form.Label>
                        <Form.Control required type="number" placeholder="Enter followers count here" />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group id="follower">
                        <Form.Label>Followings count</Form.Label>
                        <Form.Control required type="number" placeholder="Enter following count here" />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group id="listed">
                        <Form.Label>Posts count</Form.Label>
                        <Form.Control required type="number" placeholder="Enter post count here" />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group id="posts">
                        <Form.Label>Listed count</Form.Label>
                        <Form.Control required type="number" placeholder="Enter listed count here" />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group id="activedays">
                        <Form.Label>Activate days</Form.Label>
                        <Form.Control required type="numer" placeholder="Enter activate days here" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <div>
                        <Button variant="primary" type="submit" >Classify and see the results!</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
                <Collapse in={showResult}>
                  <Row>
                    <Col className='mt-4'>
                      <span>The user belongs to cluster {cluster}</span></Col>
                  </Row>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
