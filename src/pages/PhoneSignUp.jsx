import { Alert, Button, Form } from "antd";
import { useUserAuth } from "contexts/UserAuthContext";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useHistory } from "react-router-dom";
import { authentication } from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";



const PhoneSignUp = () => {
    const [phone, setPhone] = useState("");
    const [expandForm, setExpandForm] = useState(false);
    const history = useHistory();


    const handleSendOtp = () => {
        history.push("/verify")
    }


    const RequestOtp = (e) => {
        e.preventDefault();
        if (phone.length >= 10) {
            setExpandForm(true);
        }
    }
    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Phone Auth</h2>

                <Form onSubmit={RequestOtp}>
                    <PhoneInput
                        country={'vn'}
                        value={phone.value}
                        onChange={phone => setPhone({ phone })}
                    />
                </Form>

                <div className="button-right" style={{ marginTop: "20px" }}>

                    <Button type="submit" variant="primary" onClick={handleSendOtp}>
                        Send Otp
                    </Button>
                </div>


            </div>
        </>
    )
}
export default PhoneSignUp