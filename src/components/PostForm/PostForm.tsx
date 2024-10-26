import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import axiosApi from "../../axiosApi";
import { Post } from "../../types";

const PostForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await axiosApi.get(`/posts/${id}.json`);
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData: Post = { title, content, date: new Date().toISOString() };

    try {
      if (id) {
        await axiosApi.put(`/posts/${id}.json`, postData);
      } else {
        await axiosApi.post("/posts.json", postData);
      }
      navigate("/");
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" style={{ marginBottom: 8 }}>
        {id ? "Редактировать пост" : "Добавить новый пост"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Заголовок"
          style={{ marginBottom: 8 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Содержимое"
          style={{ marginBottom: 8 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button type="submit" variant="contained">
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;
