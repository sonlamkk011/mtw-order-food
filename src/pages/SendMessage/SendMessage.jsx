import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Widget, addResponseMessage } from 'react-chat-widget';


import 'react-chat-widget/lib/styles.css';

const SendMessage = () => {

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
    return(
        <>
        <div id='send-message'>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Support"
          subtitle="bạn cần hỗ trợ ?"
        />
        </div>
        </>
    )
}
export default SendMessage