import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { List, Button, Table } from "antd";
const Wish = () => {
  const orderedGachaTypes = useStoreState(
    (state) => state.model.orderedGachaTypes
  );
  const getGachaLogs = useStoreActions((actions) => actions.model.getGachaLogs);
  const gachaLogs = useStoreState((state) => state.model.gachaLogs);
  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        itemLayout="vertical"
        dataSource={orderedGachaTypes}
        renderItem={(item) => (
          <List.Item>
            <Button
              onClick={() => {
                getGachaLogs(item.key);
              }}
            >
              {item.name}
            </Button>
          </List.Item>
        )}
      />
      <RenderTableResult gachaLogs={gachaLogs}></RenderTableResult>
    </>
  );
};

const RenderTableResult = ({ gachaLogs }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Gacha types",
      dataIndex: "gacha_type",
      key: "gacha_type",
    },
    {
      title: "Item Id",
      dataIndex: "item_id",
      key: "item_id",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item Type",
      dataIndex: "item_type",
      key: "item_type",
    },
    {
      title: "Rank Type",
      dataIndex: "rank_type",
      key: "rank_type",
    },
  ];
  if (gachaLogs.length > 0) {
    return <Table dataSource={gachaLogs} columns={columns} />;
  } else {
    return <></>;
  }
};
export default Wish;
