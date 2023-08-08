import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Contact Us
      </Typography>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        fullWidth
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        name="message"
        value={formData.message}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </form>
  );
}

export default ContactUs;