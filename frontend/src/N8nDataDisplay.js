// src/N8nDataDisplay.js

import React, { useState, useEffect } from "react";
import axios from "axios";

// Node.js બેકએન્ડનો URL જ્યાંથી ડેટા મેળવવાનો છે
const API_URL = "https://logifly.app.n8n.cloud/webhook-test/add-website";

const N8nDataDisplay = ({ user }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // જો યુઝર લોગ ઇન હોય તો જ ડેટા ફેચ કરો
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // user prop માં ફેરફાર થાય ત્યારે ફરીથી ચલાવો

  // જો યુઝર લોગ ઇન ન હોય તો કંઈપણ પ્રદર્શિત કરશો નહીં
  if (!user) {
    return null;
  }

  if (loading) {
    return <div>ડેટા લોડ થઈ રહ્યો છે...</div>;
  }

  if (error) {
    return <div>ડેટા મેળવવામાં ભૂલ: {error.message}</div>;
  }

  // જો ડેટા મળ્યો હોય અને તેમાં data પ્રોપર્ટી હોય
  if (data && data.data) {
    return (
      <div>
        <h1>n8n માંથી મળેલ ડેટા</h1>
        <p>{data.message}</p>
        <h2>વેબસાઇટ્સ</h2>
        <ul>
          {data.data.map((item, index) => (
            <li key={index}>
              <strong>ID:</strong> {item.id}, <strong>નામ:</strong> {item.name}, <strong>URL:</strong> {item.url}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // જો કોઈ ડેટા ઉપલબ્ધ ન હોય
  return <div>કોઈ ડેટા ઉપલબ્ધ નથી.</div>;
};

export default N8nDataDisplay;
