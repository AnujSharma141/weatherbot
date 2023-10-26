import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard(props) {
  const [data, setData] = useState({ status: false, value: null, names: null });

  useEffect(() => {
    axios
      .get('https://nest-weather-bot-telegeam.onrender.com/users')
      .then((response) =>
        setData({
          status: true,
          value: Object.keys(response.data),
          names: Object.values(response.data),
        }),
      );
  }, []);

  return (
    <div className="dashboard-layout">
      <div className="nav">
        <div className="nav-user-layout">
          <img
            src={props.user.data.photoURL}
            className="nav-logo"
            alt="logo-light"
            border="0"
          />
          <p className="nav-user">{props.user.data.displayName}</p>
        </div>

        <span
          onClick={() => {
            props.setAuth({ status: false, data: null });
          }}
          className="nav-link"
        >
          logout
        </span>
      </div>
      <div className="dashboard-section">
        <div className="user-list">
          <table className="user-table">
            <tr className="user-table-header">
              <td>id</td>
              <td>name</td>
            </tr>
            {data.status ? (
              data.value.map((item) => (
                <tr className="user-table-row">
                  <td>{item}</td>
                  <td>{data.names[data.value.indexOf(item)].name}</td>
                </tr>
              ))
            ) : (
              <div className="loader-layout">
                <svg
                  className="loader"
                  version="1.1"
                  id="L9"
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enable-background="new 0 0 0 0"
                  space="preserve"
                >
                  <path
                    fill="#000"
                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      dur="1s"
                      from="0 50 50"
                      to="360 50 50"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            )}
          </table>
        </div>

        <div className="dashboard-user">
          <div className="tab">
            <p className="tab-text">subscribed users</p>
            <p className="tab-metric">{data.names ? data.names.length : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
