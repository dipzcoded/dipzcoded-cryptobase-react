import { Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Typography.Title
        level={5}
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        CryptoBase <br /> All rights reserved
      </Typography.Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">news</Link>
      </Space>
    </div>
  );
}

export default Footer;
