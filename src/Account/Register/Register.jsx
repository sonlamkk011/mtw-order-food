import { Alert, Box,  Stack } from "@mui/material";
import accountService from "Account/AccountService";
import { ErrorForm } from "Account/Components/ErrorForm";
import Form from "Account/Components/Form";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import CircularProgress from '@mui/material/CircularProgress';



export class Register extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                username: "",
                email: "",
                phone: "",
                password: "",

            }),
            message: {
                type: "",
                content: "",
                isDisplay: false,
            }
        }
    }

    handleRegister = async () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { username, email, phone, password } = this.state.form;
            const data = {
                username: username.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
            }
            await accountService.registerAccount(data)
                .then((res) => {
                    let { message } = this.state;
                    message.isDisplay = true;
                    message.type = "success";
                    message.content = "Create new account successful";
                    this.setState({
                        message
                    });
                    this.setState({ isLoading: false });
                    window.location.replace("/login");
                })
                .catch((err) => {
                    this.setState({ isLoading: false });
                    let { message } = this.state;
                    message.isDisplay = true;
                    message.type = "error";
                    message.content = "Please check information again! ";
                    this.setState({
                        message
                    });
                })
        }

    }


    render() {
        const { message,isLoading } = this.state;
        const { username, email, phone, password } = this.state.form
        return (
            <>
                {isLoading ? (
                    <Box sx={{ width: "100%" }}>
                        <CircularProgress  />
                    </Box>
                ) : (
                    ""
                )}
                <div className="login-page">
                    {
                        message.isDisplay ? (<Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity={message.type}> {message.content}
                            </Alert>
                        </Stack>
                        ) : (
                            ""
                        )}
                    <div className="form">
                        <form className="login-form">
                            <div className="form-register">
                                <input type="text" placeholder="username" name="username" required value={username.value} onChange={(ev) => this._setValue(ev, "username")} />
                                {
                                    username.err !== '' ? username.err === "*" ? <ErrorForm message="User Name cannot be empty" /> : '' : ""
                                }
                            </div>
                            <div className="form-register">
                                <input type="email" placeholder="email" name="email" required value={email.value} onChange={(ev) => this._setValue(ev, "email")} />
                                {
                                    email.err !== '' ? email.err === "*" ? <ErrorForm message="Email cannot be empty" /> : '' : ""
                                }
                            </div>
                            <div className="form-register">
                                <input type="number" placeholder="phone" name="phone" required value={phone.value} onChange={(ev) => this._setValue(ev, "phone")} />
                                {
                                    phone.err !== '' ? phone.err === "*" ? <ErrorForm message="Phone Number cannot be empty" /> : '' : ""
                                }
                            </div>
                            <div className="form-register">
                                <input type="password" placeholder="password" name="password" required value={password.value} onChange={(ev) => this._setValue(ev, "password")} />
                                {
                                    password.err !== '' ? password.err === "*" ? <ErrorForm message="Password cannot be empty" /> : '' : ""
                                }
                            </div>

                            <Button className="button-register" onClick={this.handleRegister}>Register</Button>
                            <p className="message">
                                You have are accounts? <Link to="/login">Login Now</Link>
                            </p>
                        </form>
                    </div>
                </div>




            </>
        )
    }
}