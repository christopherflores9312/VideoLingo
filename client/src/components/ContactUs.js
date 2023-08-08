import React, { useState } from 'react';
import { TextField, Button, Typography, styled, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const refinedDarkTheme = createTheme({
  palette: {
    background: {
      default: '#000', // Dark grey, not black
    },
  },
});

const StyledForm = styled('form')({
  backgroundColor: '#424242',
  padding: '20px',
  borderRadius: '5px',
});

const StyledHeader = styled(Typography)({
  fontFamily: 'MuseoSansRounded1000',
  fontSize: '2.5rem',
  color: '#58cc02',
  marginBottom: '1rem',
});

const StyledTextField = styled(TextField)({
  marginBottom: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#58cc02',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#58cc02',
    },
    '& input': {
      color: '#fff',  // Change the color of the text inside the input
    },
    '& textarea': {   // Add this to target the textarea
      color: '#fff',
    },
  },
  '& .MuiInputLabel-outlined': {
    color: '#e0e0e0',  // Make the label white
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: '#58cc02',  // Color of the label when the input is focused (you can adjust if needed)
  },
});


const SendButton = styled(Button)({
  backgroundColor: '#58cc02',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#4aa902',
  },
});

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Us Form Submitted:', formData);

    alert('Thank you for contacting us! Your message has been received.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ThemeProvider theme={refinedDarkTheme}>
      <CssBaseline />
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader variant="h4">Contact Us</StyledHeader>
        <StyledTextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <StyledTextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <StyledTextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        <SendButton variant="contained" type="submit">
          Send
        </SendButton>
      </StyledForm>
    </ThemeProvider>
  );
}

export default ContactUs;