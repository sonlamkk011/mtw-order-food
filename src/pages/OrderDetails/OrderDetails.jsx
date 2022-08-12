import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from 'react-moment';

import Header from "components/Header";
import "./OrderDetails.scss";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { formatDate } from "ulti/formatDate";
function createData(Products, Pirce, Status) {
  return { Products, Pirce, Status };
}

const OrderDetails = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`https://order-foods.herokuapp.com/api/v1/orders/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("res.error");
        }
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };
  console.log("sdadsadsadada", products);

  return (
    <>
      <Header />
     
      <div id="order-details">
        <h1 style={{marginBottom:"25px",color:"#077915", fontSize:"50px"}}>Order Details</h1>
        <div>
          <TableContainer component={Paper} style={{height:"250px", borderRadius:"20px"}}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption style={{ color:"black", fontSize:"20px", fontWeight:"bold"}}>
                Mặt hàng của bạn đã đc order thành công, vui lòng chờ ...
              </caption>
              <TableHead>
                <TableRow style={{backgroundColor:"#6dc778", color:"rgb(237 237 237)"}}>
                  <TableCell style={{fontSize:"20px",fontWeight:"bold"}}>Products</TableCell>
                  <TableCell align="right" style={{fontSize:"20px",fontWeight:"bold"}}>Price</TableCell>
                  <TableCell align="right" style={{fontSize:"20px",fontWeight:"bold"}}>Quantity</TableCell>
                  <TableCell align="right" style={{fontSize:"20px",fontWeight:"bold"}}>Order Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.orderDetails?.map((item) => {
                  return (
                    <TableRow key={item.food.id} style={{}}>
                      <TableCell component="th" scope="row">
                        {item.food.name}
                      </TableCell>
                      <TableCell align="right">{item.food.price}.000</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                      <Moment format="DD/MM/YYYY">
                        {item.food.createdAt}
                        </Moment>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default withRouter(OrderDetails);
