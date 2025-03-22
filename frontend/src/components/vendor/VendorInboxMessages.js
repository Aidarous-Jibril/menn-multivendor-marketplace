import React from "react";

const VendorInboxMessages = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Chatting List</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-bold">Devid Jack</p>
                <p className="text-sm text-gray-500">1 year ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              <div>
                <p className="font-bold">fatema subarna</p>
                <p className="text-sm text-gray-500">2 years ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Devid Jack</p>
            <p className="text-sm text-gray-500">8********</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            <div className="bg-gray-200 p-3 rounded-md max-w-md">
              <p className="text-sm">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters...
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 self-end">
            <div className="bg-blue-500 text-white p-3 rounded-md max-w-md ml-auto">
              <p className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text...
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t flex items-center space-x-3">
          <button className="w-10 h-10 bg-gray-300 rounded-full"></button>
          <button className="w-10 h-10 bg-gray-300 rounded-full"></button>
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button className="w-10 h-10 bg-blue-500 text-white rounded-full">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorInboxMessages;
