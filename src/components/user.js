import React, { useState } from "react";
import {
  Layout,
  Menu,
  Space,
  Upload,
  Button,
  Typography,
  Row,
  Col,
} from "antd";
const { Text } = Typography;
const User = ({ userKey }) => {
  if (userKey !== null && userKey !== undefined && userKey !== "") {
    return (
      <Button
        onClick={() => {
          console.log("Helo World!!");
        }}
      >
        Load Your Data
      </Button>
    );
  } else {
    return <>{/* <Text>Failed to load user key from log file</Text> */}</>;
  }
};

export default User;
