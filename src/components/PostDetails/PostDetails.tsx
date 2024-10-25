import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import axiosApi from '../../axiosApi';
import { Post } from '../../types';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosApi.get(`/posts/${id}.json`);
        setPost(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      navigate('/');
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  if (!post) return <div>Загрузка...</div>;

  return (
    <Container>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="subtitle1">
        {post.date ? new Date(post.date).toLocaleString() : 'Дата не указана'}
      </Typography>
      <Typography variant="body1">{post.content}</Typography>
      <Button variant="contained" color="secondary" onClick={handleDelete}>Удалить</Button>
      <Button variant="outlined" onClick={() => navigate(`/posts/${id}/edit`)}>Редактировать</Button>
    </Container>
  );
};

export default PostDetails;