/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { Avatar, Button, Typography } from '@mui/joy';
import { BLOGS, LOGGED_USER, getBlogsFromLocalStorage, getLocalStorageItem, setLocalStorageItem } from '../../constants/helpers';
import moment, { isMoment } from 'moment/moment';
import { Snackbar } from '@mui/material';

export default function BlogCard({user, blog, setSelectedUser, setSelectedBlog, setIsOpen, isOpen, setBlogs, isDelete}) {
  const [comment, setComment] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const isCommentAdded = () =>{
    if(comment.length > 0){
      return false;
    }
    return true;
  }

  const loadComments = () => {

  }

  const handleComment = (id, email) => {
    console.log(email);
    const loggedUser = getLocalStorageItem(LOGGED_USER);
    if(loggedUser){
      let MockBlogs = getLocalStorageItem(BLOGS);
      let blog = MockBlogs[email].find((blog) => blog.blogId === id);
      if(blog){
        blog.comments.push({
          email: loggedUser?.email,
          text: comment
        });
        localStorage.removeItem(BLOGS);
        setLocalStorageItem(BLOGS, MockBlogs);
        setBlogs(MockBlogs);
        setComment('');
      }
    }
    else{
      alert('Please Login to Comment!');
    }
  }

  const copyLinkClickHandler = (event, userId, blogId) => {
    setOpen(true);
    navigator.clipboard.writeText(`${window.location.toString()}/${userId}/${blogId}`);
  };

  const handleDelete = (id) => {
    let loggedUser = getLocalStorageItem(LOGGED_USER);
    let MockBlogs = getBlogsFromLocalStorage();
    let blogs = MockBlogs[loggedUser?.email];
    let index = blogs.findIndex((blog) => blog.blogId === id);
    blogs.splice(index, 1);
    console.log(blogs, index);
    localStorage.removeItem(BLOGS);
    setLocalStorageItem(BLOGS, MockBlogs);
    setBlogs(MockBlogs);
  }

  return (
    <>
      <Snackbar
          message="Copied to clibboard"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          open={open}
        />
      <Card
        variant="outlined"
        sx={{
          minWidth: 300,
          '--Card-radius': (theme) => theme.vars.radius.xs,
          margin: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
          <Box
            sx={{
              position: 'relative'
            }}
          >
            <Avatar
              size="sm"
              src="/static/logo.png"
              sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
            />
          </Box>
          <Typography fontWeight="lg">{user.name}</Typography>
          {
            isDelete &&  <Button
              onClick={() => handleDelete(blog.blogId)}
            >
              Delete
            </Button>
          }
        </Box>
        <CardOverflow>
          <AspectRatio>
            <img src={blog.image} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
        <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined onClick={() => {
            setIsOpen(true);         
            setSelectedUser(user.email);
            setSelectedBlog(blog);
          }} />
            </IconButton>
            <IconButton onClick={(event) => copyLinkClickHandler(event, user.id, blog.blogId)} variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
            {[...Array(1)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: '50%',
                  width: `max(${6 - index}px, 3px)`,
                  height: `max(${6 - index}px, 3px)`,
                  bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                }}
              />
            ))}
          </Box>
          <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {blog.likes} Likes
        </Link>
        <Typography fontSize="sm">
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
            Caption
          </Link>{' '}
          {blog.title}
        </Typography>
        {!isOpen ? <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: 'text.tertiary' }}
          onClick={() => {
            setIsOpen(true);         
            setSelectedUser(user.email);
            setSelectedBlog(blog);
          }}
        >
          more
        </Link> : blog.content}
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: 'text.tertiary', my: 0.5 }}
        >
          {moment(blog.date).format("DD MMM YYYY")}
        </Link>
        {!isOpen && <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Face />
          </IconButton>
          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            value={comment}
            onChange={(event) =>{
              setComment(event.target.value);
            }}
            sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
          />
          <Link disabled={isCommentAdded()} onClick={() => handleComment(blog.blogId, user.email)} underline="none" role="button">
            Post
          </Link>
        </CardOverflow>}
          {isOpen && 
          <Typography component={'h1'}>Comments</Typography> }
          {isOpen && blog.comments.length > 0 && blog.comments.map((comment) => {
            return(
              <>
                <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex', alignItems: 'center', gap: '2rem', marginLeft: '3rem', backgroundColor: '#FFFEF2' }}>
                  <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Face />
                    <Typography>{comment.email}</Typography>
                  </IconButton>
                  <Typography>{comment.text}</Typography>
                </CardOverflow>
              </>
            )
          }) }
      </Card>
    </>
  );
}