import React, { useEffect, useState } from "react";
import "./CSS/Orders.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/orders", {
          headers: {
            "auth-token": token,
          },
        });
        const data = await res.json();
        if (!data.success) {
          setMsg(data.message || "Failed to load orders.");
        } else {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error("Orders error", err);
        setMsg("Network error.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="orders-page">
      <div className="orders-wrapper">
        <h2>My Orders</h2>

        {loading && <p>Loading orders...</p>}
        {!loading && msg && <p className="orders-msg">{msg}</p>}

        {!loading && !msg && orders.length === 0 && (
          <p>You have not placed any orders yet.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-label">Order ID</span>
                    <span className="order-value">{order._id}</span>
                  </div>
                  <div>
                    <span className="order-label">Placed on</span>
                    <span className="order-value">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="order-label">Status</span>
                    <span className={`order-status order-status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <span className="order-label">Total</span>
                    <span className="order-value">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <div>
                        <strong>{item.name}</strong>
                        <div className="order-item-meta">
                          Product ID: {item.productId}
                        </div>
                      </div>
                      <div className="order-item-price">
                        <span>₹{item.price}</span>
                        <span>Qty: {item.quantity}</span>
                        <span className="order-item-total">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-address">
                    Shipping Address: {order.shippingAddress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
