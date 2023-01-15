import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';

import image from '../Images/profile.png';

interface SidebarProps {
  projects: ReadonlyArray<{ //lets think about projects instead of archives
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
    link: string;
  }>;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { projects, description, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            component="img"
            sx={{
              height: 150,
              width: 150,
              maxHeight: { xs: 150 },//md: 167 },
              maxWidth: { xs: 150 },//md: 250 },
            }}
            src={image}
          />
        </Box>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        My Open Source Software
      </Typography>
      {projects.map((project) => (
        <Link display="block" variant="body1" href={project.url} key={project.title}>
          {project.title}
        </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href={network.link}
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}
