import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { IProduct } from '../../types/types';

export default function Card() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductIds() {
      try {
        const password = 'Valantis';
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const authString = md5(`${password}_${timestamp}`);
        const apiUrl = 'http://api.valantis.store:40000/';

        const requestData = {
          action: 'get_ids',
          params: { offset: 0, limit: 500 }
        };

        const response = await axios.post(apiUrl, requestData, {
          headers: { 'X-Auth': authString }
        });

        const productIds = response.data.result;

        await fetchProducts(productIds);
      } catch (error) {
        console.error('Error fetching product IDs:', error);
      }
    }

    async function fetchProducts(ids: string[]) {
      try {
        const password = 'Valantis';
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const authString = md5(`${password}_${timestamp}`);
        const apiUrl = 'https://api.valantis.store:41000/';

        const requestData = {
          action: 'get_items',
          params: { ids }
        };

        const response = await axios.post(apiUrl, requestData, {
          headers: { 'X-Auth': authString }
        });

        console.log(response.data.result)

        setProducts(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProductIds();
  }, []);

  if (loading) {
    return <div className="product__title">Loading...</div>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="product__title">#</th>
            <th className="product__title">Name</th>
            <th className="product__title">Price</th>
            <th className="product__title">Brand</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="product__description">{index + 1}</td>
              <td className="product__description">{product.product}</td>
              <td className="product__description">{product.price}</td>
              <td className="product__description">{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}