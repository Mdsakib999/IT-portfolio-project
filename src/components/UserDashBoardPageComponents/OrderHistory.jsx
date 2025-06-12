import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

export const OrderHistory = () => {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState([]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-serif text-center sm:text-left">
        Order History
      </h2>

      {/* Grid responsive for different screen sizes */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 font-serif"></div>

      {/* Empty state */}
      {allOrders?.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-sm sm:text-base">No orders found</p>
        </div>
      )}
    </div>
  );
};
