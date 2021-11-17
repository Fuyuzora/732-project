
import React, { useState, useRef, useEffect } from "react"
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap'
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets"
import NetworkingData from '../data/NetworkingData'
import Progress from "../components/Progress"
import { trafficShares, totalOrders } from "../data/charts"
import { PageVisitsTable } from "../components/Tables"
import Collapse from 'react-bootstrap/Collapse'

const elements = NetworkingData
const calculateMBTIDistance = (mbti1, mbti2) => {
  let score = 0.2
  for (var i = 0; i < 4; i++) {
    if (mbti1.charAt(i) === mbti2.charAt(i)) {
      score += 0.2
    }
  }
  return score
}

const calculateInfluenceDistance = (influind1, influind2) => influind1 * influind2
const calcPossibleFriends = (id = 0) => {
  return elements.slice(0, 14).filter(el => el.id !== id).map((el) => {
    let mbtiDist = calculateMBTIDistance(elements[id].data.mbti, el.data.mbti)
    let influDist = calculateInfluenceDistance(elements[0].data.influenceIndex, el.data.influenceIndex)
    return {
      id: el.id,
      redditPosts: el.data.redditPosts,
      mbtiSimilarity: mbtiDist,
      influenceDistance: influDist,
      friendPossibility: mbtiDist * influDist
    }
  })
}


export const DataInteractionForm = () => {
  const [possibleFriends, setPossibleFriends] = useState(calcPossibleFriends)
  const [primaryElement, setPrimaryElement] = useState(elements[0])
  const [secondaryElement, setSecondaryELement] = useState(elements[1])
  const [psFriendRate, setPSFriendRate] = useState(0)
  const [showSearchResults, setShowSearchResults] = useState(true)
  const [forceReRender, setForceReRender] = useState(0)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerForceReRender()
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [ref])

  useEffect(() => {
    let id = primaryElement.id
    setPossibleFriends(calcPossibleFriends(id))
    setPSFriendRate(possibleFriends.filter(el => el.id === secondaryElement.id)[0].friendPossibility)
  }, [primaryElement])

  const onHandleSubmit = (e) => {
    let p = elements.filter((el) => { return el.id === e.target.elements[0].value })
    let s = elements.filter((el) => { return el.id === e.target.elements[1].value })
    setPrimaryElement(p[0])
    setSecondaryELement(s[0])
    setShowSearchResults(true)
  }

  const triggerForceReRender = () => {
    setForceReRender(forceReRender => forceReRender + 1)
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Test your friendship</h5>
        <Form onSubmit={onHandleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName" name='name'>
                <Form.Label>Your Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your name here" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Friend's Name</Form.Label>
                <Form.Control required type="text" placeholder="Your friend(?)'s name here" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div>
                <Button variant="primary" type="submit" >Search and see the results!</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <Collapse in={showSearchResults}>
          <div>
            <Card border="light" className="bg-white shadow-sm mt-4">
              <Card.Body>
                <Card.Title>
                  The possibility of {primaryElement.data.label} and {secondaryElement.data.label} becoming friends is: {psFriendRate}
                </Card.Title>
                <Progress label={`MBTI similarity: ${primaryElement.data.label}(${primaryElement.data.mbti}) vs ${secondaryElement.data.label} (${secondaryElement.data.mbti})`}
                  variant='secondary' size='lg' now={psFriendRate * 1000} />
                <Row className="justify-content-md-center mt-5">
                  <Col xs={12} sm={6} xl={4} className="mb-4">
                    <CounterWidget
                      category={primaryElement.data.label}
                      title={'Reddit posts: '+primaryElement.data.redditPosts}
                      period="terminal"
                      percentage={primaryElement.influenceDistance}
                      icon={faComment}
                      iconColor="shape-secondary"
                    />
                  </Col>
                  <Col xs={12} sm={6} xl={4} className="mb-4">
                    <CounterWidget
                      category={secondaryElement.data.label}
                      title={'Reddit posts: '+secondaryElement.data.redditPosts}
                      period="center"
                      percentage={secondaryElement.influenceDistance}
                      icon={faComment}
                      iconColor="shape-tertiary"
                    />
                  </Col>
                  <Col xs={12} sm={6} xl={4} className="mb-4">
                    <div ref={ref}>
                      <CircleChartWidget
                        title='Influence Index'
                        data={trafficShares}
                        type={forceReRender} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <PageVisitsTable
                    data={possibleFriends}
                  />
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}
