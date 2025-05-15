import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";

export const EditProfile = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {};
      if (formData.firstName.trim())
        payload.firstName = formData.firstName.trim();
      if (formData.lastName.trim()) payload.lastName = formData.lastName.trim();
      if (formData.password) payload.password = formData.password;
      if (Object.keys(payload).length === 0) {
        throw new Error("Please enter at least one field to update");
      }

      const response = await api.put("/user/", payload);
      setSuccessMessage(
        response.data.message || "Profile updated successfully!"
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className=" flex justify-between items-center">
        <h2 className="text-3xl">Edit Profile</h2>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm"
        onClick={()=>{
          navigate(-1)
        }}>Cancel</button>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {successMessage && (
        <div className="mb-4 text-green-600 bg-green-100 p-2 rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className=" mt-4 mb-4">
          <label htmlFor="" className="block text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Leave blank to keep current"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Leave blank to keep current"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Leave blank to keep current"
          />
          {formData.password &&
            formData.password.length > 0 &&
            formData.password.length < 6 && (
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-4 px-4 rounded-md disabled:opacity-5 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
        
      </form>
    </div>
  );
};
