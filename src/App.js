import React, { useContext, useState, useRef, useEffect } from "react";
import history from "./history";
import { Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";
import { AppContext } from "./context/context";
import Header from "./components/Header";
import GlobalSearchResult from "./components//globalSearch/GlobalSearchResult";
import SubBasket from "./components/basket/SubBasket";
import { Col, Row } from "antd";
import ProtectedRoute from "./ProtectedRoutes";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer";
import useResponsive from "./customHooks/responsiveHook";
import Favorites from "./components/favorite/Favorites";
import NavBar from "./components/Menu";
import styleVariable from "./styleVariable";

function App() {
  const { globalSearch, popup } = useContext(AppContext);
  const { state: globalSearchState } = globalSearch;
  const botRef = useRef(null);
  const appRef = useRef(null);
  const { isMobile } = useResponsive();

  const { favoriteIsActive, chatActive } = popup;

  return (
    <div
      ref={appRef}
      style={{ minHeight: "100vh", color: styleVariable.mainColor }}
    >
      <div style={{ minHeight: "100vh" }} style={{ position: "relative" }}>
        <Router history={history} style={{ position: "relative" }}>
          <Header botRef={botRef} />
          <NavBar />
          <SubBasket />

          <Col
            span={24}
            style={{
              position: "relative",
              zIndex: 1,
              paddingTop: 20,
            }}
          >
            {globalSearchState.active && (
              <GlobalSearchResult state={globalSearchState} />
            )}
            {!globalSearchState.active && (
              <Switch>
                {Routes.map((route) =>
                  route.protected ? (
                    <ProtectedRoute
                      key={route.path}
                      Component={route.component}
                    />
                  ) : (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  )
                )}
              </Switch>
            )}
            <Col
              ref={botRef}
              style={{ paddingTop: 25, marginTop: isMobile && 20 }}
            >
              {chatActive && (
                <Col>
                  <Row justify="start" align="middle">
                    <Col lg={6} md={12} xs={24} sm={24}></Col>
                    <Col span={24}>
                      <Chat appRef={appRef} history={history} />
                    </Col>
                  </Row>
                </Col>
              )}
            </Col>
          </Col>
          {favoriteIsActive && <Favorites />}
          <Footer history={history} />
        </Router>
      </div>
    </div>
  );
}

export default App;
