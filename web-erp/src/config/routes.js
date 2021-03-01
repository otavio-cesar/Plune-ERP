import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import EnumPermissions from "../util/EnumPermissions";
import Loading from "../components/loading";

function Routes() {
    return (
        <>
            <Router>
                <Suspense fallback={<Loading invisible />}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={lazy(() => import("../pages/login/index"))}
                            needUserLogged
                        />
                        {/* <Route
                            exact
                            path="/login"
                            component={lazy(() => import("pages/Account/LoginPage"))}
                        /> */}
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
}

export { Routes };
