import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const BasicTextFields: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        社團註冊
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom>
        基本資訊
      </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="club-name"
          label="社團名稱"
          variant="outlined"
        />
        <TextField
          id="school-name"
          label="社團所屬學校"
          variant="outlined"
        />
      </Box>
    </div>
  );
};

export default BasicTextFields;
