import { useLocalStorage } from '@uidotdev/usehooks';
import { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

// 1) Context yapısını tanımla
export const BasketContext = createContext();

// 2) Contexte tutulan verileri uygulamaya aktaracak bir sağlayıcı bilşenini tanımla
export function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage('basket', []);

  // Sepete ürün ekler
  const addToBasket = (newProduct) => {
    //1) Bu üründen sepette var mı kontrol et
    const found = basket.find((i) => i.id === newProduct.id);

    if (found) {
      //2) Ürün sepette varsa > miktarını 1 arttır
      //a) Bulunan ürünün miktarını 1 artır
      const updated = { ...found, amount: found.amount + 1 };

      //b) Sepet dizisindeki eski ürünün yerine güncel halini koy
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      //c) State'i Güncelle
      setBasket(newBasket);

      toast.info(`Quantity Increased (${updated.amount})`);
    } else {
      //3) Urün sepette yoksa > ürünü sepete ekle (miktarını 1'e eşittle)
      setBasket([...basket, { ...newProduct, amount: 1 }]);

      toast.success('Product Successfully Added');
    }

    console.log(basket);
  };

  // Ürünü seppetten kaldır
  const removeFromBasket = (delete_id) => {
    // Sepetteki ürünü bul
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      // Miktarı 1'den fazlaysa > Miktarını 1 eksilt
      const updated = { ...found, amount: found.amount - 1 };

      const newBasket = basket.map((i) =>
        i.id === updated.id ? updated : i
      );

      setBasket(newBasket);

      toast.info(`Quantity Decreased (${updated.amount})`);
    } else {
      // Miktarı 1'e eşitse > ürünü diziden kaldır
      const filtred = basket.filter((i) => i.id !== delete_id);

      setBasket(filtred);

      toast.error(`Product Removed from Basket`);
    }
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
}
