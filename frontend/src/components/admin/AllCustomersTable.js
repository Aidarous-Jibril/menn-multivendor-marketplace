import React, { useEffect, useState } from "react";

// Third-party library imports
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { format } from "date-fns";

// Local imports
import Loader from "../vendor/layout/Loader";
import { fetchAllUsers, editUser, deleteUser, fetchUserOrders } from "@/redux/slices/adminSlice";
import ProductTable from "../common/ProductTable";
import EditProductModal from "../common/ProductEditModal";

const AllCustomersTable = () => {
  const dispatch = useDispatch();
  const { isLoading, error, adminInfo, users } = useSelector((state) => state.admin);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", phoneNumber: "", addresses: [] });

  useEffect(() => {
    if (adminInfo) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, adminInfo]);

  if (error) return <p className="text-red-500">{error}</p>;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter by user name, id and email
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = users.filter((user) => 
      (user?.name?.toLowerCase() || "").includes(lowerCaseQuery) ||
      (user?._id?.toLowerCase() || "").includes(lowerCaseQuery) ||
      (user?.email?.toLowerCase() || "").includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);
  

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      addresses: user.addresses,
    });
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle address fields separately
    if (name.includes("addressType") || name.includes("street") || name.includes("city") || name.includes("postalCode") || name.includes("country")) {
      const addressIndex = name.split('_')[1];
      const fieldName = name.split('_')[0];
      
      setUpdatedUser((prevState) => {
        const updatedAddresses = [...prevState.addresses];
        updatedAddresses[addressIndex] = { ...updatedAddresses[addressIndex], [fieldName]: value };
        return { ...prevState, addresses: updatedAddresses };
      });
    } else {
      setUpdatedUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    const result = await dispatch(editUser({ id: selectedUser.id, updatedUser }));

    if (result.type === "admin/editUser/fulfilled") {
      toast.success(result.payload.message || "User updated!");
    } else {
      toast.error("User update failed.");
    }
    setOpenEditModal(false);
  };

  const handleDeleteConfirmation = (userId) => {
    setSelectedUser(userId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteUser = async () => {
    const result = await dispatch(deleteUser(selectedUser));

    if (result.type === "admin/deleteUser/fulfilled") {
      toast.success("User deleted!");
    } else {
      toast.error("Failed to delete user.");
    }
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const handleViewUserOrders = (userId) => {
    dispatch(fetchUserOrders(userId));
    setOpenModal(true);
  };

  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      minWidth: 150, 
      flex: 1, 
      renderCell: (params) => <span>{`...${params.value.slice(-6)}`}</span> 
    },
    { 
      field: "joiningDate", 
      headerName: "JOINING DATE", 
      minWidth: 180, 
      flex: 1, 
      renderCell: (params) => <span>{format(new Date(params.value), "MMM dd, yyyy ")}</span> 
    },
    { field: "name", headerName: "NAME", minWidth: 200, flex: 1 },
    { field: "email", headerName: "EMAIL", minWidth: 250, flex: 1 },
    { field: "phone", headerName: "PHONE", minWidth: 150, flex: 1 },
    { 
      field: "addresses", 
      headerName: "ADDRESS", 
      minWidth: 250, 
      flex: 1, 
      renderCell: (params) => <span>{params.row.addresses[0]?.street || "No address"}</span> 
    },
    { 
      field: "actions", 
      headerName: "ACTIONS", 
      minWidth: 200, 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
          <Tooltip title="Edit">
            <Button variant="contained" color="primary" size="small" onClick={() => handleEditModalOpen(params.row)}
              style={{
                padding: "6px 12px",
                minWidth: "auto",
                fontSize: "14px",
              }}>
              <AiOutlineEdit size={16} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button variant="contained" color="error" size="small" onClick={() => handleDeleteConfirmation(params.row.id)}
              style={{
                padding: "6px 12px",
                minWidth: "auto",
                fontSize: "14px",
              }}>
              <AiOutlineDelete size={16} />
            </Button>
          </Tooltip>
          <Tooltip title="View">
            <Button variant="contained" color="info" size="small" onClick={() => handleViewUserOrders(params.row.id)}
              style={{
                padding: "6px 12px",
                minWidth: "auto",
                fontSize: "14px",
              }}>
              <AiOutlineEye size={16} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = filteredUsers.map((user) => ({
    id: user._id,
    joiningDate: user.createdAt,
    name: user.name,
    email: user.email,
    phone: user.phoneNumber,
    addresses: user.addresses,
  }));

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 md:p-8 rounded-md">
          <div className="flex items-center mb-6">
            <i className="fas fa-box-open text-2xl text-orange-500 mr-2"></i>
            <h1 className="text-2xl font-semibold">Customers List</h1>
            <span className="ml-2 bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">{users?.length || 0}</span>
          </div>

          {/* Search Section */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name or ID"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Data Table */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <ProductTable rows={rows} columns={columns} />
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      <EditProductModal
        open={openEditModal}
        onClose={handleEditModalClose}
        data={updatedUser}
        onInputChange={handleInputChange}
        onSave={handleEditSubmit}
        isCustomerEdit={true}
      />
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCustomersTable;
