import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, fireDb, storage } from "../firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const context = createContext();
export const ContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [passwordLengthError, setPasswordLengthError] = useState('')

  const signup = async () => {
    setLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }
      if(password.length<=6){
        setPasswordLengthError(
          "Password should be at least 6 characters"
        );
      }
      const users = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      const user = {
        name: name,
        email: users.user.email,
        uid: users.user.uid,
        time: Timestamp.now(),
      };
      await addDoc(collection(fireDb, "user"), user);
      window.location.href = "/login";
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setError("This email already resistered !")
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong !")
    } finally {
      setLoading(false);
    }
  };

  //   add Blog
  const [image, setImage] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const currentUser = auth.currentUser;
  const addBlog = async () => {
    if (!image) {
      console.log("Please choose an image !");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    setLoading(true);
    try {
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);

      if (!title || !author || !category || !description || !blog) {
        throw new Error("All fields are required to write a blog ");
      }

      await addDoc(collection(fireDb, "blog"), {
        title,
        author,
        category,
        description,
        blog,
        imageUrl: url,
        uid:currentUser.uid
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   get blogs data
  const [blogsData, setBlogsData] = useState([]);
  const getBlogData = async () => {
    setLoading(true);
    try {
      const blogsData = await getDocs(collection(fireDb, "blog"));
      const items = blogsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogsData(items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogData();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const confirmDoc = confirm("Do you want to delete this blog ? ");
      if (confirmDoc) {
        await deleteDoc(doc(fireDb, "blog", id));
        console.log("Deleted successfully !")
      }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <context.Provider
      value={{
        signup,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        setLoading,
        login,
        image,
        setImage,
        downloadURL,
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
        blogsData,
        getBlogData,
        deleteBlog,
        error,
        passwordLengthError,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useMyContext = () => {
  return useContext(context);
};
