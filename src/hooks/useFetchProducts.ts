// useFetchProducts.ts - FIXED VERSION
import { usePaginationStore } from "@/stores/usePaginationStore";
import { pagination } from "../api/requests";
import { useProductsStore } from "@/stores/useProductsStore";
import type { PaginationParams } from "@/api/types";
import { useCallback, useRef } from "react";

const useFetchProducts = () => {
  const {
    setProducts,
    setTotalProducts,
    priceRange,
    selectedCategory,
    searchedWord,
    initialMinPrice,
    initialMaxPrice,
    setHasNextPage,
    setPriceRange,
    setInitialMinPrice,
    setInitialMaxPrice,
  } = useProductsStore();
  const { limit, offset } = usePaginationStore();
  const prevFilterRef = useRef({ categoryId: selectedCategory?.id, searchedWord, initialMinPrice, initialMaxPrice });
  
  const fetchProducts = useCallback(async () => {
    const currentCategoryId = selectedCategory?.id;
    const filterChanged =
      prevFilterRef.current.categoryId !== currentCategoryId ||
      prevFilterRef.current.searchedWord !== searchedWord ||
      prevFilterRef.current.initialMinPrice !== initialMinPrice ||
      prevFilterRef.current.initialMaxPrice !== initialMaxPrice;

    prevFilterRef.current = { categoryId: currentCategoryId, searchedWord, initialMinPrice, initialMaxPrice };

    const totalParamsForRange: PaginationParams = {
      limit: 0,
      offset: 0,
      price_min: null,
      price_max: null,
    };
    if (selectedCategory) totalParamsForRange.categoryId = selectedCategory.id;
    if (searchedWord) totalParamsForRange.title = searchedWord;

    const allProductsForRange = await pagination(totalParamsForRange);

    const allPrices = allProductsForRange.map((p) => p.price);
    const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
    const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

    setInitialMinPrice(minPrice);
    setInitialMaxPrice(maxPrice);

    if (filterChanged) {
      setPriceRange({ price_min: minPrice, price_max: maxPrice });
    }

    const totalParams: PaginationParams = {
      limit: 0,
      offset: 0,
      price_min: null,
      price_max: null,
    };
    if (selectedCategory) totalParams.categoryId = selectedCategory.id;
    if (searchedWord) totalParams.title = searchedWord;
    if (priceRange.price_min !== null && priceRange.price_max !== null) {
      if (priceRange.price_min > 0 || priceRange.price_max > 0) {
        totalParams.price_min = priceRange.price_min;
        totalParams.price_max = priceRange.price_max;
      }
    }

    const totalProductsFiltered = await pagination(totalParams);
    setTotalProducts(totalProductsFiltered);

    const params: PaginationParams = {
      limit: limit + 1,
      offset,
      price_min: null,
      price_max: null,
    };
    if (selectedCategory) params.categoryId = selectedCategory.id;
    if (searchedWord) params.title = searchedWord;
    if (priceRange.price_min !== null && priceRange.price_max !== null) {
      if (priceRange.price_min > 0 || priceRange.price_max > 0) {
        params.price_min = priceRange.price_min;
        params.price_max = priceRange.price_max;
      }
    }

    const fetchedProducts = await pagination(params);
    const hasNextPage = fetchedProducts.length > limit;
    const displayProducts = fetchedProducts.slice(0, limit);

    setProducts(displayProducts);
    setHasNextPage(hasNextPage);
  }, [
    selectedCategory,
    limit,
    offset,
    searchedWord,
    priceRange,
    initialMinPrice,
    initialMaxPrice,
    setProducts,
    setTotalProducts,
    setHasNextPage,
    setPriceRange,
    setInitialMaxPrice,
    setInitialMinPrice,
  ]);

  return { fetchProducts };
};

export default useFetchProducts;
