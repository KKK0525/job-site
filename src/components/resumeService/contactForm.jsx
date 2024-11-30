import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactForm({setContact}) {

  const [formData, setFormData] = useState({
    address: '',
    email: '',
    mobile: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setContact(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
        Validate
        autoComplete="on"
      >
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          required
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          InputLabelProps={{
            className: 'text-gray-600',
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d1d5db', // Tailwind gray-300 color
              },
              '&:hover fieldset': {
                borderColor: '#6b7280', // Tailwind gray-500 color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6', // Tailwind blue-500 color
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          required
          name="email"
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          InputLabelProps={{
            className: 'text-gray-600',
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#6b7280',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Mobile"
          variant="outlined"
          required
          name="mobile"
          type='number'
          value={formData.mobile}
          onChange={handleInputChange}
          InputLabelProps={{
            className: 'text-gray-600',
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#6b7280',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          onClick={handleSubmit}      
        >
          ok
        </Button>
      </form>
    </div>
  );
}
