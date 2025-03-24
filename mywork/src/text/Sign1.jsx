import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function BasicTextFields() {
  return (
   <>
   <h4>註冊</h4>
   <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
     
      <TextField id="outlined-basic" label="帳號" variant="outlined" /><br></br>
      <TextField id="outlined-basic" label="密碼" variant="outlined" /><br></br>
      
      <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={() => (window.location.href = "/Information.jsx")}>註冊</Button>
     
    </Stack>      
    </Box>
   </>
  )
}
export default BasicTextFields