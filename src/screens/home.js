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
  Divider,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Introduction from "./intro";
import User from "../components/user";
import { useStoreState, useStoreActions } from "easy-peasy";
import Wish from "../screens/wish";
import DemoRadar from "../components/charts";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const HomeScreen = () => {
  // const [userKey, setUserKey] = useState("");
  const userKey = useStoreState((state) => state.model.userKey);
  const setUserKey = useStoreActions((actions) => actions.model.setUserKey);
  const loading = useStoreState((state) => state.model.loading);
  return (
    <Spin spinning={loading}>
      <Layout>
        <Space direction="vertical">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">Genshin Gacha Logs</Menu.Item>
              <Menu.Item key="2">Mua Account</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Introduction></Introduction>
            <Row>
              <Col span={8}></Col>
              <Col span={8}>
                <Upload
                  accept=".txt"
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = (e) => {
                      let logText = e.target.result;
                      let arr = logText.match(
                        /^OnGetWebViewPageFinish:https:\/\/.+\?.+?(?:#.+)?$/gm
                      );
                      if (arr && arr.length) {
                        let url = arr[arr.length - 1].replace(
                          "OnGetWebViewPageFinish:",
                          ""
                        );
                        // let index = url.indexOf("authkey_ver");
                        // let tmp = url.substring(index, url.length);
                        // console.log(tmp);
                        setUserKey(url);
                      }
                    };
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Col>
              <Col span={8}></Col>
            </Row>
            <Divider plain> User section </Divider>
            <User />
            <Divider plain> Wish section</Divider>
            <Wish />
            <Divider plain> Charts section</Divider>
            <DemoRadar />
          </Content>
          <Footer></Footer>
        </Space>
      </Layout>
    </Spin>
  );
};

export default HomeScreen;
