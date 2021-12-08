
import React, { useState, useRef, useEffect } from "react"
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap'
import { CounterWidget, CircleChartWidget } from "../components/Widgets"
import NetworkingData from '../data/NetworkingData'
import Progress from "../components/Progress"
import { influenceDistrib } from "../data/charts"
import { PageVisitsTable } from "../components/Tables"
import Collapse from 'react-bootstrap/Collapse'

const elements = NetworkingData
const sigmoid = (x, k) => {
  return 1 / (1 + Math.exp(-x / k))
}

const translate = (value, leftMin, leftMax, rightMin, rightMax) => {
  let leftSpan = leftMax - leftMin
  let rightSpan = rightMax - rightMin
  let valueScaled = (value - leftMin) / (leftSpan)
  return rightMin + (valueScaled * rightSpan) - 2
}
const calculateMBTIDistance = (mbti1, mbti2) => {
  let score = 0.18
  for (var i = 0; i < 4; i++) {
    if (mbti1.charAt(i) === mbti2.charAt(i)) {
      score += 0.18
    }
  }
  return sigmoid(translate(score, 0.18, 0.18 * 5, 1, 3), 0.5).toFixed(3)
}

const calculateInfluenceDistance = (influind1, influind2) => {
  let score = (influind1 * influind2).toFixed(3)
  return sigmoid(translate(score, 4, 15 * 14, 1, 3), 0.5).toFixed(3)
}
const calcPossibleFriends = (id = 0) => {
  return elements.slice(0, 15).filter(el => el.id !== id).map((el) => {
    let mbtiDist = calculateMBTIDistance(elements[id].data.mbti, el.data.mbti)
    let influDist = calculateInfluenceDistance(elements[id].data.influenceIndex, el.data.influenceIndex)
    return {
      id: el.id,
      label: el.data.label,
      tweets: el.data.tweets,
      mbtiSimilarity: mbtiDist,
      influenceDistance: influDist,
      friendPossibility: sigmoid(translate(mbtiDist * influDist, 0, 0.5, 1, 3), 0.5).toFixed(3)
    }
  })
}


export const DataInteractionForm = () => {
  const [possibleFriends, setPossibleFriends] = useState(calcPossibleFriends)
  const [primaryElement, setPrimaryElement] = useState(elements[0])
  const [secondaryElement, setSecondaryELement] = useState(elements[1])
  const [psFriendRate, setPSFriendRate] = useState(0)
  const [showSearchResults, setShowSearchResults] = useState(false)
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
  }, [primaryElement])

  useEffect(() => {
    setPSFriendRate(possibleFriends.filter(el => el.id === secondaryElement.id)[0].friendPossibility)
  }, [possibleFriends, secondaryElement])

  const onHandleSubmit = (e) => {
    let p = elements.slice(0, 15).filter((el) => { return el.data.label === e.target.elements[0].value })
    let s = elements.slice(0, 15).filter((el) => { return el.data.label === e.target.elements[1].value })
    if (p.length !== 0 && s.length !== 0) {
      setPrimaryElement(p[0])
      setSecondaryELement(s[0])
      setShowSearchResults(true)
    } else {
      alert("Name(s) not found")
    }
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
                  variant='primary' size='lg' now={(calculateMBTIDistance(primaryElement.data.mbti, secondaryElement.data.mbti) * 100).toFixed(3)} />
                <Progress label={`Influence distance: ${primaryElement.data.label} vs ${secondaryElement.data.label}`}
                  variant='secondary' size='lg' now={calculateInfluenceDistance(primaryElement.data.influenceIndex, secondaryElement.data.influenceIndex) * 100} />
                <Row className="mt-5">
                  <Col xs={10} sm={8} xl={6} className="mb-4">
                    <CounterWidget
                      label={primaryElement.data.label}
                      tweets={'Tweets: ' + primaryElement.data.tweets}
                      mbti={primaryElement.data.mbti}
                      influenceIndex={primaryElement.data.influenceIndex}
                      icon={faComment}
                      iconColor="shape-secondary"
                    />
                  </Col>
                  <Col xs={10} sm={8} xl={6} className="mb-4">
                    <CounterWidget
                      label={secondaryElement.data.label}
                      tweets={'Tweet: ' + secondaryElement.data.tweets}
                      mbti={secondaryElement.data.mbti}
                      influenceIndex={secondaryElement.data.influenceIndex}
                      icon={faComment}
                      iconColor="shape-tertiary"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={20} sm={16} xl={12} className="mb-4">
                    <div ref={ref}>
                      <CircleChartWidget
                        title='Influence Group Distribution'
                        data={influenceDistrib}
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
