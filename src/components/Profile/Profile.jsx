import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import config from "@/config/app.config";

const InputField = ({ name, value, label, placeholder, edit, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={`p-2 border rounded-md text-gray-900 ${
          edit ? "bg-white" : "bg-gray-100"
        }`}
        readOnly={!edit}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

const Profile = ({ user }) => {
  if (!user) {
    return <Spinner />;
  }

  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    nickName: user.nickName || "",
    country: user.country || "",
  });
  const { fetchUser } = useUser();

  // Manejar cambios en los inputs
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user.id);

    try {
      const res = await fetch(`${config.urlHost}/api/users/avatar/${user.id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error uploading avatar");

      await fetchUser();
      
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  // Guardar cambios en el backend
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${config.urlHost}/api/users/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...formData }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const data = await response.json();
      const newUser = data.message;

      console.log("New User: ", newUser);

      fetchUser();
      setEdit(false);

      router.push(`/profile/${formData.nickName}`);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto bg-white shadow-md rounded-lg relative">
      {/* Edit Button */}
      <button
        onClick={() => {edit ? handleSaveChanges() : setEdit(true)
          console.log('valor del edit', edit)
        }}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 z-20"
        title="Edit Profile"
      >
        {edit ? "Save Changes" : "Edit"}
      </button>

      {/* Profile Card */}
      <div className="rounded-lg flex items-center space-x-4 p-4 relative">
        <div className="relative w-24 h-24 rounded-full group">
          <img
            className="w-full h-full rounded-full object-cover"
            src={`${config.urlHost}/public/images/users/${user.avatar}`}
            alt="Profile"
          />

          {/* Overlay + input file */}
          <label className="absolute inset-0 bg-black bg-opacity-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity cursor-pointer text-white text-sm">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {formData.nickName || "Usuario"}
          </h2>
          <p className="text-sm text-gray-500">{formData.email || "Email"}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <InputField
          name="firstName"
          value={formData.firstName}
          label="First Name"
          placeholder="Your First Name"
          edit={edit}
          onChange={handleInputChange}
        />
        <InputField
          name="lastName"
          value={formData.lastName}
          label="Last Name"
          placeholder="Your Last Name"
          edit={edit}
          onChange={handleInputChange}
        />
        <InputField
          name="nickName"
          value={formData.nickName}
          label="Nick Name"
          placeholder="Your Nick Name"
          edit={edit}
          onChange={handleInputChange}
        />
        <InputField
          name="country"
          value={formData.country}
          label="Country"
          placeholder="Your Country"
          edit={edit}
          onChange={handleInputChange}
        />
      </div>

      {/* Email Card */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">My email Address</h3>
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-sm text-gray-600">{formData.email || "Email"}</p>
        </div>
        <button className="flex items-center space-x-4 cursor-pointer mt-2 text-blue-500 text-sm hover:text-blue-700">
          <PencilSquareIcon className="size-4" />
          Change Email Address
        </button>
      </div>
    </div>
  );
};

export default Profile;
