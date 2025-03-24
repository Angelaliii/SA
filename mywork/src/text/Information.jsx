import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Information() {
  return (
    <div>
      <h4>聯絡資訊</h4>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-multiline-flexible" label="負責人姓名" multiline maxRows={4} /><br></br>
         
          <TextField id="outlined-multiline-flexible" label="負責人電話" multiline maxRows={4} /><br></br>
           <TextField id="outlined-multiline-flexible" label="社群媒體連結" multiline maxRows={4} />
        </div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">負責人 Email</InputLabel>
            
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        
      </Box>
      <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={() => (window.location.href = "/Verify.jsx")}>下一步</Button>
     
    </Stack>
    </div>
  );
}
