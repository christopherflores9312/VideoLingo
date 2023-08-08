import React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Container component="footer" maxWidth="lg" style={{ marginTop: '40px', paddingBottom: '20px', textAlign: 'center', color: '#ffffff' }}>
      <Typography variant="body1" color="inherit">
        <Link href="https://github.com/christopherflores9312/VideoLingo.git" color="inherit">
          GitHub
        </Link>
        {" | "}
        <Link href="https://www.linkedin.com" color="inherit">
          LinkedIn
        </Link>
        {" | "}
        <Link href="https://www.facebook.com/" color="inherit">
          Facebook
        </Link>
      </Typography>
    </Container>
  );
}

export default Footer;
