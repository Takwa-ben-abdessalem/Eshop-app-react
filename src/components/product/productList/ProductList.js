import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilterProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState(''); // Initialize search as an empty string
  const [sort, setSort] =useState("latest")
  const dispatch = useDispatch();
  const filtredProducts = useSelector(selectFilterProducts)
  // Pagination State
  const [currentPage,setCurrentPage] = useState(1)
  const[productsPerPage, setProductsPerPage] = useState(4)

  //Get Current Product
  const indexOfLastProducts = currentPage * productsPerPage
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage
  const currentProducts = filtredProducts.slice(indexOfFirstProducts,indexOfLastProducts)

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles['product-list']} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color="#0066d4"
            onClick={() => setGrid(false)}
          />
          <p>
            <b>{filtredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? <p>No product found.</p> : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filtredProducts.length} ></Pagination>
    </div>
  );
};

export default ProductList;
