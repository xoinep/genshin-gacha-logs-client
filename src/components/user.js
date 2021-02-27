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

import { useStoreActions, useStoreState } from "easy-peasy";
const { Text } = Typography;

const User = () => {
  const userKey = useStoreState((state) => state.model.userKey);
  const sendLoadDataRequest = useStoreActions(
    (actions) => actions.model.sendLoadDataRequest
  );
  if (userKey !== null && userKey !== undefined && userKey !== "") {
    return (
      <Button
        onClick={() => {
          sendLoadDataRequest(userKey);
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
