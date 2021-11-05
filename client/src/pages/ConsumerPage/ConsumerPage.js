import { Tabs, Tab, Row, Col, Nav, Button, Image, Container } from 'react-bootstrap';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumer } from '../../redux/actions/user/consumerActions';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import ConsumerProfileForm from '../../components/Form/ConsumerProfileForm';

function ConsumerPage() {
    const { user, dispatch } = useContext(UserContext);
    const username = user.id;

    return(
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row>
                    <Col sm={3}>
                    </Col>
                    <Col sm={9}>
                        <Row>
                            <Col sm={4}>
                            </Col>
                            <Col sm={4}>
                                {/* TODO: align the text and image together */}
                                <Image width={180} height={180} src="/img_avatar.png" roundedCircle />
                                <p className="text-center">
                                    {username}
                                </p>  
                            </Col>
                            <Col sm={4}>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Edit profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="quizzes">My quizzes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="badges">My badges</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                {/* TODO: when click edit button ConsumerProfileForm */}
                                {/* TODO: delete account button, delete account handler */}
                                {/* <div>
                                    { edit == true ? 
                                        <container> edit mode </container> 
                                        : 
                                        <container> preview mode </container>
                                    }
                                </div> */}
                                <ConsumerProfileForm />
                            </Tab.Pane>
                            <Tab.Pane eventKey="quizzes">
                                {/* show quizzes taken */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="badges">
                                {/* TODO: quiz cards given the quizHistory array */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
             </Tab.Container>
        </Container>
    );
}

export default ConsumerPage;