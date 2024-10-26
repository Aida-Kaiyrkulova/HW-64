import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axiosApi from "../../axiosApi";
import { Post } from "../../types";

interface FirebasePost {
  title: string;
  content: string;
  date?: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosApi.get("/posts.json");
        const data = response.data as Record<string, FirebasePost>;

        if (data) {
          let postsData: {
            date: string;
            id: string;
            title: string;
            content: string;
          }[] = [];
          postsData = Object.entries(data).map(([id, post]) => ({
            id,
            title: post.title || "Без заголовка",
            content: post.content || "",
            date: post.date || "",
          }));
          setPosts(postsData);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Ошибка", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container style={{ marginTop: 20 }}>
      {posts.length === 0 ? (
        <Typography variant="h6">Посты отсутствуют.</Typography>
      ) : (
        posts.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">
                {post.date
                  ? new Date(post.date).toLocaleString()
                  : "Дата не указана"}
              </Typography>
              <Typography variant="h5">{post.title}</Typography>
              <Button
                size="small"
                component={Link}
                to={`/posts/${post.id}`}
                style={{ marginRight: 8 }}
              >
                Больше
              </Button>
              <Button
                size="small"
                component={Link}
                to={`/posts/${post.id}/edit`}
                color="secondary"
              >
                Редактировать
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default PostList;
