import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm(parsed);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/users/${user._id}`, form);
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h3>My Profile</h3>

      <div className="card p-3">
        <div className="mb-2">
          <strong>Name:</strong>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            user.name
          )}
        </div>

        <div className="mb-2">
          <strong>Email:</strong>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          ) : (
            user.email
          )}
        </div>

        <div className="mb-2">
          <strong>Phone:</strong>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          ) : (
            user.phone
          )}
        </div>

        <div className="mb-2">
          <strong>Enrolled Course:</strong>{" "}
          {editing ? (
            <input
              className="form-control"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />
          ) : (
            user.course
          )}
        </div>

        {editing ? (
          <div>
            <button className="btn btn-success me-2" onClick={handleUpdate}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
