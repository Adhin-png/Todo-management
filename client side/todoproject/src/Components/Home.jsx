import React, { useState, useEffect } from 'react'; 
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { listTask } from '../apis/fetchapi';
import Detail from './Detail';


function Home() {
    const [tasks, setTask] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const header = {
            "Authorization": `Token ${sessionStorage.getItem("token")}`,
            "Content-Type": 'application/json'
        };

        listTask(header)
            .then((res) => {
                console.log(res.data);
                setTask(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredTasks = tasks.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query) ||
            task.status.toLowerCase().includes(query) ||
            task.due_date.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <Header />
            <Container>
                <Row className="mt-3">
                    <Col md={6} sm={12}>
                        <input
                            type="text"
                            className="form-control d-inline-block "
                            placeholder="Search by Title, Description, Status, or Due Date"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col md={6} sm={12}>
                        <Link to="/add" className='btn btn-success w-10'>Add Task</Link>
                    </Col>
                </Row>
                {/* <Col md={6} sm={12} className="text-end">
        <Link to="/calendar" className='btn btn-primary '>Calendar</Link>
    </Col> */}

                <Row>
                    <Col md={12} sm={12}>
                        <table className='mt-3 table table-bordered table-st bg-warning'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredTasks.length !== 0 ?
                                        filteredTasks.map((td) => (
                                            <tr key={td.id}>
                                                <td>{td.title}</td>
                                                <td>{td.description}</td>
                                                <td>{td.status}</td>
                                                <td>{td.due_date}</td>
                                                <td>
                                                    <Link to={`/detail/${td.id}`} className='btn btn-success mt-3'>View</Link>
                                                    <Link to={`/edit/${td.id}`} className='btn btn-secondary mt-3 ms-2'>Edit</Link>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="5" className="text-center">No Data</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default Home;
