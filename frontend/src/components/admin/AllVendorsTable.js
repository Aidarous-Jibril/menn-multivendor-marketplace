import React, { useEffect, useState } from "react";

// Third-party library imports
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, Switch } from "@mui/material";
import { toast } from "react-toastify";
import { format } from "date-fns";

// Local imports
import Loader from "../vendor/layout/Loader";
import {editVendor, deleteVendor, fetchAllVendors, blockVendor, unblockVendor, fetchVendorById, updateVendor} from "@/redux/slices/adminSlice";
import EditProductModal from "../common/ProductEditModal";

const AllVendorsTable = () => {
  const dispatch = useDispatch();

  const { isLoading, error, adminInfo, vendors } = useSelector(
    (state) => state.admin
  );
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [updatedVendor, setUpdatedVendor] = useState({ name: "", email: "", contactNumber: "" });
const [selectedVendorId, setSelectedVendorId] = useState(null);

  useEffect(() => {
    if (adminInfo) {
      dispatch(fetchAllVendors());
    }
  }, [dispatch, adminInfo]);

  if (error) return <p className="text-red-500">{error}</p>;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let filtered = [...vendors];

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();

      filtered = filtered.filter((vendor) => {
        const vendorName = vendor?.name?.toLowerCase();
        const vendorId = vendor?._id?.toLowerCase();
        const email = vendor?.email?.toLowerCase();

        return (
          vendorName?.includes(lowerCaseQuery) ||
          vendorId?.includes(lowerCaseQuery) ||
          email?.includes(lowerCaseQuery)
        );
      });
    }
    setFilteredVendors(filtered);
  }, [searchQuery, vendors]);


  const handleVendorEdit = (vendor) => {
    console.log("VENDOR:", vendor); //Logs the order including ID
    setSelectedVendorId(vendor.id);
    setUpdatedVendor({
      name: vendor.name,
      email: vendor.email,
      phoneNumber: vendor.phoneNumber,
    });
    setOpenEditModal(true);
  };
  
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setSelectedVendor(null);
  };

  const handleEditSubmit = async () => {
    const result = await dispatch(
      editVendor({ id: selectedVendor.id, updatedVendor })
    );

    if (result.type === "admin/editVendor/fulfilled") {
      toast.success(result.payload.message || "Vendor updated!");
    } else {
      toast.error("Vendor update failed.");
    }
    setOpenEditModal(false);
  };

  const handleDeleteConfirmation = (vendorId) => {
    setSelectedVendor(vendorId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteVendor = async () => {
    const result = await dispatch(deleteVendor(selectedVendor));
    if (result.type === "admin/deleteVendor/fulfilled") {
      toast.success("Vendor deleted!");
    } else {
      toast.error("Failed to delete vendor.");
    }
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleStatusToggle = async (id, isBlocked) => {
    if (isBlocked) {
      // If vendor is blocked, unblock them
      const result = await dispatch(unblockVendor(id));
      if (result.type === "admin/unblockVendor/fulfilled") {
        toast.success("Vendor unblocked successfully!");
      } else {
        toast.error("Failed to unblock vendor.");
      }
    } else {
      // If vendor is active, block them
      const result = await dispatch(blockVendor(id));
      if (result.type === "admin/blockVendor/fulfilled") {
        toast.success("Vendor blocked successfully!");
      } else {
        toast.error("Failed to block vendor.");
      }
    }
  };

  const handleViewVendor = async (vendorId) => {
    try {
      const result = await dispatch(fetchVendorById(vendorId));
      if (result.type === "admin/fetchVendorById/fulfilled") {
        setSelectedVendor(result.payload); // Set the vendor details here
        setOpenViewModal(true); // Open the modal
      } else {
        toast.error("Failed to fetch vendor details.");
      }
    } catch (error) {
      toast.error("Error fetching vendor details.");
    }
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVendor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateVendor = async () => {
    try {
      const result = await dispatch(
        updateVendor({
          id: selectedVendorId, // This should be set from the vendor selected in the modal
          updatedVendor: updatedVendor, // Updated vendor data from the form
        })
      );
      if (result.type === "admin/updateVendor/fulfilled") {
        toast.success("Vendor updated successfully!");
        dispatch(fetchAllVendors()); 
        setOpenEditModal(false); 
      } else {
        toast.error("Failed to update the vendor.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };
  
   
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const id = params.value;
        const lastSixDigits = id.slice(-6);
        return <span>{`...${lastSixDigits}`}</span>;
      },
    },
    {
      field: "registrationDate",
      headerName: "REG DATE",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => {
        const formattedDate = format(new Date(params.value), "MMM dd, yyyy ");
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "name",
      headerName: "NAME",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "EMAIL",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "PHONE",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title={params.row.isBlocked ? "Inactive" : "Active"}>
            <Switch
              checked={!params.row.isBlocked} // Active if not blocked
              onChange={() =>
                handleStatusToggle(params.row.id, params.row.isBlocked)
              }
              disabled={params.row.isApproved} // Disable toggle if vendor is approved
            />
          </Tooltip>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            paddingTop: "13px",
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* Edit Button with Tooltip */}
          <Tooltip title="Edit">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleVendorEdit(params.row)} // Open edit modal
              style={{ minWidth: "auto", padding: "6px 12px" }}
            >
              <AiOutlineEdit size={16} />
            </Button>
          </Tooltip>

          {/* Delete Button with Tooltip */}
          <Tooltip title="Delete">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDeleteConfirmation(params.row.id)}
              style={{ minWidth: "auto", padding: "6px 12px" }}
            >
              <AiOutlineDelete size={16} />
            </Button>
          </Tooltip>

          {/* Approve Button with Tooltip */}
          {!params.row.isApproved && (
            <Tooltip title="View Vendor Details">
              <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => handleViewVendor(params.row.id)}
                style={{ minWidth: "auto", padding: "6px 12px" }}
              >
                <AiOutlineEye size={16} />
              </Button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const rows = filteredVendors.map((vendor) => ({
    id: vendor._id, 
    registrationDate: vendor.createdAt,
    name: vendor.name,
    email: vendor.email,
    phoneNumber: vendor.phoneNumber,
    isBlocked: vendor.isBlocked,
  }));

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 md:p-8 rounded-md">
          <div className="flex items-center mb-6">
            <i className="fas fa-store text-2xl text-orange-500 mr-2"></i>
            <h1 className="text-2xl font-semibold">Vendors List</h1>
            <span className="ml-2 bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {vendors?.length || 0}
            </span>
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
            </div>
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      <Dialog
        open={openViewModal}
        onClose={handleCloseViewModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle style={{ fontWeight: "bold" }}>Vendor Details</DialogTitle>
        <DialogContent>
          {selectedVendor ? (
            <div>
              {/* Vendor Name and Information */}
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6">
                    Vendor Name: {selectedVendor.name}
                  </Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography variant="body2" color="textSecondary">
                    <strong>Email:</strong> {selectedVendor.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Phone:</strong> {selectedVendor.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Address:</strong> {selectedVendor.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Zip Code:</strong> {selectedVendor.zipCode}
                  </Typography>
                </CardContent>
              </Card>

              {/* Vendor Avatar */}
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6">Vendor Avatar</Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <img
                    src={selectedVendor.avatar?.url}
                    alt="Vendor Avatar"
                    width="100"
                    height="100"
                    style={{ borderRadius: "50%" }}
                  />
                </CardContent>
              </Card>

              {/* Vendor Approval Status */}
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6">Vendor Approval Status</Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography variant="body2">
                    <strong>Approved:</strong>{" "}
                    {selectedVendor.isApproved ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Blocked:</strong>{" "}
                    {selectedVendor.isBlocked ? "Yes" : "No"}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenViewModal(false)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Vendor Modal */}
      <EditProductModal 
        open={openEditModal}
        onClose={handleEditModalClose}
        data={updatedVendor}
        onInputChange={handleInputChange}
        onSave={handleUpdateVendor}
        isVendorEdit={true} // Set true for vendor editing
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this vendor?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteVendor}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllVendorsTable;
