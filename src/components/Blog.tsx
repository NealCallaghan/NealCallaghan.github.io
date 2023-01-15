import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import HomeComponent from './HomeComponent';

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <HomeComponent/>
      </Container>
      {/* <Footer I think we can do without a footer for now
        title="Neal Callaghans Blog"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}
