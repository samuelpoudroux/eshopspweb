import React, { useContext, useState, useRef } from "react";
import "./App.css";
import history from "./history";
import { Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";
import { AppContext } from "./context/context";
import Header from "./components/Header";
import GlobalSearchResult from "./components//globalSearch/GlobalSearchResult";
import Basket from "./components/basket/Basket";
import SubBasket from "./components/basket/SubBasket";
import { Col, Row } from "antd";
import ProtectedRoute from "./ProtectedRoutes";
import Chat from "./Chat";
import Footer from "./components/Footer";
import useResponsive from "./customHooks/responsiveHook";

function App() {
  const { globalSearch } = useContext(AppContext);
  const { state: globalSearchState } = globalSearch;
  const [basketIsActive, setBasketActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const botRef = useRef(null);
  const appRef = useRef(null);
  const { isMobile } = useResponsive();

  return (
    <div className="App" ref={appRef} style={{ minHeight: "100vh" }}>
      <div style={{ minHeight: "100vh" }}>
        <Router history={history}>
          <Header
            botRef={botRef}
            setBasketActive={setBasketActive}
            basketIsActive={basketIsActive}
            setChatActive={setChatActive}
          />

          <SubBasket
            setBasketActive={setBasketActive}
            basketIsActive={basketIsActive}
          />
          <Col span={24} style={{ position: "relative" }}>
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
                    <Col lg={6} md={12} xs={24} sm={24}>
                      <h3>En quoi puis je vous aider</h3>
                    </Col>
                    <Col span={24}>
                      <Chat
                        appRef={appRef}
                        setChatActive={setChatActive}
                        history={history}
                      />
                    </Col>
                  </Row>
                </Col>
              )}
            </Col>
          </Col>
          {basketIsActive && <Basket setBasketActive={setBasketActive} />}
          <Footer history={history} />
        </Router>
      </div>
    </div>
  );
}

export default App;
