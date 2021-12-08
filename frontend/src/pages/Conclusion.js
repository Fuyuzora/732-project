import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card, Breadcrumb } from '@themesberg/react-bootstrap'
import AccordionComponent from "../components/AccordionComponent"

export default () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Friend Finder</Breadcrumb.Item>
                        <Breadcrumb.Item active>Q&A</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Q&A</h4>
                </div>
            </div>
            <div>
                We are more than happy to answer any questions you may have, but unfortunately that is not possible for this presentation. Here are some questions that we believe you might be interested in, and we will be asking these questions for you.
                <AccordionComponent className='mt-4'
                    defaultKey="panel-1"
                    data={[
                        {
                            id: 1,
                            eventKey: "panel-1",
                            title: "What are the big data tools used in this project?",
                            description:
                                `
                            Big data tools we used have 2 major categories: data storage tools and data processing tools. 
                            Our data is usually stored on AWS S3 bucket, which is a relatively budget option and can be configured to be publically accessible. 
                            Data processing tools are mostly Spark on EC2 instances and Pandas if running on local. Spark is useful
                            when applying simple preprocessing to huge amount of data, combined with the superior computational power of EC2 instances we can comfortably process
                            large amount of data that is not possible with our own laptops. Pandas comes in handy when doing complex data processing
                            on a smaller scale for specific downstream tasks. All these tools greatly alleviate big data problems.
                            `
                        },
                        {
                            id: 2,
                            eventKey: "panel-2",
                            title: "How are we going to handle larger than expected amount of data",
                            description:
                                `
                                As we have more user data, the old result of k-means may not suit the new dataset. Hence, we need to update k-mean model constantly with the new data. 
                                It is not economical and necessary to update k-means model in real time. Hence, we could build a data lake to store the new data as a buffer. The new data will first be stored into the data lake, and we will update our model per week.
                                Also, if data keeps growing, and we can’t handle it locally, we could migrate our data and code to the cloud, and train the model on the cloud. When training is finished, we download the model from the cloud and use it locally. 
    
                            `
                        },
                        {
                            id: 3,
                            eventKey: "panel-3",
                            title: "What are some real life applications of this project",
                            description:
                                `
                            Help us to prevent solitude and find possible friends.
                            People sometimes do not reach out to make new friends because they are so afraid of being hurt or other people who are so different from them may not understand them in many aspects. 
                            But what if they can reach out to the one nearby who is similar to them or can be a good match? The combination of social science (psychology) and data science will make our social life easier than it was and avoid some mental issues result from solitude. 
                            Plus, we can also benefit from pairing system on romantic issues.
                            `
                        }
                    ]} />
            </div>
        </>
    )
}
