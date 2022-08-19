import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";

import "moment-timezone";

import "./OrderDetails.scss";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { formatCurrencyToVND } from "ulti/formatDate";
// function createData(Products, Pirce, Status) {
//   return { Products, Pirce, Status };
// }

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
    

      <div id="order-details">
        <h1
          style={{ marginBottom: "25px", color: "#077915", fontSize: "50px" }}
        >
          Order Details
        </h1>
        <div style={{ height: "calc(100vh - 300px)" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <TableContainer
                  component={Paper}
                  style={{ height: "100%", borderRadius: "20px", width: "100%" }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption
                      style={{
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    >
                      Đơn hàng của bạn đã được order thành công.
                    </caption>
                    <TableHead>
                      <TableRow
                        style={{
                          backgroundColor: "#6dc778",
                          color: "rgb(237 237 237)"
                        }}
                      >
                        <TableCell
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Products
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginLeft: "10px"
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Order Date
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          Delivery Time
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products?.orderDetails?.map((item) => {
                        return (
                          <TableRow key={item.food.id} style={{}}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ fontWeight: "bold" }}
                            >
                              {item.food.name}
                              <div style={{ marginTop: "10px" }}>
                                <img
                                  src={item.food.image}
                                  style={{
                                    width: "60px",
                                    height: "50px",
                                    borderRadius: "10px"
                                  }}
                                />
                              </div>
                            </TableCell>

                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              {formatCurrencyToVND(item.food.price)}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              {item.quantity}
                            </TableCell>

                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              {formatCurrencyToVND(
                                item.food.price * item.quantity
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              <Moment format="DD/MM/YYYY">
                                {products.createdAt}
                              </Moment>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontWeight: "bold" }}
                            >
                              <Moment format=" HH:mm || DD/MM/YYYY ">
                                {products.mealTime}
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
          </div>
       
        </div>
      </div>
    </>
  );
};
export default withRouter(OrderDetails);
