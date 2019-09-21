import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import axios from 'axios';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messages: this.props.messages
    };

  }

  componentDidMount() {
    this.getMessages();
  }
  
  getMessages() {
    axios.get('/inbox').then(res => {
      this.setState({ messages: res.data });
    })
    .catch(err => alert(err));
  }

  render() {
    const { messages} = this.state;
    console.log(messages, 'messages inside of inbox');
    return (
      <div>
            <h3>Messages</h3>
        {messages.map(message => {
          return (
            <div>
              <ListGroup>
                <ListGroupItem action>
                  <ListGroupItemHeading>From: {message.sender_id}</ListGroupItemHeading>
                  <ListGroupItemText>Subject: {message.subject}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>

          );
        })}
      </div>
    );
  }
}

export default Inbox;
