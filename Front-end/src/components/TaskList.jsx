import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const TaskList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", status: "Pending" });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      url: apiUrl + "/tasks",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => {
        if (result.data.success) setTasks(result.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const gotoAddTask = () => navigate("/add/task");

  const saveEdit = (id) => {
    axios({
      url: apiUrl + `/tasks/${id}`,
      method: "put",
      headers: { Authorization: `Bearer ${token}` },
      data: editData,
    })
      .then((res) => {
        if (res.data.success) {
          setTasks(tasks.map((task) => (task._id === id ? { ...task, ...editData } : task)));
          setEditId(null);
        }
      })
      .catch(() => alert("Update failed"));
  };

  const gotoDelete = (id) => {
    axios({
      url: apiUrl + `/tasks/` + id,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => {
        if (result.data.success) setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => alert(err));
  };

  const confirmMarkAllCompleted = () => {
    axios({
      url: apiUrl + "/tasks/mark-all-completed",
      method: "put",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.success) {
          setTasks(tasks.map((task) => ({ ...task, status: "Completed" })));
          setShowModal(false);
        }
      })
      .catch(() => alert("Failed to mark tasks as completed"));
  };

  return (
    <>
      <NavBar />

      <div className="d-flex justify-content-end gap-2 mt-3 me-4">
        <Button variant="success" onClick={gotoAddTask}>
          Add New Task
        </Button>

        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Mark All As Completed
        </Button>
      </div>

      <table className="table table-striped table-hover mt-4 shadow-sm" style={{ width: "95%", margin: "0 auto" }}>
        <thead className="table-dark">
          <tr>
            <th colSpan="4" className="text-center py-3 bg-white">
              <h4 className="mb-0 fw-bold text-primary">Your Tasks</h4>
            </th>
          </tr>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="4" className="text-center py-3" style={{ backgroundColor: "transparent" }}>
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          )}

          {!loading && tasks.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-3" style={{ backgroundColor: "transparent" }}>
                No tasks found
              </td>
            </tr>
          )}

          {tasks.map((task) => (
            <tr key={task._id} className={task.status === "Pending" ? "fw-bold" : ""}>
              <td>
                {editId === task._id ? (
                  <input
                    className="form-control"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                ) : (
                  task.title
                )}
              </td>

              <td>
                {editId === task._id ? (
                  <input
                    className="form-control"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                ) : (
                  task.description
                )}
              </td>

              <td>
                {editId === task._id ? (
                  <select
                    className="form-select"
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span className={task.status === "Pending" ? "text-warning" : "text-success"}>{task.status}</span>
                )}
              </td>

              <td>
                {editId === task._id ? (
                  <>
                    <Button size="sm" variant="success" className="me-2" onClick={() => saveEdit(task._id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => {
                        setEditId(task._id);
                        setEditData({
                          title: task.title,
                          description: task.description,
                          status: task.status,
                        });
                      }}
                    >
                      Edit
                    </Button>

                    <Button size="sm" variant="danger" onClick={() => gotoDelete(task._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to mark all tasks as completed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmMarkAllCompleted}>
            Yes, Mark All Completed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskList;
