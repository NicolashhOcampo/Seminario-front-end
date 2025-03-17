import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <img
        className="w-16 h-16 rounded-full object-cover"
        src="https://via.placeholder.com/150"
        alt="Profile"
      />
      <div>
        <h2 className="text-lg font-semibold">Alexa Rawles</h2>
        <p className="text-sm text-gray-500">alexarawles@gmail.com</p>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border rounded-md text-gray-700 bg-gray-100"
      />
    </div>
  );
};

const ProfileForm = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <InputField label="Full Name" placeholder="Your First Name" />
      <InputField label="Nick Name" placeholder="Your First Name" />
      <InputField label="Gender" placeholder="Your First Name" />
      <InputField label="Country" placeholder="Your First Name" />
      <InputField label="Language" placeholder="Your First Name" />
      <InputField label="Time Zone" placeholder="Your First Name" />
    </div>
  );
};

const EmailList = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700">My email Address</h3>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-blue-500">📧</span>
        <p className="text-sm text-gray-700">alexarawles@gmail.com</p>
        <span className="text-gray-500 text-xs">1 month ago</span>
      </div>
      <button className="mt-2 text-blue-500 text-sm">+ Add Email Address</button>
    </div>
  );
};

const EditButton = () => {
  return (
    <button className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
  );
};

const Profile = () => {
  return (
    <div className="mt-20 max-w-2xl mx-auto bg-white shadow-md rounded-lg relative">
      <EditButton />
      <ProfileCard />
      <ProfileForm />
      <EmailList />
    </div>
  );
};

export default Profile;