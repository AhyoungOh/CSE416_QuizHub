import './style.scss';
import axios from 'axios';
import {
  Form,
  Row,
  Col,
  Container,
  Image,
  Button,
  Modal,
} from 'react-bootstrap';
import { useContext, useState, useRef } from 'react';
import { UserContext, accountSettingsContext } from '../../../App';
import { useHistory } from 'react-router-dom';

function CreatorAccountSettings() {
  const { user, dispatch } = useContext(UserContext);
  const id = user?.username !== '' ? user.username : '';
  const history = useHistory();
  const [isEdit, setEdit] = useState(false);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [introduction, setIntroduction] = useState('Enter your description');
  const [image, setImage] = useState('/img_avatar.png');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // need to think about how to store the updated information
  // also need to do edit image.

  const clickBtnHandler = async () => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/creator/${user?.id}`
            : `http://localhost:4000/api/creator/${user?.id}`
        )
        .then((response) => {
          //console.log(response);
          setEmail(response.data.createCreator.creatorEmail);
          setIntroduction(response.data.createCreator.creatorSelfIntroduction);
          //setImage(response.data.createCreator.creatorImage);
        });
    } catch (e) {
      console.error(e);
    }
  };
  clickBtnHandler();

  const saveBtnHandler = async () => {
    try {
      await axios.put(
        process.env.NODE_ENV == 'production'
          ? `/api/creator/${user?.id}`
          : `http://localhost:4000/api/creator/${user?.id}`,
        {
          creatorEmail: email,
          creatorImage: image,
          selfIntroduction: introduction,
        }
      );
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBtnHandler = async () => {
    try {
      await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `/api/creator/${user?.id}`
          : `http://localhost:4000/api/creator/${user?.id}`
      );
      try {
        await axios.delete(
          process.env.NODE_ENV == 'production'
            ? `/api/auth`
            : `http://localhost:4000/api/auth`
        );
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: 'signout' });
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmailChange = (e) => {
    //console.log(e.target.value)
    setEmail(e.target.value);
  };

  const handleIntroChange = (e) => {
    //console.log(e.target.value)
    setIntroduction(e.target.value);
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={2} md={2}>
          <Image width={200} height={200} src={image} roundedCircle />
        </Col>
      </Row>
      <Row></Row>
      <Col md='auto' className='text-center'>
        <h1 className='text'>{id}</h1>
      </Col>

      <div className='justify-content-center text-center'>
        <Form>
          <Row>
            <Col></Col>
            <Form.Group as={Row} controlId='formPlaintextEmail'>
              <Form.Label column sm='2' className='text-start'>
                Email
              </Form.Label>
              <Col md='5' className='text-start'>
                {isEdit == true ? (
                  <Form.Control
                    text
                    defaultValue={email}
                    onChange={(e) => handleEmailChange(e)}
                    className='text-start'
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={email}
                    className='text-start'
                  />
                )}
              </Col>
            </Form.Group>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formPlaintextEmail'
            >
              <Form.Label column sm='2' className='text-start'>
                Description
              </Form.Label>
              <Col md='5'>
                {isEdit == true ? (
                  <Form.Control
                    text
                    defaultValue={introduction}
                    onChange={(e) => handleIntroChange(e)}
                    className='text-start'
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={introduction}
                    className='text-start'
                  />
                )}
              </Col>
            </Form.Group>
            <Col></Col>
          </Row>
        </Form>
      </div>

      <Row>
        <Col></Col>
        <Col>
          {isEdit == true ? (
            <Button variant='primary' onClick={saveBtnHandler}>
              Save
            </Button>
          ) : (
            <Button variant='primary' onClick={() => setEdit(true)}>
              Edit
            </Button>
          )}
        </Col>
        <Col>
          <Button variant='link' onClick={handleShow}>
            Delete Account
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you would like to delete your account. You will loose
              all your data.
            </Modal.Body>
            <Modal.Footer>
              <Col></Col>
              <Col>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Col>
              <Col>
                <Button variant='danger' onClick={deleteBtnHandler}>
                  Delete
                </Button>
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
