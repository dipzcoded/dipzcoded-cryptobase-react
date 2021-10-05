import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptonewsapi";
import { useGetCryptosQuery } from "../services/cryptoapi";
import Loader from "../components/Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

function NewsScreen({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: cryptoList } = useGetCryptosQuery(100);
  if (isFetching || !cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
            {cryptoList?.data?.coins?.map((coin) => (
              <Select.Option value={coin.name} key={coin.name}>
                {coin.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((news, indexes) => (
        <Col key={indexes} xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <div>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <Typography.Title className="news-title" level={4}>
                  {news.name}
                </Typography.Title>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Typography.Text className="provider-name">
                    {news.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography.Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default NewsScreen;
