import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);

        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sort
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // Previous Page
  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  // Next Page
  const handleNext = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  // Loading
  if (loading) {
    return <Loader />;
  }

  // Error
  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-2 text-red-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          All Products
        </h1>

        <p className="mt-2 text-slate-500">
          Browse our latest products
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-4 rounded-2xl border bg-white p-5 shadow-sm md:grid-cols-3">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Search Products
          </label>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Sort By
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="default">Default</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="rating">
              Rating: High to Low
            </option>
          </select>
        </div>
      </div>

      {/* Result Info */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredProducts.length === 0
              ? 0
              : startIndex + 1}
            -
            {Math.min(
              endIndex,
              filteredProducts.length
            )}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>

        {totalPages > 0 && (
          <p className="text-sm text-slate-500">
            Page{" "}
            <span className="font-semibold text-slate-700">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {totalPages}
            </span>
          </p>
        )}
      </div>

      {/* Products */}
      {currentProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-12 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            No products found
          </h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or category filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setSort("default");
            }}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="rounded-xl border bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 min-w-10 rounded-xl px-3 font-semibold transition ${
                currentPage === page
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-xl border bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;