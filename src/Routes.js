import React from "react";
// import menu from "./layouts/menu";

import { Switch, Route } from "react-router";

import BasicLayout from "./layouts/basic";
import D3Page from "./pages/diagram/d3";
import Home from "./pages/home";

function routerConfig() {
  return (
    <BasicLayout>
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/d3" component={D3Page} />
        </Switch>
    </BasicLayout>
  );
}

export default routerConfig;