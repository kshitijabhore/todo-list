import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddListItems = () => {
  const [todoItem, setTodoItem] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoItem) {
      setError("Please add todo list item.");
      return;
    }
    const getItem = sessionStorage.getItem("id");
    let data = "";

    if (getItem) {
      if (getItem.includes(todoItem) === true) {
        setError("This list Item already present.");
        return;
      }
      data = getItem.concat(`,${todoItem}`);
    } else {
      data = todoItem;
    }
    sessionStorage.setItem("id", data);
    navigate("/");
  };

  return (
    <>
      <div className="heading">
        <h2>Please add todo list items</h2>
      </div>
      <div className="form-container">
        <Form className="form-style">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Add list item"
              required
              name="item"
              value={todoItem}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setTodoItem(e.target.value);
                  setError("");
                } else {
                  setError("Maximum length exceeded (15 characters)");
                }
              }}
            />
            <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="backButtonMargin"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add Item
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddListItems;
