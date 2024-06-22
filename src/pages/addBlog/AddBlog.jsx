import React from "react";
import { useMyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function AddBlog() {
  const {
    setImage,
    title,
    setTitle,
    author,
    setAuthor,
    category,
    setCategory,
    description,
    setDescription,
    blog,
    setBlog,
    addBlog,
    getBlogData,
    loading,
  } = useMyContext();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBlog();
    setImage(null);
    setTitle("");
    setAuthor("");
    setCategory("");
    setDescription("");
    setBlog("");
    navigate("/");
    getBlogData();
  };
  return (
    <div className="bg-gray-300 min-h-screen w-full border-4  border-gray-900 border-dotted">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          action="#"
          className="px-10 my-10 space-y-5"
        >
          <div className="flex justify-center items-center h-52 mx-auto w-full px-10 cursor-pointer border border-dashed rounded-lg bg-[#DADFDE] border-gray-500">
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-5">
            <div className="flex flex-col justify-center gap-y-2">
              <label htmlFor="title" className="font-bold text-xl">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="w-full px-4 py-2 rounded-lg bg-[#DADFDE] border border-gray-900 border-dotted outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <label htmlFor="Author" className="font-bold text-xl">
                Author
              </label>
              <input
                type="text"
                name="Author"
                id="Author"
                placeholder="Author"
                className="w-full px-4 py-2 rounded-lg bg-[#DADFDE] border border-black border-dotted outline-none"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <label htmlFor="Category" className="font-bold text-xl">
                Category
              </label>
              <input
                type="text"
                name="Category"
                id="Category"
                placeholder="Enter Category"
                className="w-full px-4 py-2 rounded-lg bg-[#DADFDE] border border-black border-dotted outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <label htmlFor="Description" className="font-bold text-xl">
                Description
              </label>
              <input
                type="text"
                name="Description"
                id="Description"
                placeholder="Enter Description"
                className="w-full px-4 py-2 rounded-lg bg-[#DADFDE] border border-black border-dotted outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <label htmlFor="blog" className="font-bold text-xl">
                Blog
              </label>
              <textarea
                rows={10}
                type="text"
                name="blog"
                id="blog"
                placeholder="Write your blog"
                className="w-full px-4 py-2 rounded-lg resize-none bg-[#DADFDE]  border border-black border-dotted outline-none"
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="font-bold text-xl bg-[#627473] text-white px-10 py-2 rounded-lg"
            >
              Post Blog
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddBlog;
