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
import { UploadOutlined } from "@ant-design/icons";
import Introduction from "./intro";
import User from "../components/user";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const HomeScreen = () => {
  const [userKey, setUserKey] = useState("");
  return (
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
                      console.log(url);
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

          <User userKey={userKey}></User>
        </Content>
        <Footer></Footer>
      </Space>
    </Layout>
  );
};

export default HomeScreen;
