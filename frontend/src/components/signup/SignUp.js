import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser } from '@/redux/slices/userSlice';

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo, success, error } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(userInfo?.msg);
      router.push('/');
    }
    if (error) {
      toast.error(error);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [success, error, router, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    if (!name || !email || !password || !avatar) {
      toast.error('All fields must be filled');
    } else {
      dispatch(registerUser({ name, email, avatar, password }));
    }

    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setAvatar(null);
    }
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign in
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with Google
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <a
            href="#"
            className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.3525 10.9875 25.5808 12.2317L30.0867 7.89667C27.7717 5.7175 24.3558 4 20 4C10.7883 4 3.33334 10.795 3.33334 20C3.33334 29.205 10.795 36.6667 20 36.6667C29.205 36.6667 36.6667 29.205 36.6667 20C36.6667 18.9717 36.5642 17.9642 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.5458L10.0991 15.97C11.4808 12.4675 15.3775 9.99999 20 9.99999C22.5492 9.99999 24.3525 10.9875 25.5808 12.2317L30.0867 7.89667C27.7717 5.7175 24.3558 4 20 4C13.7475 4 8.34166 7.55916 5.25497 12.5458Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.2675 36.6667 27.9967 35.09 30.3333 32.4133L25.775 28.4442C24.5858 29.405 23.1558 30.0358 20 30.0358C15.6675 30.0358 11.9983 27.2658 10.625 23.4125L5.20834 26.9933C8.25084 32.1942 13.625 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7525 25.2783 27.585 27.0033 25.9967 28.2267C25.9967 28.2267 25.9967 28.2267 25.9967 28.2267L25.775 28.4442L30.3333 32.4133C29.9967 32.7492 36.6667 28.3333 36.6667 20C36.6667 18.9717 36.5642 17.9642 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span className="mx-2">Sign in with Google</span>
          </a>

          <div className="mt-6 text-center">
            <Link href="/login" legacyBehavior>
              <a className="text-sm text-blue-600 hover:text-blue-500">
                Already have an account? Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
