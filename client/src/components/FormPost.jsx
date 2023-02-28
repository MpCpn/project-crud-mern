import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Alert } from "react-bootstrap";

const FormPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    desc: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlerts, setShowAlerts] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.desc) {
      setErrorMessage("Title and description are required.");
      setShowAlerts(true);
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:5000/api/post", post);
      setSuccessMessage("Post created successfully!");
      setShowAlerts(true);
      setPost({ title: "", desc: "" });
    } catch (error) {
      setErrorMessage(error.response.data.msg || "Something Went Wrong");
      setShowAlerts(true);
    }
  };

  return (
    <Container>
      <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
        <h1>Create Post</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="title"
              value={post.title}
              placeholder="Title"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <Form.Control
              as="textarea"
              rows={3}
              name="desc"
              value={post.desc}
              placeholder="Description"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="outline-success"
            style={{ width: "100%", marginBottom: "1rem" }}
            type="submit"
          >
            Create Post
          </Button>
        </Form>
        <Button
          variant="outline-dark"
          style={{ width: "100%" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <br />
        <br />
        {showAlerts && errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {showAlerts && successMessage && <Alert variant="success">{successMessage}</Alert>}
      </div>
    </Container>
  );
};

export default FormPost;
