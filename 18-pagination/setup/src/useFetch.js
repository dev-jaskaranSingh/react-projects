import { useState, useEffect } from 'react';
import paginate from './utils';
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

export const useFetch = (cardsPerPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(paginate(data, cardsPerPage));
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [cardsPerPage]);
  return { loading, data };
};
