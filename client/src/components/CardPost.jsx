import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CardPost = () => {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState({});
  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/post");
        setPosts(res.data);
      } catch (err) {
        setErrorMessage(err.response.data.msg || "Failed to fetch posts.");
      }
    };
    fetchData();
  }, []);

  const deletePost = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this post?")) {
        await axios.delete(`http://localhost:5000/api/post/${id}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
    } catch (err) {
      setErrorMessage(err.response.data.msg || "Failed to delete post.");
    }
  };

  const updatedPost = (post) => {
    setUpdatePost(post);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatePost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatePost = async () => {
    setErrorMsg("");

    try {
      await axios.put(
        `http://localhost:5000/api/post/${updatePost._id}`,
        updatePost
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatePost._id ? updatePost : post
        )
      );
      setShow(false);
    } catch (err) {
      setErrorMsg(err.response.data.msg || "Failed to update post.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Title"
                name="title"
                value={updatePost.title || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                value={updatePost.desc || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setErrorMsg("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          {posts.map((post) => (
            <Col xs={6} sm={4} className="g-4" key={post._id}>
              <Card className="card-container">
                <Card.Body>
                  <Card.Title style={{marginBottom: "1rem"}}>{post.title}</Card.Title>
                  <Card.Text className="text-truncate">{post.desc}</Card.Text>
                  <Link
                    to={`/post/${post._id}`}
                  >
                    Read more
                  </Link>

                  <Button
                    onClick={() => updatedPost(post)}
                    variant="outline-primary"
                    style={{ width: "100%",marginTop: "1rem", marginBottom: "1rem" }}
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                    style={{ width: "100%" }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Container>
    </>
  );
};

export default CardPost;
