"use client";

import { useState } from "react";
import styles from "../assets/Plat.module.css";
import Navbar from "../components/Navbar";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  TextField,
  Typography,
} from "@mui/material";

export default function PlatformLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ["全部", "活動", "科技", "設計"];

  const articles = [
    { id: 1, title: "科技新創展覽", content: "這是科技展的文章", tag: "科技" },
    { id: 2, title: "設計交流會", content: "設計圈的活動紀實", tag: "設計" },
    { id: 3, title: "社團迎新活動", content: "一年一度迎新", tag: "活動" },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchSearch =
      article.title.includes(searchTerm) ||
      article.content.includes(searchTerm);
    const matchTag =
      selectedTag === "全部" || selectedTag === null
        ? true
        : article.tag === selectedTag;

    return matchSearch && matchTag;
  });

  return (
    <Box className={styles.page}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Search */}
        <Container sx={{ my: 6 }}>
          <TextField
            fullWidth
            label="搜尋文章"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Container>

        {/* Tags */}
        <Container sx={{ my: 0 }}>
          <Box sx={{ px: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color={selectedTag === tag ? "primary" : "default"}
                onClick={() => setSelectedTag(tag)}
                clickable
              />
            ))}
          </Box>
        </Container>

        {/* Articles */}
        <Container
          sx={{ my: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {filteredArticles.map((article) => (
            <Card key={article.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">閱讀更多</Button>
              </CardActions>
            </Card>
          ))}
          {filteredArticles.length === 0 && (
            <Typography variant="body1">找不到符合的文章</Typography>
          )}
        </Container>
      </main>
    </Box>
  );
}
