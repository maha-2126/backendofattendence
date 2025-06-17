const axios = require('axios');

const { getConnectedWifiMac, getLocalDeviceMac  } = require('../utils/macUtils');

// const API_BASE_URL = process.env.API_BASE_URL || 'https://attendance-server-7.onrender.com/api';

const triggerCheckIn = async (req, res) => {
  try {
      const wifiMac = getConnectedWifiMac();
      const deviceMac = getLocalDeviceMac();
      const token = req.body.token;
  
      console.log("👉 wifiMac:", wifiMac);
      console.log("👉 deviceMac:", deviceMac);
      console.log("👉 token:", token);

      const response = await axios.post(`http://localhost:5000/attendance/checkin`, {
        wifiMac,
        deviceMac
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      res.json(response.data);
    } catch (err) {
      console.error("❌ Agent Failed:", err.message);
      if (err.response) {
        console.error("👉 Backend Error:", err.response.status, err.response.data);
      }
      res.status(500).json({ message: err.response?.data?.message || "Agent Error" });
    }
};

module.exports = { triggerCheckIn };