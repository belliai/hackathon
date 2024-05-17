import React from "react";

const NewOrder = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2  text-white">
      {/* Left Column */}
      <div className="flex flex-col w-1/3 border-zinc-700 border p-4 rounded-lg">
        <div className="flex flex-col gap-2">
          <span className="py-2 px-4 inline-flex text-sm">Create Booking</span>
          <span className="py-2 px-4 inline-flex text-sm">
            Consignment Details
          </span>
          <span className="py-2 px-4 inline-flex text-sm">Shipper Details</span>
          <span className="py-2 px-4 inline-flex text-sm">Process Rates</span>
          <span className="py-2 px-4 inline-flex text-sm">Activity Log</span>
        </div>
      </div>

      {/* Middle Column */}
      <div className="flex flex-col w-full border-zinc-700 border p-4 rounded-lg text-sm">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Booking Type</label>
            <select className="w-full p-2 bg-gray-700 rounded-lg">
              <option>Select</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Partner Prefix *</label>
            <select className="w-full p-2 bg-gray-700 rounded-lg">
              <option>Select</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">AWB#</label>
            <select className="w-full p-2 bg-gray-700 rounded-lg">
              <option>Select</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Partner Code *</label>
            <select className="w-full p-2 bg-gray-700 rounded-lg">
              <option>Select</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Is Physical</span>
          </div>
          <div className="flex gap-2">
            <button className="py-2 px-4 bg-blue-600 rounded-lg">Search</button>
            <button className="py-2 px-4 bg-blue-600 rounded-lg">Reset</button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      {/* Right Column */}
      <div className="flex flex-col w-1/2 rounded-lg text-sm">
        {/* Amount Due Box */}
        <div className="flex flex-col border-zinc-700 border p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-4">Amount Due</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Booking Code</span>
              <span>AAC0FE</span>
            </div>
            <div className="flex justify-between">
              <span>Booking ID</span>
              <span>IP-4372-1501421737</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between">
              <span>Grand Total</span>
              <span>$20.00</span>
            </div>
          </div>
        </div>

        {/* Balance Box */}
        <div className="flex flex-col border-zinc-700 border p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-4">Balance</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Elroy Carreen</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Individual Balance</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>

        {/* Buttons Box */}
        <div className="flex flex-col rounded-lg">
          <div className="flex flex-col gap-2">
            <button className="py-2 px-4 bg-teal-600 rounded-lg">
              View Invoice
            </button>
            <button className="py-2 px-4 bg-purple-600 rounded-lg">
              Save Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
