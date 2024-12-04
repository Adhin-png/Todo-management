import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { listTask } from '../apis/fetchapi';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css'; 

function CalendarPage() {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const header = {
            Authorization: `Token ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        };

        listTask(header)
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const selectedDateString = selectedDate.toISOString().split('T')[0];
        const filtered = tasks.filter((task) => task.due_date === selectedDateString);
        setFilteredTasks(filtered);
    }, [selectedDate, tasks]);

    return (
        <div className="calendar-page"> 
            <Container className="mt-5">
                <Row>
                  
                    <Col md={6} className="calendar-container">
                        <div className="text-center">
                            <h3 className="mb-4">Select a Date</h3>
                            <Calendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                className="custom-calendar"
                            />
                        </div>
                    </Col>

                   
                    <Col md={6} className="tasks-container">
                        <h3 className="mb-4 text-center">Tasks for {selectedDate.toDateString()}</h3>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <Card key={task.id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Description:</strong> {task.description}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Status:</strong> {task.status}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Due Date:</strong> {task.due_date}
                                        </Card.Text>
                                        <div className="d-flex justify-content-end">
                                            <Link to={`/detail/${task.id}`} className="btn btn-info me-2">
                                                View
                                            </Link>
                                            <Link to={`/edit/${task.id}`} className="btn btn-secondary">
                                                Edit
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center">
                                <p>No tasks for this date.</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CalendarPage;
