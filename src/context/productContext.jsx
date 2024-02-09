import axios from 'axios';
import { createContext, useEffect, useState } from 'react';



//! Context yapısnın temelini oluşturma
export const ProductContext = createContext();

//! Sağlayıcı ve onun tuttuğu verileri tanımla
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Önceki ürünleri kaldır > Yükleniyor'u tetikle
    setProducts(null);

    // Hangi url'ye istek atılacağını belirle
    const url =
      category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;

    // API isteği at
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  // Context yapısında tuttuğumuz verilerin bileşenlerini sağla
  // Value olarak eklenen veriler projedeki bütün bileşenler tarafından erişilebilir olur.
  return (
    <ProductContext.Provider
      value={{ products, category, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}
