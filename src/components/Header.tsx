import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

// const sections = [
//   { title: 'Technology', url: '#' },
//   { title: 'Design', url: '#' },
//   { title: 'Culture', url: '#' },
//   { title: 'Business', url: '#' },
//   { title: 'Politics', url: '#' },
//   { title: 'Opinion', url: '#' },
//   { title: 'Science', url: '#' },
//   { title: 'Health', url: '#' },
//   { title: 'Style', url: '#' },
//   { title: 'Travel', url: '#' },
// ];

export default function Header() {

  const title = "Neal Callaghan";
  const subtitle = "A place for me to share what I'm learning: AWS, .NET, Docker, microservices, and more...";

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Toolbar sx={{ borderBottom: 0, borderColor: 'divider' }}>
          {/* <Button size="small">Subscribe</Button> remove this for now */}

          <Stack>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                noWrap
                textAlign='center'
                sx={{ flex: 1 }}
              >
                {title}
              </Typography>
              <Typography>{subtitle}</Typography>
          </Stack>
            {/* <IconButton>
              <SearchIcon /> remove this for now
            </IconButton> */}
            {/* <Button variant="outlined" size="small"> remove this for now
              Sign up
            </Button> */}
        </Toolbar>
      </Box>
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}
