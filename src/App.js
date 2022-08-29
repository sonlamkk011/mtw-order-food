import { Register } from "Account/Register/Register";
import Manager from "Admin/Components/Shared/Layout";
import "assets/scss/style.scss";
import AuthProvider from "contexts/auth";
import CartProvider from "contexts/cart";
import CheckoutProvider from "contexts/checkout";
import CommonProvider from "contexts/common";
import ProductsProvider from "contexts/products";
import AuthLayout from "layouts/AuthLayout";
import CommonLayout from "layouts/CommonLayout";
import RouteWrapper from "layouts/RouteWrapper";
import Login from "pages/auth";
import CheckoutPage from "pages/checkout";
import HomePage from "pages/home";
import OrderDetails from "pages/OrderDetails/OrderDetails";
import OrderManagement from "pages/OrderDetails/OrderManagement/OrderManagement";
import PhoneSignUp from "pages/PhoneSignUp";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";


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
                  path="/phonesignup"
                  component={PhoneSignUp}
                  layout={AuthLayout}
                  />
                  {/* <RouteWrapper 
                  path="/test"
                  component={TestPhone}
                  layout={AuthLayout}
                  /> */}
                  <RouteWrapper
                    path="/login"
                    component={Login}
                    layout={AuthLayout}
                  />
                  <RouteWrapper
                    path="/register"
                    component={Register}
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
