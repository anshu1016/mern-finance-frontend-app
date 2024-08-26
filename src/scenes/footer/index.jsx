import React, { useState, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const footerStyle = {
    position: 'fixed',
    bottom: isVisible ? 0 : '-50px',
    left: 0,
    width: '100%',
    backgroundColor: '#1f2026',
    color: '#f0f0f3',
    textAlign: 'center',
    padding: '10px 0',
    transition: 'bottom 0.3s',
    zIndex: 1000,
  };

  return (
    <Box
      sx={footerStyle}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        if (window.scrollY > 50) setIsVisible(false);
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 1,
        }}
      >
        <Link href="https://github.com/anshu1016" color="inherit" target="_blank" rel="noopener">
          <GitHubIcon fontSize="large" />
        </Link>
        <Link href="https://x.com/anshu___007" color="inherit" target="_blank" rel="noopener">
          <TwitterIcon fontSize="large" />
        </Link>
        <Link href="https://www.linkedin.com/in/arun-shukla-1399a9196/" color="inherit" target="_blank" rel="noopener">
          <LinkedInIcon fontSize="large" />
        </Link>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Made with <span style={{ color: 'red' }}>❤</span> by Arun
      </Typography>
    </Box>
  );
};

export default Footer;
