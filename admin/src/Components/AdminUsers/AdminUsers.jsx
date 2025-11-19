// src/Components/AdminUsers/AdminUsers.jsx
import React, { useEffect, useState } from "react";
// ✅ go up one level, then into AdminOrders
import "../AdminOrders/AdminOrders.css";
import "./AdminUsers.css";

const API_BASE = "http://localhost:4000";

const roleOptions = ["customer", "seller", "admin"];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("auth-token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
      });

      if (res.status === 401 || res.status === 403) {
        setErrorMsg("You must be logged in as admin to view users.");
        setUsers([]);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.message || "Failed to load users.");
        setUsers([]);
        return;
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("AdminUsers fetch error:", err);
      setErrorMsg("Server error while loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (for later) real API call when you add /admin/users/:id/role
  const handleRoleChange = async (userId, newRole) => {
    alert(
      `Role change to "${newRole}" pressed for user ${userId}.\n` +
        "Hook this to /admin/users/:userId/role in backend later."
    );

    // temporary UI update
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Users</h2>
      <div className="admin-card admin-table">
        {errorMsg && <div className="admin-error">{errorMsg}</div>}

        {loading ? (
          <div className="admin-empty">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <>
            <div className="admin-table-header admin-users-grid">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Change Role</span>
            </div>

            <div className="admin-table-body">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="admin-table-row admin-users-grid"
                >
                  <div className="admin-bold">{user.name}</div>

                  <div className="admin-muted-email">{user.email}</div>

                  <div className="admin-bold">{user.role}</div>

                  <div>
                    <select
                      className="admin-select"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
