import { useState } from "react";
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";




const PhoneSignUp = () => {
    const counttryCode = "+84";
    const [phoneNumber, setPhoneNumber] = useState(counttryCode);
    const [fullName, setFullName] = useState("");
    const [expandForm, setExpandForm] = useState(false);
    const [OTP, setOTP] = useState('')
    const history = useHistory();



    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, authentication);
    }

    const requestOtp = (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 10) {
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;

                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                    console.log(error);
                });
        }
    }
    const verify = (e) => {
        let otp = e.target.value;
        setOTP(otp);
        if (otp.length === 6) {
            console.log(otp);
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        }
    }
    const handleVerify = () => {
        if(setOTP(666666) ) {
            history.push("/checkout")
        } 
    }
    return (
        <>
            <div className='formContainer'>
                <form onSubmit={requestOtp}>
                    <h1>Sign In With Phone</h1>

                    <div className="mb-3">
                        <label htmlFor="phoneNumberInput" className="form-label"></label>
                        {/* <input type="tel" className="form-control"
                            id="phoneNumberInput"
                            aria-describedby="emailHelp"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} /> */}
                        <div className='mb-3' >
                        <TextField 
                        style={{width:"300px"}}
                        id="outlined-basic" 
                        label="FullName" 
                        variant="outlined" 
                        value={fullName.value}
                        />
                        </div>
                        <PhoneInput
                        style={{marginLeft:"25px"}}
                            country={'vn'}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e)}
                        />

                    </div>
                        <div id="phoneNumberHelp" className="form-text">Please enter your phone number</div>
                    {expandForm === true ?
                        <>
                            <div className='mb-3'>
                                <label htmlFor='otpInput' className='form-label'>OTP</label>
                                <input type="number" className="form-control" id="otpInput" value={OTP} onChange={verify} />
                                {/* <div id='otpHelp' className='form-text'>dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div> */}
                                <button type='submit' className='btn btn-primary' style={{ marginTop: "10px" }} onClick={handleVerify}>Verify</button>
                            </div>
                        </>
                        :
                        null
                    }
                    {
                        expandForm === false ?
                            <button type='submit' className='btn btn-primary'>Send OTP</button>
                            :
                            null
                    }
                    <div id='recaptcha-container'></div>

                </form>

            </div>
        </>
    )
}
export default PhoneSignUp