import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("User not logged in.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.warning("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(`/api/users/${user.id}/password`, { password });
      toast.success("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-3">Settings</h3>
      <div className="card p-3">
        <p>Change Password</p>
        <input
          type="password"
          placeholder="New Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="form-control mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handlePasswordUpdate}
          disabled={loading}
          style={{ width: "18%" }}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
