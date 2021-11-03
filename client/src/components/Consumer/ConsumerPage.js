import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import { useContext } from 'react';


function ConsumerPage() {
    // retreive all the info about the consumer here (with the id)

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
                            <Sonnet />
                        </Tab.Pane>
                        <Tab.Pane eventKey="quizzes">
                            <Sonnet />
                        </Tab.Pane>
                        <Tab.Pane eventKey="badges">
                            <Sonnet />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default ConsumerPage;