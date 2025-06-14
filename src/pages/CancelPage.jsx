import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-50">
      <MdCancel className="text-red-500 text-7xl mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">
        Your payment process was not completed. If this was a mistake, please try again.
      </p>
      <Link
        to="/service"
        className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition duration-200"
      >
        Go Back to Services
      </Link>
    </div>
  );
};

export default CancelPage;
