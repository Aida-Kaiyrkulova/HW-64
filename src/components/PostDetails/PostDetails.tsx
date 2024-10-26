import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axiosApi from "../../axiosApi";
import { Post } from "../../types";

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosApi.get(`/posts/${id}.json`);
        setPost({
          id,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date,
        });
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  if (!post) return <div>Загрузка...</div>;

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="subtitle1">
        {post.date ? new Date(post.date).toLocaleString() : "Дата не указана"}
      </Typography>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        {post.title}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 10 }}>
        {post.content}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Удалить
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={`/posts/${id}/edit`}
        style={{ marginLeft: 8 }}
      >
        Редактировать
      </Button>
    </Container>
  );
};

export default PostDetails;
