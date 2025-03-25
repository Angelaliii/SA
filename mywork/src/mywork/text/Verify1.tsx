import React, { useState, useEffect, ChangeEvent } from "react";

export default function ImageUploader() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // Base64裁剪後圖片
  const [adjustSizeImage, setAdjustSizeImage] = useState<string | null>(null); // 調整後圖片
  const [adjustWidth, setAdjustWidth] = useState<number>(280);
  const [adjustHeight, setAdjustHeight] = useState<number>(360);

  // 轉換圖片為 Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 縮放圖片
  const resizeImage = (base64Image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!base64Image) {
        reject("No image provided");
        return;
      }

      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("無法取得 Canvas context");
          return;
        }

        canvas.width = adjustWidth;
        canvas.height = adjustHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/jpeg");
        resolve(resizedBase64);
      };

      img.onerror = (error) => reject(error);
    });
  };

  // 處理圖片上傳與縮放
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        alert("請選擇圖片！");
        return;
      }

      const base64Image = await convertToBase64(file);
      setCroppedImage(base64Image);

      const resizedImage = await resizeImage(base64Image);
      setAdjustSizeImage(resizedImage);
    } catch (error) {
      console.error("處理圖片時發生錯誤:", error);
      setAdjustSizeImage(null);
    }
  };

  useEffect(() => {
    if (adjustSizeImage) {
      console.log("圖片縮放完成，準備呼叫 API");
      callAPIfuntion();
    }
  }, [adjustSizeImage]);

  // 假設的 API 函式
  const callAPIfuntion = () => {
    console.log("📡 模擬 API 上傳:", adjustSizeImage);
  };

  return (
    <div>
      <h2>上傳並縮放圖片</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      {croppedImage && <img src={croppedImage} alt="原圖" width="150" />}
      {adjustSizeImage && <img src={adjustSizeImage} alt="縮放後" width="150" />}
    </div>
  );
}
