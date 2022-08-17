import Manager from "./Components/Shared/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import AddFood from "./Components/Food/AddFood";
import FoodDetail from "./Components/Food/FoodDetail";
import AddCategory from "./Components/Category/AddCategory";
import CategoryList from "./Components/Category/CategoryList";
import CategoryDetail from "./Components/Category/CategoryDetail";
import AddAccount from "./Components/Account/AddAccount";
import AccountList from "./Components/Account/AccountList";
import AccountDetail from "./Components/Account/AccountDetail";
import OrderList from "./Components/Order/OrderList";
import FoodList from "./Components/Food/FoodList";

const Admin = () => {
  return (
    <>
      <div>
        {/* <Manager /> */}
        <Router>
          <Switch>
            <Route path="/admin/food/create" exact>
              <AddFood />
            </Route>
            <Route path="admin/food/list" exact>
              <FoodList />
            </Route>
            <Route path="admin/food/details/:id" exact>
              <FoodDetail />
            </Route>
            <Route path="admin/category/create" exact>
              <AddCategory />
            </Route>
            <Route path="/admin/category/list" exact>
              <CategoryList />
            </Route>
            <Route path="/admin/category/details/:id" exact>
              <CategoryDetail />
            </Route>
            <Route path="/admin/account/create" exact>
              <AddAccount />
            </Route>
            <Route path="/admin/account/list" exact>
              <AccountList />
            </Route>
            <Route path="/admin/account/details/:id" exact>
              <AccountDetail />
            </Route>
            <Route path="/admin/order/list" exact>
              <OrderList />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};
export default Admin;
