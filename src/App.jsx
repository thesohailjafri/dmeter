import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./scss/components/flags/flags.css";
import "./scss/layout/layout.scss";
import "./App.scss";

import { AuthWrapper } from "./app_layout/AuthWrapper";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccessPage } from "./pages/AccessPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { AddBranchPage } from "./pages/AddBranchPage";
import { BranchPage } from "./pages/BranchPage";
import { StaffPage } from "./pages/StaffPage";
import { AllMenuPage } from "./pages/AllMenuPage";
import { AllStaffPage } from "./pages/AllStaffPage";
import { TestPage } from "./pages/TestPage";
import { ErrorPage } from "./pages/ErrorPage";
import { MenuPage } from "./pages/MenuPage";
import { MenuCategoryPage } from "./pages/MenuCategoryPage";
import { AllOrdersPage } from "./pages/AllOrdersPage";
import { OrdersPage } from "./pages/OrdersPage";
export default function App() {
    return (
        <div className="">
            <Switch>
                <Route exact path="/login" render={() => <LoginPage />} />
                <Route exact path="/register" render={() => <RegisterPage />} />
                <Route exact path="/error" render={() => <ErrorPage />} />
                <Route exact path="/accessdenied" render={() => <AccessPage />} />
                <Route exact path="/notfound" render={() => <NotFoundPage />} />

                <Route
                    exact
                    path="/"
                    render={() => (
                        <AuthWrapper>
                            <HomePage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    exact
                    path="/staff"
                    render={() => (
                        <AuthWrapper>
                            <AllStaffPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    exact
                    path="/menu"
                    render={() => (
                        <AuthWrapper>
                            <AllMenuPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    exact
                    path="/orders"
                    render={() => (
                        <AuthWrapper>
                            <AllOrdersPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    exact
                    path="/branch/add"
                    render={() => (
                        <AuthWrapper>
                            <AddBranchPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    path="/branch/staff/:branch_id"
                    render={() => (
                        <AuthWrapper>
                            <StaffPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    path="/branch/menu/category/:branch_id"
                    render={() => (
                        <AuthWrapper>
                            <MenuCategoryPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    path="/branch/orders/:branch_id"
                    render={() => (
                        <AuthWrapper>
                            <OrdersPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    path="/branch/menu/:branch_id"
                    render={() => (
                        <AuthWrapper>
                            <MenuPage />
                        </AuthWrapper>
                    )}
                />

                <Route
                    path="/branch/:branch_id"
                    render={() => (
                        <AuthWrapper>
                            <BranchPage />
                        </AuthWrapper>
                    )}
                />
                <Route path="/*">
                    <Redirect to="/notfound" />
                </Route>
            </Switch>
        </div>
    );
}
