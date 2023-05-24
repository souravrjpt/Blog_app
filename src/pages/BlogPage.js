import { useState } from "react"
import { Header } from "../components/header/Header"
import { BLOGS, LOGGED_USER, USERS, getBlogsFromLocalStorage, getLocalStorageItem, getUsersFromLocalStorage, setLocalStorageItem } from "../constants/helpers"
import { BASE_URL, MAIN_BLOG_PAGE } from "../constants/routes";
import { MockBlogs, MockUsers } from "../constants/mockData";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/card/BlogCard";
import Paper from "@mui/material/Paper";
import BlogView from "../components/BlogDialogView/BlogView";


export const BlogPage = ({isLogged}) =>{
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState(getLocalStorageItem(LOGGED_USER));
  const [Users, setUsers] = useState(getUsersFromLocalStorage());
  const [Blogs, setBlogs] = useState(getBlogsFromLocalStorage());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser]  = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);


  useState(() => {
    if(getLocalStorageItem(LOGGED_USER)){
      setLoggedUser(getLocalStorageItem(LOGGED_USER));
      navigate(MAIN_BLOG_PAGE);
    }
    else{
      setLoggedUser(null);
      navigate(BASE_URL);
    }
  }, [])

  useState(() => {
    if(!getLocalStorageItem(USERS)){
      setLocalStorageItem(USERS, MockUsers);
    }

    if(!getLocalStorageItem(BLOGS)){
      setLocalStorageItem(BLOGS, MockBlogs);
    }
  }, [])

  return (
    <>
      <BlogView blog={selectedBlog} user={selectedUser} setOpen={setIsOpen} open={isOpen} />
      <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: '1rem',
        }}
      >
        {!isLogged ? Blogs && Users && Object.keys(Blogs).map((blogKey) =>{
          return Blogs[blogKey].map((blog) => {
            return <BlogCard user={Users[blogKey]} blog={blog} setSelectedUser={setSelectedUser} setSelectedBlog={setSelectedBlog} setIsOpen={setIsOpen} isOpen={isOpen} setBlogs={setBlogs}/>
          })
        }) : (Blogs[loggedUser["email"]]?.map((blog) => {
          return <BlogCard user={Users[loggedUser["email"]]} blog={blog} setSelectedUser={setSelectedUser} setSelectedBlog={setSelectedBlog} setIsOpen={setIsOpen} isOpen={isOpen} setBlogs={setBlogs} isDelete={true}/>
        }))}
      </Paper>
    </>
  )
}