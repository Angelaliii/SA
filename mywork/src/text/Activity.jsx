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

export default function Activity() {
  return (
    <div>
      <h4>活動與需求</h4>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
        
          
           <TextField id="outlined-multiline-static" label="近期或歷史活動介紹" multiline rows={4} />
           <TextField id="outlined-multiline-static" label="合作需求" multiline rows={4} />
           <TextField id="outlined-multiline-static" label="實習機會(贊助/講座/實習機會/聯名活動)" multiline rows={4} />
           
        </div>
        
        
      </Box>
      <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={() => (window.location.href = "/.jsx")}>下一步</Button>
     
    </Stack>
    </div>
  );
}
