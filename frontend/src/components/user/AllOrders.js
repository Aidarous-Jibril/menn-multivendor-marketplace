// Third-party library imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

// Local imports (Redux slices)
import { getUserAllOrders } from '@/redux/slices/orderSlice';
import { setOrderItems } from '@/redux/slices/checkoutSlice';


const AllOrders = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo._id && !isLoading) {
      dispatch(getUserAllOrders(userInfo._id));
      dispatch(setOrderItems([]));
    }    
  }, [dispatch, userInfo]);

  const mockOrders = orders.length === 0 ? [] : orders;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress color="primary" />
      </div>
    );
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const id = params.value;
        const lastSixDigits = id.slice(-6); return <span>{`...${lastSixDigits}`}</span>;  
      },
    },
    {
      field: 'date',
      headerName: 'DATE',
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        // Format the date directly here using date-fns
        const formattedDate = format(new Date(params.value), 'MMM dd, yyyy HH:mm:ss');
        return <span>{formattedDate}</span>;
      },
    },    
    { field: 'total', headerName: 'TOTAL', minWidth: 130, flex: 0.7 },
    {
      field: 'paid',
      headerName: 'PAID',
      minWidth: 100,
      flex: 0.6,
      renderCell: (params) =>
        params.value ? (
          <span className="text-green-500 font-bold">Yes</span>
        ) : (
          <span className="text-red-500 font-bold">No</span>
        ),
    },
    {
      field: 'status',
      headerName: 'STATUS',
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => {
        const status = params.value;
  
        let statusColor;
        switch (status) {
          case 'processing':
            statusColor = 'text-yellow-500';
            break;
          case 'shipped':
            statusColor = 'text-blue-500';
            break;
          case 'delivered':
            statusColor = 'text-green-500';
            break;
          case 'cancelled':
            statusColor = 'text-red-500';
            break;
          default:
            statusColor = 'text-gray-500';
        }
  
        return <span className={`${statusColor} font-bold`}>{status}</span>;
      },
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Link href={`/user/orders/${params.row.id}`} passHref>
          <Button variant="contained" color="primary" size="small">
            Details
          </Button>
        </Link>
      ),
    },
  ];

  const rows = mockOrders.map((order) => ({
    id: order._id || Math.random().toString(36).substring(2, 9), // Use a fallback id if _id is missing
    date: order.createdAt,
    total: order.totalPrice && typeof order.totalPrice === 'number' ? `US$ ${order.totalPrice.toFixed(2)}` : 'US$ 0.00', // Fallback for missing totalPrice
    paid: order.isPaid,
    status: order.status,  
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
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
      {/* Snackbar for error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error?.message || 'An unexpected error occurred.'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllOrders;
