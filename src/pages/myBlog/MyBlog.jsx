import React from "react";
import Layout from "../../components/layout/Layout";
import { useMyContext } from "../../context/MyContext";
import BlogCard from "../../components/blogCard/BlogCard";
import Loader from "../../components/loader/Loader";

function MyBlog() {
  const correntUser = JSON.parse(localStorage.getItem("user"));
  const { blogsData, loading } = useMyContext();
  const filterdata = blogsData.filter((doc) => {
    return doc.uid === correntUser.user.uid;
  });

  return (
    <Layout>
      <div className="min-h-[85vh] bg-gray-300 flex justify-center gap-x-10 flex-wrap py-10 gap-y-10">
        {filterdata.length === 0 ? (
          <div className="text-center font-medium text-2xl text-red-600 mt-10">
            {loading ? <Loader /> : "You have never added any blogs"}
          </div>
        ) : (
          filterdata.map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCard blogData={blog} />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default MyBlog;
