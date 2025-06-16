import { FaCode, FaBullhorn, FaPalette, FaCheck, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useService } from '../../provider/ServiceProvider';
import axiosInstance from '../../Utils/axios';

const ShowPrice = () => {
  const { services } = useService();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);

  const handleLearnMore = (servicePlans, serviceId, serviceName) => {
    navigate('/pricing', {
      state: {
        plans: servicePlans, // Send all plans for the service
        serviceName, // Service title
        serviceId, // Service ID
      },
    });
  };

  useEffect(() => {
    // Fetch the first plan for the first 3 services
    if (services && services.length >= 3) {
      (async () => {
        try {
          const firstPlanIds = services.slice(0, 3).map((s) => s.plan[0]._id);
          const requests = firstPlanIds.map((id) =>
            axiosInstance.get(`/plans/${id}`)
          );
          const responses = await Promise.all(requests);
          setPlans(responses.map((res) => res.data));
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [services]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-800 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional services tailored to elevate your business to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.length > 0 &&
            services.slice(0, 3).map((service, idx) => (
              <div
                key={service._id}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden`
                 }
              >
                {idx === 1 && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-gray-50 text-center font-semibold py-3">
                    <FaStar className="inline mr-2" />
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="mb-4 flex justify-center">
                      {idx === 0 ? (
                        <FaCode className="text-4xl text-blue-500 mt-5" />
                      ) : idx === 1 ? (
                        <FaBullhorn className="text-4xl text-purple-800 mt-5" />
                      ) : (
                        <FaPalette className="text-4xl text-pink-500 mt-5" />
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {service.title} {/* Display service title */}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      <span className="text-4xl font-semibold">
                        ${plans[idx]?.price} {/* Price from first plan */}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 h-48">
                    {plans[idx]?.features &&
                      plans[idx].features.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLearnMore(
                        service.plan, // Send all plans for the service
                        service._id, // Service ID
                        service.title // Service title
                      );
                    }}
                    className="cursor-pointer w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    View Plans
                  </button>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className="w-full h-full rounded-bl-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPrice;