import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from '../Navbar.jsx'
import Footer from '../Footer.jsx'

const apiUrl = import.meta.env.VITE_API_URL;

export default function AddTask() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title / Description cannot be blank..");
      return;
    }

    axios({
      url: apiUrl + "/tasks",
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      data: { title, description, status },
    })
      .then((res) => {
        if (res.data.success) {
          navigate("/tasks");
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <NavBar />

      {/* ADD TASK SCREEN */}
      <div
        className="w-100 min-vh-100 d-flex justify-content-center align-items-center bg-light"
        style={{ position: "relative", paddingBottom: "60px" }} // add some bottom padding
      >
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT */}
            <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0 p-4">
              <span className="badge bg-info mb-3 px-3 py-2 text-dark">
                Add new tasks quickly and efficiently!
              </span>
              <h1 className="text-primary display-4 fw-bold mb-3">
                Create & Organize <br />
                <span className="text-dark">Your Tasks</span>
              </h1>
              <p className="text-muted fs-5 mb-4">
                Fill out the details here to add a new task to your list and stay on top of your work.
              </p>
            </div>


            {/* RIGHT ADD TASK CARD */}
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  width: "350px",
                  maxWidth: "90%",
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                }}
              >
                <h3 className="text-center mb-3 fw-bold">
                  Add New <span className="text-primary">Task</span>
                </h3>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter task title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter task description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success" className="w-50">
                      Add Task
                    </Button>
                    <Button variant="danger" className="w-50" onClick={() => navigate("/tasks")}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}
