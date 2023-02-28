import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
