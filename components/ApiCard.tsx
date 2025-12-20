import React from "react";
import { ApiEndpoint } from "../types/api";
import { CheckCircle, Clock, AlertCircle, Key, Shield } from "lucide-react";

interface ApiCardProps {
  api: ApiEndpoint;
}

const ApiCard: React.FC<ApiCardProps> = ({ api }) => {
  const getStatusIcon = () => {
    switch (api.status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "development":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "deprecated":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (api.status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "development":
        return "bg-yellow-100 text-yellow-800";
      case "deprecated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodColor = () => {
    switch (api.method) {
      case "GET":
        return "bg-green-100 text-green-800 border-green-300";
      case "POST":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "PUT":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "DELETE":
        return "bg-red-100 text-red-800 border-red-300";
      case "PATCH":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{api.name}</h3>
          <p className="text-gray-600 mt-1">{api.description}</p>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
        >
          {getStatusIcon()}
          <span>
            {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-md border ${getMethodColor()} font-mono font-bold`}
          >
            {api.method}
          </span>
          <code className="bg-gray-100 px-3 py-1 rounded-md font-mono text-sm flex-1 truncate">
            {api.endpoint}
          </code>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Category</span>
          <span className="text-gray-900 font-semibold">{api.category}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Rate Limit</span>
          <span className="text-gray-900 font-semibold">{api.rateLimit}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Version</span>
          <span className="text-gray-900 font-semibold">{api.version}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Authentication</span>
          <div className="flex items-center gap-1">
            {api.requiresAuth ? (
              <>
                <Key className="h-4 w-4 text-red-500" />
                <span className="text-gray-900 font-semibold">Required</span>
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-gray-900 font-semibold">
                  Not Required
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Last updated: {api.lastUpdated}</span>
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;
