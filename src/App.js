import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import AuthProvider from "contexts/auth";
import CommonProvider from "contexts/common";
import ProductsProvider from "contexts/products";
import CartProvider from "contexts/cart";
import CheckoutProvider from "contexts/checkout";
import RouteWrapper from "layouts/RouteWrapper";
import AuthLayout from "layouts/AuthLayout";
import CommonLayout from "layouts/CommonLayout";
import AuthPage from "pages/auth";
import HomePage from "pages/home";
import CheckoutPage from "pages/checkout";
import "assets/scss/style.scss";
import OrderDetails from "pages/OrderDetails/OrderDetails";
import Manager from "Admin/Components/Shared/Layout";
import AddFood from "Admin/Components/Food/AddFood";
import FoodList from "Admin/Components/Food/FoodList";
import FoodDetail from "Admin/Components/Food/FoodDetail";
import AddCategory from "Admin/Components/Category/AddCategory";
import CategoryList from "Admin/Components/Category/CategoryList";
import CategoryDetail from "Admin/Components/Category/CategoryDetail";
import AddAccount from "Admin/Components/Account/AddAccount";
import AccountList from "Admin/Components/Account/AccountList";
import AccountDetail from "Admin/Components/Account/AccountDetail";
import OrderList from "Admin/Components/Order/OrderList";
import OrderManagement from "pages/OrderDetails/OrderManagement/OrderManagement";
import Admin from "Admin/Admin";
import LayoutAdmin from "Admin/Components/Shared/LayoutAdmin";
import ManagerSidebar from "Admin/Components/Shared/ManagerSidebar";

const App = () => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Switch>
                  <RouteWrapper
                    path="/"
                    exact
                    component={HomePage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/checkout"
                    component={CheckoutPage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/auth"
                    component={AuthPage}
                    layout={AuthLayout}
                  />
                  <RouteWrapper
                    path="/order-details/:id"
                    component={OrderDetails}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/order-management/:id"
                    component={OrderManagement}
                    layout={CommonLayout}
                  />
                </Switch>
                <Switch>
                  <Route path='/admin/:path?/:path?' exact>
                  <Manager />
                  </Route>
                </Switch>
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </CommonProvider>
    </AuthProvider>
  );
};

export default App;
