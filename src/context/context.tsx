import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../constants';
import axios from 'axios';
import md5 from 'md5';
import { IProduct } from '../types/types';

const DataContext = createContext<{
  products: IProduct[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  allProductIds: string[];
  renderPaginationButtons: () => JSX.Element[];
  handlePageChange: (newPage: number) => void;
}>({
  products: [],
  loading: true,
  currentPage: 1,
  totalPages: 0,
  allProductIds: [],
  renderPaginationButtons: () => [],
  handlePageChange: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [allProductIds, setAllProductIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const password = 'Valantis';
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const authString = md5(`${password}_${timestamp}`);

        const requestData = {
          action: 'get_ids',
          params: { limit: 1000 }
        };

        const response = await axios.post(API_URL, requestData, {
          headers: { 'X-Auth': authString }
        });

        const productIds = response.data.result;
        setAllProductIds(productIds);

        const totalProducts = productIds.length;
        const pages = Math.ceil(totalProducts / 50);

        setTotalPages(pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProductsOnPage() {
      try {
        setLoading(true);

        const start = (currentPage - 1) * 50;
        const end = currentPage * 50;
        const idsOnPage = allProductIds.slice(start, end);

        const password = 'Valantis';
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const authString = md5(`${password}_${timestamp}`);

        const requestData = {
          action: 'get_items',
          params: { ids: idsOnPage }
        };

        const response = await axios.post(API_URL, requestData, {
          headers: { 'X-Auth': authString }
        });

        setProducts(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }

    fetchProductsOnPage();
  }, [currentPage, allProductIds]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button 
          key={i} 
          className="pag__button" 
          onClick={() => handlePageChange(i)} 
          disabled={i === currentPage}
          style={{ backgroundColor: i === currentPage ? 'orange' : '', color: i === currentPage ? 'black' : '' }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <DataContext.Provider value={{ 
      products,
      loading,
      currentPage,
      totalPages,
      allProductIds,
      renderPaginationButtons,
      handlePageChange
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(DataContext);
};