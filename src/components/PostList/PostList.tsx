import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Card, CardContent } from '@mui/material';
import axiosApi from '../../axiosApi';
import { Post } from '../../types';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosApi.get('/posts.json');
        const postsData: Post[] = Object.entries(response.data).map(([id, post]) => ({
          id,
          title: post.title || 'Без заголовка',
          content: post.content || 'Нет содержимого',
          date: post.date || '',
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return <div>Загрузка...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Список постов</Typography>
      {posts.map(post => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="subtitle1">
              {post.date ? new Date(post.date).toLocaleString() : 'Дата не указана'}
            </Typography>
            <Typography variant="body2">{post.content.substring(0, 100)}...</Typography>
            <Button size="small" component={Link} to={`/posts/${post.id}`}>Read More</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PostList;
