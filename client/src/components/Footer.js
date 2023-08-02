import React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Container component="footer" maxWidth="lg" style={{ marginTop: '40px', paddingBottom: '20px', textAlign: 'center' }}>
      <Typography variant="body1">
        <Link href="https://github.com/christopherflores9312/VideoLingo.git" color="textPrimary">
          GitHub
        </Link>
        {" | "}
        <Link href="https://www.linkedin.com" color="textPrimary">
          LinkedIn
        </Link>
        {" | "}
        <Link href="https://www.facebook.com/" color="textPrimary">
          Facebook
        </Link>
      </Typography>
    </Container>
  );
}

export default Footer;