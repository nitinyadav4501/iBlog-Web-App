import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useMyContext } from "../../context/MyContext";
import { doc, getDoc } from "firebase/firestore";
import { fireDb } from "../../firebase/firebase";
import Loader from "../../components/loader/Loader";

function BlogDetail() {
  const { id } = useParams();
  const { deleteBlog, getBlogData, setLoading, loading } = useMyContext();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const blogDoc = await getDoc(doc(fireDb, "blog", id));
      if (blogDoc.exists()) {
        setBlog(blogDoc.data());
      } else {
        console.log("Data not exits");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      navigate("/");
      getBlogData();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-300">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog data is unavailable.</div>;
  }

  return (
    <Layout>
      <div className="bg-gray-300 min-h-[85vh] py-8 px-5 md:px-1">
        <div className="flex justify-center gap-x-20 items-center flex-wrap gap-y-5">
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <img
              className="md:w-96 w-screen h-72"
              src={blog.imageUrl}
              alt={blog.title}
            />
          </div>
          <div className="md:max-w-[47%] space-y-5">
            <h1 className="bg-[#DADFDE] border border-gray-400 px-4 py-3 rounded-lg">
              <span className="font-bold">Title :</span>{" "}
              <span>{blog.title}</span>
            </h1>
            <h1 className="bg-[#DADFDE] border border-gray-400 px-4 py-3 rounded-lg">
              <span className="font-bold">Author :</span>{" "}
              <span>{blog.author}</span>
            </h1>
            <h1 className="bg-[#DADFDE] border border-gray-400 px-4 py-3 rounded-lg">
              <span className="font-bold">Category :</span>{" "}
              <span>{blog.category}</span>
            </h1>
            <h1 className="bg-[#DADFDE] border border-gray-400 px-4 py-3 rounded-lg">
              <span className="font-bold">Description :</span>{" "}
              <span>{blog.description}</span>
            </h1>
          </div>
        </div>
        <div className="md:px-20 px-5 my-20 flex justify-center flex-col items-center gap-y-6">
          <h1 className="text-2xl">
            <span className="font-bold text-gray-600">Read Blog : </span>
            <span className="text-[#627473]">{blog.title}</span>
          </h1>
          <p>{blog.blog}</p>
        </div>
        {user.user.uid === blog.uid ? (
          <button
            className="px-5 bg-red-700 py-2 rounded-lg md:mx-20 mx-5 text-white"
            onClick={handleDelete}
          >
            Delete blog
          </button>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export default BlogDetail;
