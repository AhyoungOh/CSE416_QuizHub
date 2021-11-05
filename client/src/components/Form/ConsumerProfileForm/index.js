// import { updateConsumer } from '../../../redux/actions/ConsumerActions';
import axios from 'axios';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { useContext , useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import useApiCall from '../../../hooks/useApiCall';

function ConsumerProfileForm() {
    const history = useHistory();
    const { user, dispatch } = useContext(UserContext);
    const username = user.id;
    // const password = user.password;
    // console.log("passwaord", password);
    const [loading, testData, error, fetchData] = useApiCall(
        // TODO: check the api url
        `${process.env.REACT_APP_API_SERVER}/api/consumer`
    );
    
    if (!testData) {
        return <></>;
    }
    
    if (loading) {
        return <>loading...</>;
    }
    
    if (error) {
        return <>error : {error}</>;
    }
    
    console.log(testData);
    console.log(testData.createConsumer);
    var userInfo = {};
    for (const x of testData.createConsumer){
        if (x.consumerUsername == username){
            userInfo = x;
            break;
        }
    }
    console.log(username);
    console.log(userInfo);
    console.log(userInfo.consumerDescription);

    // // edit or preview mode
    // const [edit, setEdit] = useState(false);
    // const handleEdit = () => setEdit(true);
    // // when save clicked, setEdit(false)

    // const [name, setname] = useState(userInfo ? userInfo.name : '');
    // const [email, setEmail] = useState(userInfo ? userInfo.consumerEmail : '');
    // const [password, setPassword] = useState(userInfo ? userInfo.consumerPassword : '');
    // const [description, setDescription] = useState(userInfo ? userInfo.consumerDescription : '');
    // const [isPrivate, setIsPrivate] = useState(userInfo ? userInfo.consumerIsPrivate : '');

    return (
        // TODO: changing to using only the form
        <div>
            {/* { edit == true ?  */}
                <Container>
                    <Form>
                        <Row></Row>
                        <Form.Group as={Row} className="mb-3" controlId="consumerEmail">
                            <Form.Label column sm="3">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    defaultValue={userInfo.consumerEmail}
                                    // onChange={e => setEmail(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="consumerPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter password"
                                    defaultValue={userInfo.consumerPassword}
                                    // onChange={e => setPassword(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="consumerPassword">
                            <Form.Label column sm="3">
                                Private
                            </Form.Label>
                            <Col sm="9">
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="private account"
                                    // onChange={e => setIsPrivate(!isPrivate)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="consumerDescription">
                            <Form.Label column sm="3">
                                Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter description"
                                    defaultValue={userInfo.consumerDescription}
                                    // onChange={e => setDescription(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Container> 
                {/* : 
                <container> preview mode </container>
            } */}
        </div>
    //     //     { isEdit==true ? 
    //     //         <Button variant="primary" onClick={() => setEdit(false)}>Save</Button>  // may need to change this to a func which calls this func
    //     //         :
    //     //         <Button variant="primary" onClick={() => setEdit(true)}>Edit</Button>
    //     // }

    //     // <Button variant="link" onClick={handleShow}>Delete Account</Button>
    //     // <Modal
    //     //     show={show}
    //     //     onHide={handleClose}
    //     //     backdrop="static"
    //     //     keyboard={false}>
    //     //     <Modal.Header closeButton>
    //     //         <Modal.Title>Delete Account</Modal.Title>
    //     //     </Modal.Header>
    //     //     <Modal.Body>
    //     //         Are you sure you would like to delete your account. You will loose all your data.
    //     //     </Modal.Body>
    //     //     <Modal.Footer>
    //     //         <Col></Col>
    //     //         <Col>
    //     //             <Button variant="secondary" onClick={handleClose}>
    //     //                 Close
    //     //             </Button>
    //     //         </Col>
    //     //         <Col>
    //     //             <Button variant="danger" onClick={deleteBtnHandler}>Delete</Button>
    //     //         </Col>
    //     //     </Modal.Footer>
    //     // </Modal>
    );
}

export default ConsumerProfileForm;