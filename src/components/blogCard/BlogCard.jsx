import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blogData }) {
  const { blog, title, imageUrl } = blogData;

  return (
    <div className=" bg-[#DADFDE] flex flex-col justify-between w-72 drop-shadow-lg min-h-[23rem] border overflow-hidden rounded-xl border-[#627473]">
      <div>
        <img src={imageUrl} alt="" className="w-72 h-48 " />
      </div>
      <div className="flex flex-col justify-center gap-y-5 px-4 py-2">
        <div>
          <h1 className="text-xl font-bold">
            {title.length <= 30 ? title : title.slice(0, 30) + "..."}
          </h1>
          <p>{blog.length <= 55 ? blog : blog.slice(0, 55) + "..."}</p>
        </div>
      </div>
      <div className="flex gap-x-8 pb-2 px-4">
        <Link
          to={`/blog-detail/${blogData.id}`}
          className="text-blue-800"
        >
          Read more...
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
