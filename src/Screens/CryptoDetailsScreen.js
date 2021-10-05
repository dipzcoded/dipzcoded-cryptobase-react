import React, { useState } from "react";
import { Col, Row, Typography, Select } from "antd";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
} from "../services/cryptoapi";
import millify from "millify";
import LineChart from "../components/LineChart";
import Loader from "../components/Loader";

function CryptoDetailsScreen() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: fetchingData } =
    useGetCoinHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  const time = ["24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.totalSupply && millify(cryptoDetails?.totalSupply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.circulatingSupply &&
        millify(cryptoDetails?.circulatingSupply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return <Loader />;
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          {cryptoDetails.name} {cryptoDetails.slug} Price
        </Typography.Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((opt) => (
          <Select.Option key={opt} value={opt}>
            {opt}
          </Select.Option>
        ))}
      </Select>
      {/* linechart */}

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Typography.Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              Other Statistics
            </Typography.Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Typography.Title>
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Typography.Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">
                {link.type}
              </Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetailsScreen;
