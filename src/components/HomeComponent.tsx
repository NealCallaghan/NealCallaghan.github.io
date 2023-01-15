import * as React from 'react';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Main from './Main';
import Sidebar from './Sidebar';
import Posts from '../blogs';

// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random',
//   imageText: 'main image description',
//   linkText: 'Continue reading…',
// };

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//   },
// ];

const sidebar = {
  title: 'About Neal Callaghan',
  description:
    `Neal is a senior engineer specializing in building microservices in the cloud. He also enjoys solving tech problems and looking for new ways to learn and grow as a developer. He's always excited to share his thoughts and experiences on his blog.`,
  projects: [
    { title: 'TypeSwitch', url: 'https://github.com/NealCallaghan/TypeSwitch' },
    { title: 'SqlProvider', url: 'https://github.com/NealCallaghan/SQLProvider' },
    { title: 'InstagramAvalon', url: 'https://github.com/NealCallaghan/InstagramAvalon' },
    { title: 'SharePriceAlerts', url: 'https://github.com/NealCallaghan/SharePriceAlerts' },
    { title: 'TimeTracker', url: 'https://github.com/NealCallaghan/TimeTracker' },
    { title: 'WixSharp', url: 'https://github.com/NealCallaghan/wixsharp' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, link: 'https://github.com/NealCallaghan' },
    { name: 'Twitter', icon: TwitterIcon, link: 'https://twitter.com/nealcallaghan' },
    { name: 'LinkedIn', icon: LinkedInIcon, link: 'https://www.linkedin.com/in/neal-callaghan-45977179/'},
  ],
};

export default function HomeComponent() {
  return (
    <div>
      {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
      {/* <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid> */}
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main posts={Posts} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          projects={sidebar.projects}
          social={sidebar.social}
        />
      </Grid>
    </div>
  );
}
