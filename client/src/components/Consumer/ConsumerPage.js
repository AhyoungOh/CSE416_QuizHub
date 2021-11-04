import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumer, updateConsumer } from '../../redux/actions/user/consumerActions';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

function ConsumerPage() {
    // retreive all the info about the consumer here (with the id)
    const Profile = ({ history }) => {
        // const dispatch = useDispatch();
        // useEffect(() => {
        //   dispatch(getUserProfile());
        // }, [dispatch, history]);

        // const userLogin = useSelector(state => state.userLogin);
        // const { userInfo } = userLogin;

        //Get user Profile
        // const userProfile = useSelector(state => state.userProfile);
        // const { loading, user } = userProfile;

        const { user, dispatch } = useContext(UserContext);

        
    }

    return(
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
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
                            {/* profile: default preview mode with edit button */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="quizzes">
                            {/* show quizzes taken */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="badges">
                            {/* show owned badges */}
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default ConsumerPage;