import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/resistation/Login";
import Signup from "./pages/resistation/Signup";
import About from "./pages/about/About";
import Nopage from "./pages/nopage/Nopage";
import { ContextProvider } from "./context/MyContext";
import AddBlog from "./pages/addBlog/AddBlog";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import MyBlog from "./pages/myBlog/MyBlog";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/my-blogs" element={<MyBlog />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
