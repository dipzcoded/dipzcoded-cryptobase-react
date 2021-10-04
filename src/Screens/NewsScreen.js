import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptonewsapi";

function NewsScreen({ simplified }) {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 10 : 100,
  });
  console.log(cryptoNews);
  return <div>new details</div>;
}

export default NewsScreen;
