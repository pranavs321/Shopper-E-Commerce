// src/Components/AdminOrders/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import "./AdminOrders.css";

const API_BASE = "http://localhost:4000";

const statusOptions = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("auth-token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(`${API_BASE}/admin/orders`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
      });

      if (res.status === 401 || res.status === 403) {
        setErrorMsg("You must be logged in as admin to view orders.");
        setOrders([]);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.message || "Failed to load orders.");
        setOrders([]);
        return;
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("AdminOrders fetch error:", err);
      setErrorMsg("Server error while loading orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token || "",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to update status");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? data.order : o))
      );
    } catch (err) {
      console.error("Status update error:", err);
      alert("Server error while updating status");
    }
  };

  const renderStatusPill = (status) => (
    <span className={`admin-status-pill admin-status-${status}`}>
      {status}
    </span>
  );

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Orders</h2>
      <div className="admin-card admin-table">
        {errorMsg && <div className="admin-error">{errorMsg}</div>}

        {loading ? (
          <div className="admin-empty">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="admin-empty">No orders found.</div>
        ) : (
          <>
            <div className="admin-table-header admin-orders-grid">
              <span>Order</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            <div className="admin-table-body">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="admin-table-row admin-orders-grid"
                >
                  <div>
                    <div className="admin-bold">#{order._id.slice(-6)}</div>
                    <div className="admin-mono">
                      {order.items?.length || 0} items
                    </div>
                  </div>

                  <div>
                    <div className="admin-bold">
                      {order.userId?.name || "Unknown"}
                    </div>
                    <div className="admin-mono">
                      {order.userId?.email || ""}
                    </div>
                  </div>

                  <div className="admin-mono">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>

                  <div className="admin-bold">
                    ₹{order.totalAmount?.toFixed(2)}
                  </div>

                  <div>
                    {renderStatusPill(order.status)}
                    <div style={{ marginTop: 4 }}>
                      <select
                        className="admin-select"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
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

export default AdminOrders;
