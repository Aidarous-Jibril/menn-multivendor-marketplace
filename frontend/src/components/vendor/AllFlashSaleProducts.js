// React-related imports
import React, { useEffect, useState } from "react";

// Third-party library imports
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Local imports (Redux slices and other components)
import Loader from "./layout/Loader";
import { storeDeleteEvent, storeGetAllEvents } from "@/redux/slices/eventSlice";
import { fetchAllBrands } from "@/redux/slices/brandSlice";
import { fetchCategories, fetchSubcategories, fetchSubSubcategories } from "@/redux/slices/categorySlice";


const AllFlashSaleProducts = () => {
  const { vendorInfo } = useSelector((state) => state.vendors);
  const { sales, isLoading } = useSelector((state) => state.events);
  const { brands } = useSelector((state) => state.brands);
  const { categories, subcategories, subSubcategories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const [filteredSales, setFilteredSales] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    if (vendorInfo?._id) {
      dispatch(storeGetAllEvents(vendorInfo?._id));
    }
    dispatch(fetchCategories());
    dispatch(fetchAllBrands());
  }, [dispatch, vendorInfo]);

  useEffect(() => {
    if (mainCategory) {
      dispatch(fetchSubcategories(mainCategory));
      dispatch(fetchSubcategories("")); // Reset subcategories
    }
    setSubCategory("");
    setSubSubCategory("");
  }, [dispatch, mainCategory]);

  useEffect(() => {
    if (subCategory) {
      dispatch(fetchSubSubcategories(subCategory));
    } else {
      dispatch(fetchSubSubcategories("")); // Reset sub-subcategories
    }
    setSubSubCategory("");
  }, [dispatch, subCategory]);

  useEffect(() => {
    let filtered = [...sales];

    if (mainCategory) {
      filtered = filtered.filter((sale) => sale.mainCategory === mainCategory);
    }
    if (subCategory) {
      filtered = filtered.filter((sale) => sale.subCategory === subCategory);
    }
    if (subSubCategory) {
      filtered = filtered.filter((sale) => sale.subSubCategory === subSubCategory);
    }
    if (selectedBrand) {
      filtered = filtered.filter((sale) => sale.brand === selectedBrand);
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((sale) =>
        sale.name.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setFilteredSales(filtered);
  }, [mainCategory, subCategory, subSubCategory, selectedBrand, sales, searchQuery]);
  
  // Search input handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const result = await dispatch(storeDeleteEvent(id));
      if (result.type === 'events/storeDeleteEvent/fulfilled') {
        toast.success("Sale product deleted successfully!");
      } else {
        toast.error(result.payload || 'Sale product deletion failed');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the sale product');
    }
  };
  
  const handleResetFilters = () => {
    setMainCategory(""); // Reset main category
    setSubCategory(""); // Reset subcategory
    setSubSubCategory(""); // Reset sub-subcategory
    setSelectedBrand(""); // Reset selected brand
    setFilteredSales(sales); // Reset the filtered sales 
    setSearchQuery("")
  };
  
  // Table columns
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Product Name", minWidth: 180, flex: 1.4 },
    { field: "type", headerName: "Product Type", minWidth: 130, flex: 0.6 },
    { field: "price", headerName: "Unit Price", minWidth: 100, flex: 0.6 },
    { field: "status", headerName: "Verify Status", minWidth: 150, flex: 0.8 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link href={`/flash-sale/${params.id}`} passHref>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link href={`/vendor/edit-product/${params.id}`} passHref>
            <Button>
              <AiOutlineEdit size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Mapping data from vendorProducts
  const rows = filteredSales?.map((item) => ({
    id: item._id,
    name: item.name,
    type: item.isDigital ? "Digital" : "Physical",
    price: `US$ ${item.discountPrice}`,
    status: item.isApproved ? "Approved" : "Pending",
    stock: item.stock,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full bg-white p-4 rounded-md">
          <div className="flex items-center mb-6">
            <i className="fas fa-box-open text-2xl text-orange-500 mr-2"></i>
            <h1 className="text-2xl font-semibold">Sale Product List</h1>
            <span className="ml-2 bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {sales?.length || 0}
            </span>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="block text-gray-700">Main Category</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                >
                  <option value="">Select Main Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700">Sub Category</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  disabled={!mainCategory}
                >
                  <option value="">Select Sub Category</option>
                  {subcategories?.map((sub) => (
                    <option key={sub._id} value={sub.slug}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700">Sub-Sub Category</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={subSubCategory}
                  onChange={(e) => setSubSubCategory(e.target.value)}
                  disabled={!subCategory}
                >
                  <option value="">Select Sub-Sub Category</option>
                  {subSubcategories?.map((subSub) => (
                    <option key={subSub._id} value={subSub.slug}>
                      {subSub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700">Brand</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {brands?.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2" onClick={handleResetFilters}>
                Reset
              </button>
            </div>
          </div>

          {/* Search and Add Product Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center w-full md:w-1/2 mb-2 md:mb-0">
                <div className="relative w-full">
                <input
                    className="w-full p-2 border border-gray-300 rounded pr-10"
                    placeholder="Search by Product Name"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i className="fas fa-search text-gray-500"></i>
                  </span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                  Search
                </button>
              </div>
              <Link href="/vendor/create-product" passHref>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0 md:w-auto w-full">
                  <i className="fas fa-plus"></i> Add new product
                </button>
              </Link>
            </div>
          </div>

          {/* Data Table Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div style={{ height: "400px", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                rowHeight={60}
                disableSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                rowsPerPageOptions={[5, 10, 20]}
                className="data-grid"
                style={{ overflowX: "auto" }} // Enable horizontal scrolling if needed
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllFlashSaleProducts;
