import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskDetail, taskDelete } from '../apis/fetchapi';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

function Detail() {
  const [task, setTask] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const res = await taskDetail(id);
        setTask(res.data);
      } catch (error) {
        console.error('Error fetching task detail:', error);
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized! Please log in again.');
          navigate('/login');
        } else {
          toast.error('Failed to load task details.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await taskDelete(id);
      toast.success('Task deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting task:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized! Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to delete task.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="text-center mt-5">
        <h4>Task not found</h4>
        <Button variant="primary" onClick={() => navigate('/home')}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow" style={{ width: '24rem' }}>
        <Card.Header className="bg-primary text-white text-center">
          <h5>Task Details</h5>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Title:</strong> {task.title || 'N/A'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Description:</strong> {task.description || 'N/A'}
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/home')}>
            Back
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Detail;
