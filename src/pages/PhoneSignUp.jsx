import { Alert, Button, Form } from "antd";
import { useUserAuth } from "contexts/UserAuthContext";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useHistory } from "react-router-dom";


const PhoneSignUp = () => {
    const [phone, setPhone] = useState("")
    // const [error, setError] = useState("");
    // const [number, setNumber] = useState("");
    // const [flag, setFlag] = useState(false);
    // const [otp, setOtp] = useState("");
    // const [result, setResult] = useState("");
    // const { setUpRecaptha } = useUserAuth();
    // const history = useHistory();


    // const getOtp = async (e) => {
    //     e.preventDefault();
    //     console.log(number);
    //     setError("");
    //     if (number === "" || number === undefined)
    //       return setError("Please enter a valid phone number!");
    //     try {
    //       const response = await setUpRecaptha(number);
    //       setResult(response);
    //       setFlag(true);
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   };

    //   const verifyOtp = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     if (otp === "" || otp === null) return;
    //     try {
    //       await result.confirm(otp);
    //       history.push("/home");
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   };
    // return (
    //     <>
    //         <div className="p-4 box">
    //             <h2 className="mb-3">Firebase Phone Auth</h2>
    //             {error && <Alert variant="danger">{error}</Alert>}
    //             <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
    //                 <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <PhoneInput
    //                         defaultCountry="IN"
    //                         value={number}
    //                         onChange={setNumber}
    //                         placeholder="Enter Phone Number"
    //                     />
    //                     <div id="recaptcha-container"></div>
    //                 </Form.Group>
    //                 <div className="button-right">
    //                     <Link to="/">
    //                         <Button variant="secondary">Cancel</Button>
    //                     </Link>
    //                     &nbsp;
    //                     <Button type="submit" variant="primary">
    //                         Send Otp
    //                     </Button>
    //                 </div>
    //             </Form>

    //             <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
    //                 <Form.Group className="mb-3" controlId="formBasicOtp">
    //                     <Form.Control
    //                         type="otp"
    //                         placeholder="Enter OTP"
    //                         onChange={(e) => setOtp(e.target.value)}
    //                     />
    //                 </Form.Group>
    //                 <div className="button-right">
    //                     <Link to="/">
    //                         <Button variant="secondary">Cancel</Button>
    //                     </Link>
    //                     &nbsp;
    //                     <Button type="submit" variant="primary">
    //                         Verify
    //                     </Button>
    //                 </div>
    //             </Form>
    //         </div>
    //     </>
    // )

    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Phone Auth</h2>

                <PhoneInput
                    country={'vn'}
                    value={phone}
                    onChange={phone => setPhone({ phone })}
                />

                <div className="button-right" style={{marginTop:"20px"}}>
                   
                    <Button type="submit" variant="primary">
                        Send Otp
                    </Button>
                </div>
                

            </div>
        </>
    )
}
export default PhoneSignUp