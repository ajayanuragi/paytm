export const UserDropdown = ({ user, onClose, onLogout, onEditProfile }) => {
  return (
    <div className="absolute right-0 top-8 w-48 md:w-64 md:top-20 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex justify-between">
          <div>
            <p className="text-sm md:text-lg font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs md:text-sm text-gray-500">@{user?.username}</p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 text-xl"
            onClick={onClose}
            aria-label="Close dropdown"
          >
            &times;
          </button>
        </div>
      </div>
      <button
        className="block w-full text-left px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        onClick={onEditProfile}
      >
        Edit Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};
