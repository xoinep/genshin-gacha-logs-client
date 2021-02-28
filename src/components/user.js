import React from "react";
import { Button } from "antd";

import { useStoreActions, useStoreState } from "easy-peasy";

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
