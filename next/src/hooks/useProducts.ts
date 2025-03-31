// app/hooks/useProducts.ts
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/src/_firebase/Config";
import { useEffect, useState } from "react";

// 定義產品型別
interface Product {
  desc: string;
  price: number;
}

export default function useProducts() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Product[] = [];
        const querySnapshot = await getDocs(collection(db, "product"));
        querySnapshot.forEach((doc) => {
          data.push({ desc: doc.data().desc, price: doc.data().price });
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [db]);

  return { products, loading };
}
