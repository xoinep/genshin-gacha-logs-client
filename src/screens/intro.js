import { Typography, Divider, Row, Col, Space } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const Introduction = () => {
  return (
    <Typography>
      <Title>Hướng dẫn sử dụng</Title>
      <Paragraph>
        <>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Paragraph className="Paragraph-left">
                <Text>
                  {" "}
                  <strong>Bước 1:</strong> Vào màn hình gacha của game trên PC.
                </Text>
              </Paragraph>
              <Paragraph className="Paragraph-left">
                <Text>
                  {" "}
                  <strong>Bước 2:</strong> Copy file ra Desktop{" "}
                </Text>
              </Paragraph>
              <Paragraph className="Paragraph-left">
                <Text>
                  userPath/AppData/LocalLow/miHoYo/name/output_log.txt
                </Text>
              </Paragraph>
              <Paragraph className="Paragraph-left">
                <Text>
                  <strong>Bước 3:</strong> Upload file lên và xem kết quả.
                </Text>
              </Paragraph>
            </Col>
            <Col span={8}></Col>
          </Row>
        </>
      </Paragraph>
    </Typography>
  );
};

export default Introduction;
