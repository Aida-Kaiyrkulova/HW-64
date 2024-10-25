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
        const fetchedPosts: Post[] = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Список постов</Typography>
      <Link to="/new-post">
        <Button variant="contained" color="primary">Добавить пост</Button>
      </Link>
      {posts.map(post => (
        <Card key={post.id} style={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Link to={`/posts/${post.id}`}>
              <Button variant="outlined">Read More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PostList;
