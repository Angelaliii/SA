import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Activity: React.FC = () => {
  return (
    <div>
      <Typography variant="h6" component="h4" gutterBottom>
        活動與需求
      </Typography>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="activity-intro"
            label="近期或歷史活動介紹"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            id="cooperation-needs"
            label="合作需求"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            id="internship-opportunities"
            label="實習機會(贊助/講座/實習機會/聯名活動)"
            multiline
            rows={4}
            variant="outlined"
          />
        </div>
      </Box>
    </div>
  );
};

export default Activity;
