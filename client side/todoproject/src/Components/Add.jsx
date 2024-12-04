import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { addTask } from '../apis/fetchapi';
import { toast } from 'react-toastify';

function Add() {
  const [addTasks, setAddTasks] = useState({
    title: "",
    description: "",
    status: "Pending", 
    due_date: ""
  });
  const navigate = useNavigate();

  const submitData = () => {
    const header = {
      "Authorization": `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": 'application/json'
    };

    const { title, description, status, due_date } = addTasks;

    if (!title ||!description|| !status|| !due_date) { 
      toast.warning("Title and Due Date are required!");
      return;
    }

    addTask(addTasks, header)
      .then((res) => {
        console.log(res.data);
        toast.success("Task added successfully!");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        toast.error("Failed to add task");
      });
  };

  return (
    <div className='container p-5 d-flex flex-column align-item-center'>
      <div className='w-50 p-5 border shadow'>
        <h4 className='text-center'>Add Task</h4>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter title" 
            onChange={(e) => setAddTasks({ ...addTasks, title: e.target.value })} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea"
            rows={3}
            placeholder="Enter description (optional)" 
            onChange={(e) => setAddTasks({ ...addTasks, description: e.target.value })} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={addTasks.status}
            onChange={(e) => setAddTasks({ ...addTasks, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
            type="date" 
            onChange={(e) => setAddTasks({ ...addTasks, due_date: e.target.value })} 
          />
        </Form.Group>

        <div className='d-flex justify-content-around'>
          <button className='btn btn-success' onClick={submitData}>Submit</button>
          <Link to={"/home"} className='btn btn-danger'>Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default Add;
