import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../services/itemService";
import { Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import { getUsers } from "../services/userService";
import { createOrder } from "../services/orderService";

const Home = () => {

    const [items, setItems] = useState(null);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(null);
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await getItems();
            setItems(response);
        }

        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response);
        }

        fetchItems();
        fetchUsers();
    }, []);

    const handleOrder = ((item) => {
        const updatedOrder = [...order, item]

        const updatedTotal = total + item.price;

        setOrder(updatedOrder);
        setTotal(updatedTotal);

    });

    const handleUser = ((event) => {
        setSelectedUser(event.target.value);
    });

    const handleStatus = ((event) => {
        setStatus(event.target.value);
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            id: 5,
            status: status,
            user: {
                id: selectedUser,
            },
            items: order
        }

        const response = await createOrder(data);
        if(response) {
            handleClose();
            setOrder([]);
        }
    };

    return (
        <div>
            <h1>Items</h1>
            <Row>
                {items && items.map(item => {
                    return (
                        <Col key={item.id}>
                            <div className="item">
                                <h3>{item.name}</h3>
                                <h4>Rs. {item.price}</h4>
                                <Button variant="primary" size="sm" onClick={() => {
                                    handleOrder(item)
                                }}>Add to Order</Button>
                            </div>
                        </Col>

                    )
                })}
            </Row>

            <h1 className="mt-4">Current Order</h1>

            <Table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item</th>
                        <th>Item Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order && order.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className="text-end">{item.price}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <th colSpan={2}>Total</th>
                        <th className="text-end">{total}</th>
                    </tr>
                </tbody>
            </Table>

            <div className="text-end">
                <Button variant="primary" onClick={handleShow}>Complete Order</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Complete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please select the user who is creating this order, set the order status and click on Complete.</p>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Select User</Form.Label>
                            <Form.Select onChange={handleUser}>
                                <option value="">Please select a user</option>
                                {users && users.map(user => {
                                    return (
                                        <option value={user.id} selected={user.id === selectedUser ? 'true' : 'false'}>{user.username}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Order Status</Form.Label>
                            <Form.Select onChange={handleStatus}>
                                <option value="">Please Select Status</option>
                                <option value="Pending" selected={status == "Pending" ? 'true' : 'false'}>Pending</option>
                                <option value="Confirmed" selected={status == "Confirmed" ? 'true' : 'false'}>Confirmed</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">Save Order</Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </div>
    )
}

export default Home;