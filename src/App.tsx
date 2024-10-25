import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostForm from '../src/components/PostForm/PostForm.tsx';
import PostList from '../src/components/PostList/PostList';
import PostDetails from '../src/components/PostDetails/PostDetails';
import { Container } from '@mui/material';

const App: React.FC = () => (
  <Router>
    <Container>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new-post" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<PostForm />} />
      </Routes>
    </Container>
  </Router>
);

export default App;