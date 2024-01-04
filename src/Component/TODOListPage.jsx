import { useEffect, useState } from "react";
import "./style.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const TODOListPage = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("id");
    if (!data) {
      setMessage("There is no todo list. Please add new.");
    } else {
      const updatedData = data.split(",");
      setItems(updatedData);
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setShow(true);
    setSelectedItemIndex(index);
  };

  const handleDelete = () => {
    if (selectedItemIndex !== null) {
      const updatedList = items.filter(
        (item, index) => index !== selectedItemIndex
      );
      setItems(updatedList);
      sessionStorage.setItem("id", updatedList);
      if (selectedItemIndex === 0) {
        setMessage("There is no todo list. Please add new.");
      }
    }

    handleClose();
  };

  return (
    <>
      <div className="todoList">
        <h2 className="heading">Welcome To TODO List</h2>
        <button
          className="addButton"
          onClick={() => {
            navigate("/addListItems");
          }}
        >
          Add List Items
        </button>
        {items.length > 0 ? (
          <Table striped bordered hover className="table-style">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>List</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td key={index}>{data}</td>
                  <td>
                    <span
                      class="material-symbols-outlined deleteAction"
                      onClick={() => handleShow(index)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          message && <p style={{ color: "red" }}>{message}</p>
        )}
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header />
          <Modal.Body>Do you want to delete this item?</Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TODOListPage;
