// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserMessages } from '@/redux/slices/messageSlice';

// const Inbox = () => {
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.user);
//   const { messages } = useSelector((state) => state.inbox);

//   useEffect(() => {
//     if (userInfo?._id) {
//       dispatch(fetchUserMessages(userInfo._id));
//     }
//   }, [dispatch, userInfo?._id]);

//   return (
//     <div className="p-4 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Inbox</h2>
//       {messages && messages.length ? (
//         messages.map((message) => (
//           <div key={message._id} className="mb-4 p-4 border rounded-md">
//             <p>{message.content}</p>
//           </div>
//         ))
//       ) : (
//         <p>No messages available.</p>
//       )}
//     </div>
//   );
// };

// export default Inbox;

import React from 'react'

const Inbox = () => {
  return (
    <div>Inbox</div>
  )
}

export default Inbox