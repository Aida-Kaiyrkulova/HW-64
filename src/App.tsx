import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostForm from "../src/components/PostForm/PostForm.tsx";
import PostList from "../src/components/PostList/PostList";
import PostDetails from "../src/components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar.tsx";
import About from "./components/About/About.tsx";
import Contacts from "./components/Contacts/Contacts.tsx";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/add" element={<PostForm />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/posts/:id/edit" element={<PostForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  </Router>
);

export default App;
