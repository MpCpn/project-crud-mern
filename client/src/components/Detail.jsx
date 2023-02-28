import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:5000/api/post/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  return (
    <Container>
         <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
        <h1 style={{marginBottom: "1rem"}}>Detail Post</h1>
      <Card>
        <Card.Header>{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>{post.desc}</Card.Text>
        </Card.Body>
      </Card>
      </div>
    </Container>
  );
};

export default Detail;
