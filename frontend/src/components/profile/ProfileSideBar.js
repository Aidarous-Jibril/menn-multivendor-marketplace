import { RxPerson } from 'react-icons/rx';
import { AiOutlineMessage, AiOutlineLogout } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RiLockPasswordLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/slices/userSlice';


const ProfileSideBar = ({ active, setActive }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const logoutHandler = () => {
        dispatch(logoutUser());
        toast.success('User logged out');
        router.push('/'); 
    };

    return (
        <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
            <Link href="/user/profile" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 1 ? 'text-[red]' : ''}`} onClick={() => setActive(1)}>
                    <RxPerson size={20} color={active === 1 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Profile</span>
                </a>
            </Link>
            <Link href="/user/orders" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 2 ? 'text-[red]' : ''}`} onClick={() => setActive(2)}>
                    <HiOutlineShoppingBag size={20} color={active === 2 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Orders</span>
                </a>
            </Link>
            <Link href="/user/orders/track-order" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 3 ? 'text-[red]' : ''}`} onClick={() => setActive(3)}>
                    <MdOutlineTrackChanges size={20} color={active === 3 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Track Order</span>
                </a>
            </Link>
            <Link href="/user/orders/refund-orders" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 4 ? 'text-[red]' : ''}`} onClick={() => setActive(4)}>
                    <HiOutlineReceiptRefund size={20} color={active === 4 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Refunds</span>
                </a>
            </Link>
            <Link href="/user/inbox" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 5 ? 'text-[red]' : ''}`} onClick={() => setActive(5)}>
                    <AiOutlineMessage size={20} color={active === 5 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Inbox</span>
                </a>
            </Link>
            <Link href="/user/change-password" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 6 ? 'text-[red]' : ''}`} onClick={() => setActive(6)}>
                    <RiLockPasswordLine size={20} color={active === 6 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Change Password</span>
                </a>
            </Link>
            <Link href="/user/address" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 7 ? 'text-[red]' : ''}`} onClick={() => setActive(7)}>
                    <TbAddressBook size={20} color={active === 7 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Address</span>
                </a>
            </Link>
            <Link href="/user/payment-method" legacyBehavior>
                <a className={`flex items-center cursor-pointer w-full mb-8 ${active === 8 ? 'text-[red]' : ''}`} onClick={() => setActive(8)}>
                    <MdPayment size={20} color={active === 8 ? 'red' : ''} />
                    <span className="pl-3 hidden md:block">Payment Method</span>
                </a>
            </Link>
            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(9) || logoutHandler()} >
                <AiOutlineLogout size={20} color={active === 9 ? 'red' : ''} />
                <span className={`pl-3 hidden md:block ${active === 9 ? 'text-[red]' : ''}`}>Logout</span>
            </div>
        </div>
    );
};

export default ProfileSideBar;
