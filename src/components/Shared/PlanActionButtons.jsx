import { XCircle, CheckCircle } from "lucide-react";

export const PlanActionButtons = ({ planId, updatingPlan, onStatusChange }) => {
  const isUpdating = updatingPlan === planId;

  return (
    <div className="flex gap-3 sm:justify-end">
      <button
        onClick={() => onStatusChange(planId, "rejected")}
        disabled={isUpdating}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        Reject
      </button>
      <button
        onClick={() => onStatusChange(planId, "approved")}
        disabled={isUpdating}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        Approve
      </button>
    </div>
  );
};
