import './style.scss';
import axios from 'axios';
import {Form,Row,Col,Container,Image,Button,Modal} from 'react-bootstrap'
import { useContext , useState, useRef} from 'react';
import { UserContext, accountSettingsContext} from '../../App';
import { useHistory } from 'react-router-dom';


function CreatorAccountSettings() {
    const { user, dispatch } = useContext(UserContext);
    const id = user?.username !== '' ? user.username : '';
    const history = useHistory();
    const [isEdit, setEdit] = useState(false);

    const emailRef=useRef('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    // need to think about how to get existing creator data using id (refer slide 27)
    // need to think about how to store the updated information
    // need to think about delete account
    // also need to do edit image.
    
    const clickBtnHandler = async (req, res) => {
        try {
          const userInfo = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/creator/${user.id}`,
          );
          dispatch({ type: 'creatoraccountsettings', payload: userInfo.data });
          //setErrorMsg(null);
        } catch (e) {
          //setErrorMsg(JSON.stringify(e));
          console.error(e);
        }
        
    };

    // const updateCreatorInfo=0;
    

    const deleteBtnHandler = async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/creator/${user?.id}`);
          history.push('/');
        } catch (e) {
          console.error(e);
        }
      };
    
       
    return(
        <Container>
        <Row className="justify-content-md-center">
        <Col xs={2} md={2}>
        <Image width={200} height={200} src="/img_avatar.png" roundedCircle />
        </Col>
        </Row>
        <Col md="auto"className='text-center'>{id}</Col>
        <Form >
        <Row>
        <Col></Col>
        <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2" className="text-start">
        Email
        </Form.Label>
            <Col md="5" className="text-start">
            { isEdit==true ? 
                <Form.Control text defaultValue={emailRef} className="text-start" />
                :
                <Form.Control plaintext readOnly 
                defaultValue={emailRef} className="text-start" />
            }
            </Col>
        </Form.Group>
        <Col></Col>
        </Row>
        <Row>
        <Col></Col>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2" className="text-start">
        Description
        </Form.Label>
            <Col md="5">
            { isEdit==true ? 
                <Form.Control text defaultValue="The description for yourself" className="text-start" />
                :
                <Form.Control plaintext readOnly defaultValue="The description for yourself" className="text-start" />
            }
            </Col>
        </Form.Group>
        <Col></Col>
        </Row>
        </Form>
        <Row>
        <Col></Col>
        <Col>
        { isEdit==true ? 
                <Button variant="primary" onClick={() => setEdit(false)}>Save</Button>  // may need to change this to a func which calls this func
                :
                <Button variant="primary" onClick={() => setEdit(true)}>Edit</Button>
        }
        </Col>
        <Col>
        <Button variant="link" onClick={handleShow}>Delete Account</Button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to delete your account. You will loose all your data.
        </Modal.Body>
        <Modal.Footer>
          <Col></Col>
          <Col>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </Col>
          <Col>
          <Button variant="danger" onClick={deleteBtnHandler}>Delete</Button>
          </Col>
        </Modal.Footer>
        </Modal>
        </Col>
        <Col></Col>
        </Row>
        </Container>
    );
}

export default CreatorAccountSettings;