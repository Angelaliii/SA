import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

const Information: React.FC = () => {
  return (
    <div>
      <Typography variant="h6" component="h4" gutterBottom>
        聯絡資訊
      </Typography>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="responsible-name"
            label="負責人姓名"
            multiline
            maxRows={4}
            variant="outlined"
          />
          <TextField
            id="responsible-phone"
            label="負責人電話"
            multiline
            maxRows={4}
            variant="outlined"
          />
          <TextField
            id="social-link"
            label="社群媒體連結"
            multiline
            maxRows={4}
            variant="outlined"
          />
        </div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="responsible-email">負責人 Email</InputLabel>
            <Input
              id="responsible-email"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default Information;
