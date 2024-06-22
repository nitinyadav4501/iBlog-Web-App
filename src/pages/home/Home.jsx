import React from "react";
import Layout from "../../components/layout/Layout";
import { BsPlusSquareDotted } from "react-icons/bs";
import { Link } from "react-router-dom";
import BlogCard from "../../components/blogCard/BlogCard";
import { useMyContext } from "../../context/MyContext";
import { CiLogin } from "react-icons/ci";
import Loader from "../../components/loader/Loader";

function Home() {
  const { blogsData, loading } = useMyContext();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Layout>
      <div className="bg-gray-300 min-h-[85vh] py-8">
        {user ? (
          <>
            <Link
              to={"/addBlog"}
              className="w-[90%] cursor-pointer mx-auto  h-52 border border-dashed rounded-lg bg-[#DADFDE] border-gray-500 flex items-center  justify-center "
            >
              <div className="flex justify-center items-center gap-x-2">
                <div className="text-2xl">
                  <BsPlusSquareDotted />
                </div>
                <div className="text-xl">
                  <h3>Add Your Blog </h3>
                </div>
              </div>
            </Link>
            <div className="w-[90%] mx-auto">
              <h1 className="text-3xl text-center font-bold text-[#627473] py-10">
                Blogs
              </h1>
              <div className="flex justify-center items-center flex-wrap gap-x-10 gap-y-10">
                {blogsData.length === 0 ? (
                  <div className="text-center font-medium text-2xl text-red-600 mt-10">
                    {loading ? <Loader /> : "There are no blogs available !"}
                  </div>
                ) : (
                  blogsData.map((blog) => {
                    return (
                      <div key={blog.id}>
                        <BlogCard blogData={blog} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[80vh] w-full">
            <div className="text-2xl font-bold text-[#627473] flex flex-col justify-center items-center gap-y-4">
              <p>
                Login First for use{" "}
                <span className="text-gray-900 text-3xl">iBlog</span>
              </p>
              <Link to={"/login"} className="text-xl font-bold">
                <button className="flex justify-center items-center border border-gray-600 text-gray-600 px-5 py-1 rounded-lg ">
                  <span>Login</span>
                  <span>
                    <CiLogin />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
