import { useEffect, useState } from "react";
import { createUser, getUserById, getUsers } from "../services/userService";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';


const User = () => {
    const [users, setUsers] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [username,setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    

    useEffect(() => {

        const userRequest = async () => {
            const res = await getUsers(); //getUsers async function at userService.js
            setUsers(res);
        }

        userRequest();

    }, []);

    const getUserDetails = async (id) => {
        const res = await getUserById(id);
        setUserDetail(res);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Validate 

        const data = {
            'username': username,
            'password': password,
            'email': email,
        }

        const res = await createUser(data);

        if(res) {
            setUsername("");
            setPassword("");
            setEmail("");
        }
    }

    return (
        <div>
            <Row>
                <Col lg={6}>
                    <ListGroup>
                        {users && users.map((user) => {
                            return (
                                <ListGroup.Item>
                                    <Row>
                                        <Col lg={6}>
                                            {user.username}
                                        </Col>
                                        <Col lg={6} className="text-end">
                                            <Button variant="primary" className="ms-auto" onClick={() => {
                                                getUserDetails(user.id)
                                            }}>Show</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                </Col>
                <Col lg={6}>
                    <div>
                        <h3>User Details</h3>
                        {userDetail &&
                            <div>
                                <div>Username: {userDetail.username}</div>
                                <div>Email: {userDetail.email}</div>
                            </div>
                        }
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={(event) => {
                                setUsername(event.target.value);
                            }} placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(event) => {
                                setPassword(event.target.value)
                            }} placeholder="Enter password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event) => {
                                setEmail(event.target.value)
                            }} placeholder="Enter email" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Save User</Button>
                    </Form>

                </Col>
            </Row>



        </div>
    )
}

export default User;