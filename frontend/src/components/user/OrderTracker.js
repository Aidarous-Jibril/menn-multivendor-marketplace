// Third-party library imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { MdTrackChanges } from 'react-icons/md';
import Button from '@mui/material/Button';

// Local imports
import { getUserAllOrders } from '@/redux/slices/orderSlice';


const OrderTracker = ({ active }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getUserAllOrders(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.row.status === 'Delivered' ? 'greenColor' : 'redColor',
      headerClassName: 'custom-header',
    },
    { field: 'itemsQty', headerName: 'Items Qty', type: 'number', minWidth: 130, flex: 0.7 },
    { field: 'total', headerName: 'Total', type: 'number', minWidth: 130, flex: 0.8 },
    {
      field: 'actions',
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => (
        <Link href={`/user/orders/track/${params.id}`}>
          <Button>
            <MdTrackChanges size={20} />
          </Button>
        </Link>
      ),
      flex: 1,
      minWidth: 150,
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    itemsQty: order.cart.length,
    total: `US$ ${order.totalPrice}`,
    status: order.status,
  }));

  return (
    <div className="pl-8 pt-1 flex">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default OrderTracker;
