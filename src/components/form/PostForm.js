import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BLOGS, LOGGED_USER, getLocalStorageItem, setLocalStorageItem } from '../../constants/helpers';
import moment from 'moment';
import { Button, Typography } from '@mui/material';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../../constants/routes';

export default function PostForm() {
  const [loggedUser, setLoggedUser] = React.useState(getLocalStorageItem(LOGGED_USER));
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reader = new FileReader();

    reader.readAsDataURL(data.get("file"));

    reader.addEventListener("load", function () {
        localStorage.setItem("image", reader.result);
    }, false);
    let MockBlogs = getLocalStorageItem(BLOGS);
    const loggedUser = getLocalStorageItem(LOGGED_USER);
    if(!loggedUser){
      alert("Please Login");
      navigate(SIGN_IN);
    }
    let blog = {
      blogId:  MockBlogs[loggedUser?.email]?.length ? MockBlogs[loggedUser?.email]?.length + 1 : 1,
      title: data.get("title"),
      content: data.get("content"),
      image: localStorage.getItem("image"),
      date: moment(),
      comments: []
    }
    if(MockBlogs[loggedUser?.email]){
      MockBlogs[loggedUser?.email].push(blog);
    }
    else{
      MockBlogs[loggedUser?.email] = [blog];
    }
    localStorage.removeItem(BLOGS);
    setLocalStorageItem(BLOGS, MockBlogs);
    alert('Post Created Successfuly!');
    navigate('/my-blogs');
  }

  return (
    <>
      <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '40vh'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField id="outlined-basic" name="title" label="Title" variant="outlined" />
        <TextField id="outlined-basic" name="content" label="Content" variant="outlined" />
        {/* <div key="file">
          <label>Upload Image</label> */}
          Upload File <input type="file" id="file" name="file"/>
        {/* </div> */}
        <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Post
                </Button>
      </Box>
    </>
  );
}