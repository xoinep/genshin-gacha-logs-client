import React from "react";
import { useStoreState } from "easy-peasy";
import { Pie, Column } from "@ant-design/charts";
import { Typography, Row, Col, Card } from "antd";

const Charts = () => {
  const gachaLogs = useStoreState((state) => state.model.gachaLogs);
  const totalGachaLogs = gachaLogs.length;
  let itemByRank = {
    5: [],
    4: [],
    3: [],
  };
  let itemByType = {};
  let countPity = 0;
  let itemByName =
    // sort the data by date first.
    Object.keys(gachaLogs)
      .reverse()
      .forEach((item) => {
        countPity += 1;
        switch (gachaLogs[item].rank_type) {
          case "5":
            itemByRank[5].push({
              key: gachaLogs[item].name,
              value: countPity,
            });
            countPity = 0;
            break;
          case "4":
            itemByRank[4].push({
              index: item,
              value: gachaLogs[item],
            });
            break;
          case "3":
            itemByRank[3].push({
              index: item,
              value: gachaLogs[item],
            });
            break;
          default:
            break;
        }
        if (itemByType.hasOwnProperty(gachaLogs[item].item_type)) {
          itemByType[gachaLogs[item].item_type].push(gachaLogs[item]);
        } else {
          itemByType[gachaLogs[item].item_type] = [];
          itemByType[gachaLogs[item].item_type].push(gachaLogs[item]);
        }
      });

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
                itemByRank={itemByRank}
                totalGachaLogs={totalGachaLogs}
              ></DemoRadar>
            </Card>
          </Col>
          <Col span={12}>
            {" "}
            <Card title="Số lượng vũ khí mỗi loại">
              <ItemRateColumn
                data={itemByType[Object.keys(itemByType)[0]]}
                color={"green"}
              ></ItemRateColumn>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {" "}
            <Card title="Số lượng nhân vật mỗi loại">
              <ItemRateColumn
                data={itemByType[Object.keys(itemByType)[1]]}
                color={"red"}
              ></ItemRateColumn>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Số lần quay để có được nhân vật 5 sao">
              <ItemRateColumn
                data={itemByRank[5]}
                color="yellow"
                needModify={false}
              ></ItemRateColumn>
            </Card>
          </Col>
        </Row>
      </>
    );
  } else {
    return <></>;
  }
};

const DemoRadar = ({ itemByRank, totalGachaLogs }) => {
  var data = [
    {
      type: "Tỷ lệ đồ 3 sao",
      value: itemByRank[3].length,
    },
    {
      type: "Tỷ lệ đồ 4 sao",
      value: itemByRank[4].length,
    },
    {
      type: "Tỷ lệ đồ 5 sao",
      value: itemByRank[5].length,
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

const ItemRateColumn = ({ data, color, needModify = true }) => {
  let finalData = [];
  if (needModify) {
    let tmp = {};

    data.forEach((item) => {
      tmp[item.name] = (tmp[item.name] || 0) + 1;
    });

    Object.keys(tmp).forEach((key) => {
      finalData.push({
        key: key,
        value: tmp[key],
      });
    });
  } else {
    finalData = data;
  }

  var config = {
    data: finalData,
    xField: "key",
    yField: "value",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      key: { alias: "item" },
      value: { alias: needModify ? "Số luợng" : "Số lần" },
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
