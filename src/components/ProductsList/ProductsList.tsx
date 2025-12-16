import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts, setFilters, sortByPriceLowToHigh, sortByPriceHighToLow, selectFilteredProducts, resetSort } from '../../features/products/productsSlice';
import ProductItem from '../ProductItem';
import ProductDetails from '../ProductDetails';
import ProductFilters from '../ProductFilters';

export default function ProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const [selected, setSelected] = useState<null | typeof products[0]>(null);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    dispatch(setFilters({ category: value }));
  };

const handleSortChange = (value: string) => {
  setSort(value);
  if (value === 'low') dispatch(sortByPriceLowToHigh());
  else if (value === 'high') dispatch(sortByPriceHighToLow());
  else dispatch(resetSort());
};


  return (
    <>
      <ProductFilters
        category={category}
        sort={sort}
        search={search}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={(value) => {
          setSearch(value);
          dispatch(setFilters({ search: value }));
        }}
      />

      <div className="columns is-multiline">
        {products.map((p) => (
          <div key={p.id} className="column is-one-quarter">
            <ProductItem product={p} onClick={setSelected} />
          </div>
        ))}
      </div>

      {selected && <ProductDetails product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
