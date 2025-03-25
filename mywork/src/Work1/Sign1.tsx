import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BasicTextFields: React.FC = () => {
  const handleRegister = () => {
    window.location.href = '/Information.jsx'; // 可改成 .tsx 或用 react-router 更佳
  };

  return (
    <>
      <Typography variant="h6" component="h4" gutterBottom>
        註冊
      </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="account"
          label="帳號"
          variant="outlined"
        />
        <TextField
          id="password"
          label="密碼"
          type="password"
          variant="outlined"
        />
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleRegister}>
            註冊
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default BasicTextFields;
