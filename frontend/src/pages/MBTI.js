import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Breadcrumb, Image } from '@themesberg/react-bootstrap'
import wordcloud from '../assets/img/wordcloud.png'
import mbti_distrib from '../assets/img/mbti_distrib.png'
import density from '../assets/img/density.png'
import words_per_comment from '../assets/img/words_per_comment.png'
import vectorize1 from '../assets/img/vectorize1.png'
import vectorize2 from '../assets/img/vectorize2.png'
import vectorize3 from '../assets/img/vectorize3.png'
import mbtires from '../assets/img/mbtires.png'

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Friend Finder</Breadcrumb.Item>
            <Breadcrumb.Item active>MBTI Classification</Breadcrumb.Item>
          </Breadcrumb>
          <h4>MBTI Classification: Compute the likeliness between two human beings</h4>
        </div>
      </div>
      <div>
        The part1 focus on the classification of the personality according to the input comment text of each person. Because we cannot force people to spend half an hour to do the personality test, what we can do is to analysis what they put on social media and put them into different personality.
        First of all, we already have an original data set with people’s comments and their personality type. From this original data set, classification models can be obtained to calculate other people’s personality of whose comments can be obtained on social media like Twitter or Yelp.
        Let’s look at our data set in more detail. A pre-processing is needed to make our data more sensible. In other words, we only keep English characters and numbers, and then transform them into all lower cases. So, now we have input text that consists only of ‘a’ ~ ‘z’ and numbers from ‘0’ ~ ‘9’.
      </div>
      <div className='mt-4'>
        <h5>Word Cloud</h5>
        You must have a question about which words are more likely to occur in the comments of different MBTI types as this will tell more about that type of person’s personality. This is where word cloud come into use. It would be tedious to elaborate all 16 types’ word cloud but it would be interesting to show some of their difference:
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={wordcloud} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>MBTI Distribution</h5>
        Then, we can look insight into our processed data from many perspective, for example, the MBTI type composition in our data set, in other words, the ratio of each type counts in pie chart:
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={mbti_distrib} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Words per comment</h5>
        From each type we groupby, we can see the difference between how many words per comment they would like to use. For example, in this data set, from the right 3 columns on the figure, we can safely draw a conclusion that ESTJ people generally use more words per comment than ESFJ, and those of ESFJ are more than those of ESFP.
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={words_per_comment} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Density</h5>
        We can also gain some perception of the over all text with regard to the density of each word:
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={density} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Words embeddings</h5>
        Now let us do some real NLP machine learning. We know that for any feature engineering, the computer only takes input like vectors or matrices to do the further calculation. So what we have to do next is to vectorize our text. But how? There are so many words in each sentence, but the importance of each word is different, some words can make that sentence more different than others while some do not. One way of vectorizing text is tf-idf.
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Row><Col><Image src={vectorize1} /></Col></Row>
                <Row>
                  <Col><Image src={vectorize2} /></Col>
                  <Col><Image src={vectorize3} /></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <h5 className='mt-4'>Results</h5>
        Then we can input those vectors into our model. And we have split our data set into training and testing part with the ratio of 4:1.
        We have tried many models, and the highest one  is  linear SVC, which the accuracy on testing data is 0.67. Other traditional models achieve lower accuracy than linear SVC. We have also tried to use neural networks to solve the problem. The results vary with the network we chose.
        This is the highest accuracy we can get through traditional methods.
        For other methods like random forest, the accuracy we have got is only around 0.5 for 16 classes classification.
        Here is the results.
        <Row className="justify-content-md-center mt-2">
          <Col md={8}>
            <Card border="light" className="shadow-sm">
              <Card.Body>
                <Image src={mbtires} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  )
}
