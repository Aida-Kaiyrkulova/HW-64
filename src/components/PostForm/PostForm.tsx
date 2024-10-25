import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import axiosApi from '../../axiosApi';
import { Post } from '../../types';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axiosApi.get(`/posts/${id}.json`);
          const postData: Post = response.data;
          setTitle(postData.title);
          setContent(postData.content);
        } catch (error) {
          console.error("Ошибка при загрузке поста:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData: Post = { title, content, date: new Date().toISOString() }; // Добавляем дату

    try {
      if (id) {
        await axiosApi.put(`/posts/${id}.json`, postData);
      } else {
        await axiosApi.post('/posts.json', postData);
      }
      navigate('/');
    } catch (error) {
      console.error("Ошибка при сохранении поста:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">{id ? 'Редактировать пост' : 'Добавить новый пост'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Содержимое"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">{id ? 'Сохранить' : 'Добавить'}</Button>
      </form>
    </Container>
  );
};

export default PostForm;