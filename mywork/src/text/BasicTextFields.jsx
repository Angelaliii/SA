import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function BasicTextFields() {
  return (
   <div>
   <h2>社團註冊</h2>
   <h4>基本資訊</h4>
   <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
        
      <TextField id="outlined-basic" label="社團名稱" variant="outlined" /><br></br>
      <TextField id="outlined-basic" label="社團所屬學校" variant="outlined" /><br></br>
      
      <Stack spacing={2} direction="row">
  
      <Button variant="contained" onClick={() => (window.location.href = "/Information.jsx")}>下一步</Button>
     
    </Stack>      
    </Box>
   </div>
  )
}
export default BasicTextFields