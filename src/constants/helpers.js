import { MockBlogs, MockUsers } from "./mockData";

export const setLocalStorageItem = (key, item) =>{
  console.log(typeof item);
  localStorage.setItem(key, JSON.stringify(item));
}

export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const getUsersFromLocalStorage = () => {
  if(getLocalStorageItem(USERS)){
    return getLocalStorageItem(USERS);
  }
  else{
    setLocalStorageItem(USERS, MockUsers);
    return MockUsers;
  }
}

export const getBlogsFromLocalStorage = () => {
  if(getLocalStorageItem(BLOGS)){
    return getLocalStorageItem(BLOGS);
  }
  else{
    setLocalStorageItem(BLOGS, MockBlogs);
    return MockBlogs;
  }
}

export const USERS = "users";
export const BLOGS = "blogs";
export const LOGGED_USER = "loggedUser";
export const MY_BLOGS = "My Blogs";
export const CREATE_BLOG = "Create Blog"