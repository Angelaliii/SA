import React, { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  // 當使用者選擇檔案時觸發
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <h2>上傳圖片</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <h3>預覽</h3>
          <img src={image} alt="上傳的圖片" style={{ width: "300px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
}
