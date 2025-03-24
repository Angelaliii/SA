'use client';
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Tabs, Tab, IconButton, Container,
  Box, TextField, Select, MenuItem, Autocomplete, Button,
  Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const postLocations = ['版塊1', '版塊2', '版塊3'];
const tagOptions = ['教學', '求助', '公告'];

export default function PublishPage() {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Box>
      
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>新增文章</Typography>
        <Stack spacing={2}>
          <Select
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled hidden>請選擇發文位置</MenuItem>
            {postLocations.map((loc, idx) => (
              <MenuItem key={idx} value={loc}>{loc}</MenuItem>
            ))}
          </Select>

          <TextField fullWidth label="標題" value={title} onChange={(e) => setTitle(e.target.value)} />

          <TextField
            fullWidth
            label="文章內容"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="P1、雙貼圖..."
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<ImageIcon />}
          >
            上傳圖片
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {imageFile && <Typography variant="body2">已選擇：{imageFile.name}</Typography>}

          <Autocomplete
            multiple
            options={tagOptions}
            value={tags}
            onChange={(_, newValue) => setTags(newValue)}
            renderInput={(params) => <TextField {...params} label="Tags" />}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setPreviewOpen(true)}
            >
              預覽
            </Button>
            <Button variant="contained" color="primary" fullWidth>
              發文
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* 預覽 Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>文章預覽</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{content}</Typography>
          {imageFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>圖片檔案：</Typography>
              <Typography variant="body2">{imageFile.name}</Typography>
            </Box>
          )}
          {tags.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">標籤s: {tags.join(', ')}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

