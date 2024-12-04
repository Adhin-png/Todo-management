import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskDetail, taskUpdate } from '../apis/fetchapi';
import { toast } from 'react-toastify';

function Edit() {
  const [tsdetail, setTaskdetail] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await taskDetail(id);
        setTaskdetail(res.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          navigate('/home');
        } else {
          toast.error("Failed to load task details.");
        }
      }
    };
    fetchTaskDetails();
  }, [id, navigate]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await taskUpdate(id, tsdetail);
      toast.success("Task updated successfully!");
      navigate('/home');
    } catch (error) {
      console.error("Error updating task:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate('/home');
      } else {
        toast.error("Failed to update task.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h4 className="card-header bg-primary text-white text-center mb-4">Edit Task</h4>
        <div className="card-body">
          {/* Title */}
          <FloatingLabel controlId="floatingName" label="Title" className="mb-3">
            <Form.Control
              type="text"
              onChange={(e) => setTaskdetail({ ...tsdetail, title: e.target.value })}
              value={tsdetail.title}
              placeholder="Enter task title"
            />
          </FloatingLabel>

         
          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setTaskdetail({ ...tsdetail, description: e.target.value })}
              value={tsdetail.description}
              placeholder="Enter task description"
            />
          </FloatingLabel>

         
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={tsdetail.status}
              onChange={(e) => setTaskdetail({ ...tsdetail, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>

         
          <FloatingLabel controlId="floatingDueDate" label="Due Date" className="mb-3">
            <Form.Control
              type="date"
              onChange={(e) => setTaskdetail({ ...tsdetail, due_date: e.target.value })}
              value={tsdetail.due_date}
              placeholder="Enter due date"
            />
          </FloatingLabel>

         
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-success w-45" onClick={updateData}>
              Submit
            </button>
            <Link to="/" className="btn btn-danger w-45">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
