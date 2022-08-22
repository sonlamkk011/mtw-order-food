import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';


const SendMessage = () => {

   
    return(
        <>
        <div id='send-message'>
        <MessengerCustomerChat
        pageId="110645371210018"
        appId="616053913218417"
       
      />
        </div>
        </>
    )
}
export default SendMessage