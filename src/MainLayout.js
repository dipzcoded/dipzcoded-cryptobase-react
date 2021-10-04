import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar } from "./components";
import {
  CryptocurrencyScreen,
  ExchangesScreen,
  HomeScreen,
  NewsScreen,
  CryptoDetailsScreen,
} from "./Screens";
import { Footer } from "./components/layouts/index";

function MainLayout() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/exchanges" component={ExchangesScreen} />
              <Route
                exact
                path="/cryptocurrencies"
                component={CryptocurrencyScreen}
              />
              <Route
                exact
                path="/crypto/:coinId"
                component={CryptoDetailsScreen}
              />
              <Route exact path="/news" component={NewsScreen} />
            </Switch>
          </div>
        </Layout>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
