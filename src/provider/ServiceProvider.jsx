import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axios";

const ServiceContext = createContext();
export const useService = () => useContext(ServiceContext);

const ServiceProvider = ({ children }) => {
  // State
  const [services, setServices] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==== SERVICE CRUD ====
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (data) => {
    try {
      const res = await axiosInstance.post("/services/create", data);
      setServices((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Failed to create service", err);
      throw err;
    }
  };

  const updateService = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/services/${id}`, data);
      setServices((prev) => prev.map((s) => (s._id === id ? res.data : s)));
      return res.data;
    } catch (err) {
      console.error("Failed to update service", err);
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      await axiosInstance.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  // ==== PLAN CRUD ====
  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    }
  };

  const createPlan = async (data) => {
    try {
      const res = await axiosInstance.post("/plans", data);
      setPlans((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Failed to create plan", err);
      throw err;
    }
  };

  const updatePlan = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/plans/${id}`, data);
      setPlans((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error("Failed to update plan", err);
      throw err;
    }
  };

  const deletePlan = async (id) => {
    try {
      await axiosInstance.delete(`/plans/${id}`);
      setPlans((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete plan", err);
    }
  };
  const createCustomPlan = async (userId, data) => {
    try {
      const res = await axiosInstance.post(`/custom-plans/${userId}`, data);
      setPlans((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Failed to create custom plan", err);
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchServices();
    fetchPlans();
  }, []);

  const serviceInfo = {
    services,
    plans,
    loading,
    createService,
    updateService,
    deleteService,
    fetchServices,
    createPlan,
    updatePlan,
    deletePlan,
    fetchPlans,
    createCustomPlan,
  };

  return (
    <ServiceContext.Provider value={serviceInfo}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
