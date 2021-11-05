import { Tabs, Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumer } from '../../redux/actions/user/consumerActions';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { ConsumerProfileForm } from '../../components/Form/ConsumerProfileForm';

function ConsumerPage() {
    // retreive all the info about the consumer here (with the id)
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getUserProfile());
    // }, [dispatch, history]);

    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;

    //Get user Profile
    // const userProfile = useSelector(state => state.userProfile);
    // const { loading, user } = userProfile;

    // edit or preview mode
    // const [edit, setEdit] = useState(false);
    // const handleEdit = () => setEdit(true);
    // when save clicked, setEdit(false)

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
                            {/* TODO: when click edit button ConsumerProfileForm */}
                            {/* TODO: delete account button, delete account handler */}
                            {/* <div>
                                { edit == true ? 
                                    <container> edit mode </container> 
                                    : 
                                    <container> preview mode </container>
                                }
                            </div> */}
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
    );
}

export default ConsumerPage;