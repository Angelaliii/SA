'use client';
import React from 'react';
import {
  AppBar, Toolbar, Tabs, Tab, IconButton, Container,
  Box, TextField, Select, MenuItem, Autocomplete, Button, Typography,Stack

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const postLocations = ['版塊1', '版塊2', '版塊3']; // 要發在哪裡
const tagOptions = ['教學', '求助', '公告']; // Tags

export default function PublishPage() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [location, setLocation] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <Box>
      

      {/* 表單區 */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          新增文章
        </Typography>
        <Stack spacing={2}>
          {/* 發文位置 */}
          <Select
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">請選擇發文位置</MenuItem>
            {postLocations.map((loc, idx) => (
              <MenuItem key={idx} value={loc}>{loc}</MenuItem>
            ))}
          </Select>

          {/* 標題 */}
          <TextField fullWidth label="標題" variant="outlined" />

          {/* 文章內容 */}
          <TextField
            fullWidth
            label="文章內容"
            variant="outlined"
            multiline
            rows={6}
            placeholder="P1、雙貼圖…"
          />

          {/* Tags */}
          <Autocomplete
            multiple
            options={tagOptions}
            value={tags}
            onChange={(_, newValue) => setTags(newValue)}
            renderInput={(params) => <TextField {...params} label="Tags" />}
          />

          {/* 發文按鈕 */}
          <Button variant="contained" color="primary" fullWidth>
            發文
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
