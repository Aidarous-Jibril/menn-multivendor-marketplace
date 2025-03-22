// Third-party library imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

// Local imports
import { getUserAllOrders } from '@/redux/slices/orderSlice';
import Loader from '../vendor/layout/Loader';


const OrdersRefund = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  
  const [isClient, setIsClient] = useState(false); // Ensure SSR compatibility

  useEffect(() => {
    setIsClient(true);

    if (!userInfo || !userInfo.email) {
      Router.push("/user/login"); 
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?._id) {
      // dispatch(getUserAllOrders(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

 if (!isClient || !userInfo || !userInfo.email) {
    return <Loader />;
  }

  const eligibleRefunds = orders.filter((order) => order.status === 'Processing refund');

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130, flex: 0.7,
      cellClassName: (params) => (params.row.status === 'Delivered' ? 'greenColor' : 'redColor'),
    },
    { field: 'itemsQty', headerName: 'Items Qty', type: 'number', minWidth: 130, flex: 0.7 },
    { field: 'total', headerName: 'Total', type: 'number', minWidth: 130, flex: 0.8 },
    {
      field: 'action',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => (
        <Link href={`/user/orders/track/${params.id}`}>
          <a className="inline-block px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <AiOutlineArrowRight size={20} />
          </a>
        </Link>
      ),
    },
  ];

  const rows = eligibleRefunds.map((order) => ({
    id: order._id,
    itemsQty: order.cart.length,
    total: `US$ ${order.totalPrice}`,
    status: order.status,
  }));

  return (
    <div className="pl-8 pt-1 flex w-full">
      <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
    </div>
  );
};

export default OrdersRefund;
