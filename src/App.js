import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import history from "./history";
import { Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";
import { AppContext } from "./context/context";
import Header from "./components/Header";
import GlobalSearchResult from "./components//globalSearch/GlobalSearchResult";
import Basket from "./components/basket/Basket";
import SubBasket from "./components/basket/SubBasket";
import { Col, Row, Drawer } from "antd";
import ProtectedRoute from "./ProtectedRoutes";
import Chat from "./Chat";
import Footer from "./components/Footer";

function App() {
  const { globalSearch } = useContext(AppContext);
  const { state: globalSearchState } = globalSearch;
  const [basketIsActive, setBasketActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <div style={{ minHeight: "100vh" }}>
        <Router history={history}>
          <Header
            setBasketActive={setBasketActive}
            basketIsActive={basketIsActive}
            setChatActive={setChatActive}
          />

          <SubBasket
            setBasketActive={setBasketActive}
            basketIsActive={basketIsActive}
          />
          <Col span={24} style={{ position: "relative", minHeight: "100vh" }}>
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
            <div id="bot">
              {chatActive && (
                <Row style={{ padding: 15 }}>
                  <Chat setChatActive={setChatActive} history={history} />
                </Row>
              )}
            </div>
          </Col>

          {basketIsActive && <Basket setBasketActive={setBasketActive} />}
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
