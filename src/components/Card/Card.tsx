import { IProduct } from '../../types/types';
import { useDataContext } from '../../context/context';
import Pagination from '../Pagination/Pagination';

export default function Card() {
  const { products, loading } = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="product__title">ID</th>
            <th className="product__title">Name</th>
            <th className="product__title">Price</th>
            <th className="product__title">Brand</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, i) => (
            <tr key={i}>
              <td className="product__description">{i + 1}</td>
              <td className="product__description">{product.product}</td>
              <td className="product__description">{product.price}</td>
              <td className="product__description">{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </>
  );
}
