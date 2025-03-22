import React, { useEffect, useState } from "react";

// Third-party library imports
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

// Local imports (Redux slices and other components)
import Loader from "./layout/Loader";
import { fetchAllCoupons, createCoupon, deleteCoupon, updateCoupon } from "../../redux/slices/couponSlice";
import { vendorGetAllProducts } from "../../redux/slices/productSlice";
import { fetchCategories, fetchSubcategories, fetchSubSubcategories } from "@/redux/slices/categorySlice";


const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("Purchase"); 
  const [status, setStatus] = useState("active"); 
  const [validityStart, setValidityStart] = useState(new Date());
  const [validityEnd, setValidityEnd] = useState(new Date()); 
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCouponId, setEditCouponId] = useState(null);

  const dispatch = useDispatch();
  const { vendorInfo } = useSelector((state) => state.vendors);
  const { coupons, loading } = useSelector((state) => state.coupons);
  const { vendorProducts } = useSelector((state) => state.products);
  const { categories, subcategories, subSubcategories } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (vendorInfo?._id) {
      dispatch(fetchAllCoupons(vendorInfo?._id));
      dispatch(vendorGetAllProducts(vendorInfo?._id));
    }
    dispatch(fetchCategories()); 
  }, [dispatch, vendorInfo]);

  useEffect(() => {
    if (mainCategory) {
      dispatch(fetchSubcategories(mainCategory));
      setSubCategory("");
      setSubSubCategory("");
    }
  }, [dispatch, mainCategory]);

  useEffect(() => {
    if (subCategory) {
      dispatch(fetchSubSubcategories(subCategory));
      setSubSubCategory("");
    }
  }, [dispatch, subCategory]);

  useEffect(() => {
    if (subSubCategory) {
      const filtered = vendorProducts.filter(
        (product) => product.subSubCategory === subSubCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [subSubCategory, vendorProducts]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const couponData = {
      name,
      value,
      type,
      validityStart,
      validityEnd,
      status,
      selectedProducts: Array.isArray(selectedProducts)
        ? selectedProducts.filter((product) => product && product._id).map((product) => product._id)
        : [],
      vendorId: vendorInfo._id,
    };
  
    if (editMode) {
      await dispatch(updateCoupon({ couponId: editCouponId, couponData }));
      toast.success("Coupon updated successfully!");
      dispatch(fetchAllCoupons(vendorInfo._id)); 
    } else {
      await dispatch(createCoupon(couponData));
      toast.success("Coupon created successfully!");
      dispatch(fetchAllCoupons(vendorInfo._id)); 
    }
  
    // Reset form and close modal
    setName("");
    setValue("");
    setType("");
    setValidityStart(new Date());
    setValidityEnd(new Date());
    setStatus("");
    setSelectedProducts([]);
    setEditMode(false);
    setEditCouponId(null);
    setOpen(false);
  };
  

  const handleCouponDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      const result = await dispatch(deleteCoupon(id));
      if (result.type === "coupons/deleteCoupon/fulfilled") {
        toast.success("Coupon deleted successfully!");
        dispatch(fetchAllCoupons(vendorInfo._id)); 
      } else {
        toast.error("Coupon deletion failed.");
      }
    }
  };


  
  const handleCouponEdit = (coupon) => {
    setName(coupon.name);
    setValue(coupon.value || "");
    setType(coupon.type || "Purchase");
    setStatus(coupon.status || "active");
    setValidityStart(coupon.validity?.start ? new Date(coupon.validity.start) : new Date());
    setValidityEnd(coupon.validity?.end ? new Date(coupon.validity.end) : new Date());    
    setStatus(coupon.status);
    setSelectedProducts(coupon.selectedProducts.map((product) => product._id));
    
    // Pre-populate category fields
    setMainCategory(coupon.mainCategory || "");  // Handle case where there's no main category
    setSubCategory(coupon.subCategory || "");  // Handle case where there's no subcategory
    setSubSubCategory(coupon.subSubCategory || "");  // Handle case where there's no subsubCategory
    
    setEditMode(true);
    setEditCouponId(coupon.id);
    setOpen(true);  // Open the modal for editing
  };
  
  
  //for multiple products selection
  const handleProductSelection = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedProducts(selected);
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus ? "inactive" : "active";
    const updatedCoupon = coupons.find((coupon) => coupon._id === id);
  
    if (updatedCoupon) {
      const updatedData = { ...updatedCoupon, status: newStatus };
  
      const result = await dispatch(updateCoupon({ couponId: id, couponData: updatedData }));
      if (result.type === "coupons/updateCoupon/fulfilled") {
        toast.success("Status updated successfully!");
        dispatch(fetchAllCoupons(vendorInfo._id)); // Fetch the latest coupons
      } else {
        toast.error("Failed to update status.");
      }
    }
  };
  
  
  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 1, renderCell: ({ row: { id } }) => `....${id.slice(-4)}` || "N/A",},
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "valueDisplay", headerName: "Value", width: 100 },
    {
      field: "type",
      headerName: "Type",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        const type = params.row?.type;
        if (type === "Purchase") {
          return <span style={{ color: "green" }}>Purchase</span>; // You can add custom styles or icons here
        } else if (type === "Delivery") {
          return <span style={{ color: "blue" }}>Delivery</span>;
        }
        return "N/A";
      }
    },     
    {
      field: "validity",
      headerName: "Validity",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const { validity } = params.row;
        const startDate = validity.start ? new Date(validity.start).toLocaleDateString('en-GB') : "N/A";
        const endDate = validity.end ? new Date(validity.end).toLocaleDateString('en-GB') : "N/A";
        return (
          <span>
            {startDate} - {endDate}
          </span>
        );
      },
    },      
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const isChecked = params.row.status === "active";
        return (
          <Switch
            checked={isChecked}  // `checked` expects a boolean value
            onChange={() => handleStatusChange(params.row.id, isChecked)} // Pass the current checked status
          />
        );
      },
    },    
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
          <Button variant="contained" color="primary" onClick={() => handleCouponEdit(params.row)}>
              <AiOutlineEdit size={20} />
          </Button>
      ),
  },
  {
      field: "delete",
      headerName: "Delete",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
          <Button variant="contained" color="error" onClick={() => handleCouponDelete(params.row.id)}>
              <AiOutlineDelete size={20} />
          </Button>
      ),
  },
  ];
  
  const rows = coupons?.map((coupon, index) => ({
    id: coupon._id ?? index,
    name: coupon.name ?? "N/A",
    valueDisplay: coupon.value ? `${coupon.value}%` : "0%", // For DataGrid display
    value: coupon.value || "0", // Raw value for editing    
    type: coupon.type === "Purchase" ? "Purchase" : "Delivery", 
    validity: {
      start: coupon.validityStart || null, 
      end: coupon.validityEnd || null,    
    },    
    status: coupon.status ?? "active",
    selectedProducts: coupon.selectedProducts ?? [],
  }));
  

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full px-8 pt-10  bg-white">
      {/* Create Coupon Button */}
      <div className="w-full flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          Create Coupon Code
        </button>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        getRowId={(row) => row.id}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ADD8E6", // Light blue color
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            fontSize: "1rem", // Optional: Adjust font size
          },
        }}
      />


      {/* Modal for Creating Coupon */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-[2000] flex items-center justify-center">
          <div className="w-[90%] sm:w-[50%] h-[80vh] bg-white rounded-md shadow-lg p-6 overflow-y-auto">

            <div className="w-full flex justify-end">
              <RxCross1 size={30} onClick={() => setOpen(false)} />
            </div>
            <h5 className="text-2xl font-semibold text-center">
              {editMode ? "Update Coupon" : "Create Coupon"}
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <div className="mt-4">
                <label>Discount Percentage</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  className="input w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
              <div className="mt-4">
                <label>Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="percentage">Purchase</option>
                  <option value="fixed">Delivery</option>
                </select>
              </div>
              <div className="mt-4">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-4 flex space-x-4">
              <div className="flex-1">
                <label>Validity Start</label>
                <DatePicker
                  selected={validityStart}
                  onChange={(date) => setValidityStart(date)}
                  className="w-full p-2 border border-gray-300 rounded"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="flex-1">
                <label>Validity End</label>
                <DatePicker
                  selected={validityEnd}
                  onChange={(date) => setValidityEnd(date)}
                  className="w-full p-2 border border-gray-300 rounded"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>


              {/* Categories */}
              <div className="mt-4">
                <label className="block font-medium">Main Category</label>
                <select
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  className="w-full px-3 py-3 border rounded"
                >
                  <option value="">Select Main Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block font-medium">Sub Category</label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  disabled={!mainCategory}
                  className="w-full px-3 py-3 border rounded"
                >
                  <option value="">Select Sub Category</option>
                  {subcategories?.map((sub) => (
                    <option key={sub._id} value={sub.slug}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label>Sub-Sub Category</label>
                <select
                  value={subSubCategory}
                  onChange={(e) => setSubSubCategory(e.target.value)}
                  disabled={!subCategory}
                  className="w-full px-3 py-3 border rounded"
                >
                  <option value="">Select Sub-Sub Category</option>
                  {subSubcategories?.map((subSub) => (
                    <option key={subSub._id} value={subSub.slug}>
                      {subSub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label>Products</label>
                <select
                  multiple
                  value={selectedProducts}
                  onChange={handleProductSelection}
                  disabled={!subSubCategory}
                  className="w-full px-3 py-3 border rounded"
                >
                  {filteredProducts.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 text-right">
                <Button color="primary" variant="contained" type="submit">
                  {editMode ? "Update Coupon" : "Create Coupon"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;

