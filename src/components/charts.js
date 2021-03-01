import React from "react";
import { useStoreState } from "easy-peasy";
import { Pie, Column } from "@ant-design/charts";
import { Typography, Row, Col, Card } from "antd";

const { Text } = Typography;

const Charts = () => {
  const gachaLogs = useStoreState((state) => state.model.gachaLogs);
  const totalGachaLogs = gachaLogs.length;
  let sortByCharacterName = {};
  let sortByCharacterNameList = [];
  let sortByWeaponName = {};
  let sortByWeaponNameList = [];
  let rank3 = [];
  let rank4 = [];
  let rank5 = [];
  // sort the data by date first.

  for (const item of gachaLogs) {
    if (item.item_type === "Nhân Vật") {
      if (sortByCharacterName.hasOwnProperty(item.name)) {
        sortByCharacterName[item.name]++;
      } else {
        sortByCharacterName[item.name] = 1;
      }
    } else if (item.item_type === "Vũ Khí") {
      if (sortByWeaponName.hasOwnProperty(item.name)) {
        sortByWeaponName[item.name]++;
      } else {
        sortByWeaponName[item.name] = 1;
      }
    }
    switch (item.rank_type) {
      case "3":
        rank3.push(item);
        break;
      case "4":
        rank4.push(item);
        break;
      case "5":
        rank5.push({
          sales: gachaLogs.length - gachaLogs.indexOf(item),
          type: item.name,
        });
        break;
      default:
        break;
    }
  }

  Object.keys(rank5)
    .reverse()
    .forEach(function (index) {
      let tmpPity = rank5[index].sales;
      if (rank5[index - 1] !== undefined) {
        rank5[index - 1].sales = rank5[index - 1].sales - tmpPity;
      }
    });
  for (const item in sortByCharacterName) {
    sortByCharacterNameList.push({
      type: item,
      sales: sortByCharacterName[item],
    });
  }
  for (const item in sortByWeaponName) {
    sortByWeaponNameList.push({
      type: item,
      sales: sortByWeaponName[item],
    });
  }
  if (gachaLogs.length > 0) {
    return (
      <>
        <Row>
          <Card
            title="Thống Kê"
            hoverable
            // style={{ width: 240 }}
            cover={
              <>
                <img
                  alt="Noelle"
                  src="https://images2.alphacoders.com/110/1109233.jpg"
                  className="image-container"
                />
                <div className="image-centered">
                  Tổng số lượt quay là {totalGachaLogs} - Tương ứng với{" "}
                  {totalGachaLogs * 160} Nguyên Thạch
                </div>
              </>
            }
          ></Card>
        </Row>
        <Row>
          <Col span={12}>
            <Card title="Tỷ lệ rớt đồ">
              <DemoRadar
                rank3={rank3}
                rank4={rank4}
                rank5={rank5}
                totalGachaLogs={totalGachaLogs}
              ></DemoRadar>
            </Card>
          </Col>
          <Col span={12}>
            {" "}
            <Card title="Tỷ lệ nhân vật">
              <ItemRateColumn
                data={sortByCharacterNameList}
                color={"green"}
              ></ItemRateColumn>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {" "}
            <Card title="Tỷ lệ vũ khí">
              <ItemRateColumn
                data={sortByWeaponNameList}
                color={"red"}
              ></ItemRateColumn>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Pity">
              <ItemRateColumn data={rank5} color="yellow"></ItemRateColumn>
            </Card>
          </Col>
        </Row>
      </>
    );
  } else {
    return <></>;
  }
};

const DemoRadar = ({ rank3, rank4, rank5, totalGachaLogs }) => {
  console.log(rank5);
  var data = [
    {
      type: "Tỷ lệ đồ 3 sao",
      value: rank3.length,
    },
    {
      type: "Tỷ lệ đồ 4 sao",
      value: rank4.length,
    },
    {
      type: "Tỷ lệ đồ 5 sao",
      value: rank5.length,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  if (totalGachaLogs > 0) {
    return <Pie {...config} />;
  } else {
    return <></>;
  }
};

const ItemRateColumn = ({ data, color }) => {
  var config = {
    data: data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: "item" },
      sales: { alias: "Số luợng" },
    },
    columnStyle: {
      fill: color,
      fillOpacity: 0.5,
      stroke: "black",
      lineWidth: 1,
      // lineDash: [4, 5],
      strokeOpacity: 0.7,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: "pointer",
    },
  };
  return <Column {...config} />;
};
export default Charts;
