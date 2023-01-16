import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import { Post } from '../blogs';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BlogPost from './BlogPost';


interface MainProps {
  posts: ReadonlyArray<Post>;
}

export default function Main(props: MainProps) {
  const { posts } = props;
  
  const title = 'Code, creativity, and problem-solving';

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Router basename={process.env.PUBLIC_URL}>
      
        <Routes>
          <Route path='/' element={
            posts.map(post => (
              <Link href={post.PostLink} underline='none' color='inherit'>
                <Markdown className="markdown" key={post.Postkey}>
                  {post.PostSummary}
                </Markdown>
                <Divider />
              </Link>
              
            ))
          } />
          { posts.map(post => (<Route path={post.PostLink} element={ <BlogPost key={post.Postkey} text={post.PostText} /> } /> )) }
        </Routes>
      </Router>
    </Grid>
  );
}
