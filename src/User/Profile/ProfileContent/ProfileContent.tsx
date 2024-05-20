import React from "react";
import bcrypt from "bcryptjs";

interface ProfileState {
  _id: string;
  name: string;
  email: string;
  password: string; // This will be the current password the user enters
  newPassword: string;
  confirmNewPassword: string;
  loading: boolean;
  error: string | null;
}

class ProfileContent extends React.Component<{}, ProfileState> {
  constructor(props: {}) {
    super(props);
    const defaultProfile: ProfileState = {
      _id: "",
      name: "",
      email: "",
      password: "", // Initialize as empty
      newPassword: "",
      confirmNewPassword: "",
      loading: false,
      error: null,
    };
    const profile = JSON.parse(
      window.localStorage.getItem("profile") || "null"
    );
    this.state =
      profile !== null ? { ...profile, password: "" } : defaultProfile; // Ensure password is not pre-filled
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { _id, password, newPassword, confirmNewPassword } = this.state;

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau hay không
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      // Mã hóa mật khẩu mới
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      const updatedProfile = {
        ...this.state,
        password: hashedPassword, // Sử dụng mật khẩu đã mã hóa
      };

      const response = await fetch(
        `https://melanine-backend.onrender.com/api/user/update-user/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  handleLogout = async () => {
    try {
      const response = await fetch("https://melanine-backend.onrender.com/api/user/log-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("profile");
        window.location.href = "/login"; // Redirect to login page
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out.");
    }
  };

  render() {
    const { name, email, password, newPassword, confirmNewPassword } =
      this.state;

    return (
      <div className="mt-24">
        <h1 className="text-black text-m font-bold text-right mr-5 mb-20">
          Welcome! <span className="text-pinky-600">{name}</span>
        </h1>

        <div className="manage-profile flex flex-row w-[80%] mx-auto justify-between items-start gap-12 mb-24">
          <div className="basis-1/4 flex flex-col w-full h-full ">
            <div className="mb-5">
              <p className="text-black font-semibold">Manage Account</p>
              <ul className="text-slate-400 ml-8 my-2">
                <li className="mb-2 text-pinky-600">My Profile</li>
                <li className="mb-2">Address Book</li>
                <li className="">My Payment Options</li>
              </ul>
            </div>

            <div className="mb-5">
              <p className="text-black font-semibold">My Orders</p>
              <ul className="text-slate-400 ml-8 my-2">
                <li className="mb-2">My Returns</li>
                <li className="">My Cancellations</li>
              </ul>
            </div>

            <div className="">
              <p className="text-black font-semibold">My wishlist</p>
            </div>

            {/* Add Logout Button */}
            <div className="mt-5">
              <button
                onClick={this.handleLogout}
                className="py-2 px-4 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="basis-3/4 flex flex-col h-full shadow-md px-5 py-3">
            <p className="text-pinky-600 text-xl font-semibold">
              Edit Your Profile
            </p>

            <form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  className="mt-1 pl-3 text-slate-600 block w-full rounded-md bg-slate-200 h-10 border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="mt-1 pl-3 text-slate-600 block w-full rounded-md bg-slate-200 h-10 border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="Email"
                />
              </div>

              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Password Changes
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="mt-1 pl-3 text-slate-600 block w-full rounded-md bg-slate-200 h-10 border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="Current Password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleChange}
                  className="mt-1 pl-3 text-slate-600 block w-full rounded-md bg-slate-200 h-10 border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="New Password"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={this.handleChange}
                  className="mt-1 pl-3 text-slate-600 block w-full rounded-md bg-slate-200 h-10 border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-red-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContent;
