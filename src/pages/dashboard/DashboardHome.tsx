import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  console.log("")

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Please log in to access the dashboard.</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Home</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.firstName}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Information Card */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <div className="px-6 py-4 bg-blue-600">
            <h3 className="text-lg font-semibold text-white">User Information</h3>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Full Name:</span>
                <span className="text-sm text-gray-900">
                  {user.firstName} {user.middleName ? `${user.middleName} ` : ""}{user.lastName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <span className="text-sm text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Role:</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Phone:</span>
                <span className="text-sm text-gray-900">{user.phone || "Not provided"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isVerified ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Member Since:</span>
                <span className="text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Information Card */}
        {user.institution && (
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-4 bg-indigo-600">
              <h3 className="text-lg font-semibold text-white">Institution Information</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 block">Institution Name:</span>
                  <span className="text-lg font-semibold text-gray-900">{user.institution.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block">Code:</span>
                  <span className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                    {user.institution.code}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block">Description:</span>
                  <span className="text-sm text-gray-900">{user.institution.description}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block">Address:</span>
                  <span className="text-sm text-gray-900">{user.institution.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <span className="text-sm text-blue-600 hover:text-blue-800">
                    <a href={`mailto:${user.institution.email}`}>{user.institution.email}</a>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Phone:</span>
                  <span className="text-sm text-gray-900">{user.institution.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Website:</span>
                  <span className="text-sm text-blue-600 hover:text-blue-800">
                    <a href={user.institution.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.institution.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.institution.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Established:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(user.institution.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Account Status</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {user.isActive && user.isVerified ? 'Fully Active' : 'Pending'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">I</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Institution</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {user.institution ? 'Connected' : 'Not Connected'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Role</dt>
                  <dd className="text-lg font-medium text-gray-900 capitalize">{user.role}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;