import React from 'react';
import { pageHeader } from './../Style.jsx';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText, Modal, Row, Col
} from 'reactstrap';
import axios from 'axios';
import SelectMessage from './SelectMessage.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: [],
      messages: [],
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getMessages();
    this.getSender();
  }

  getMessages() {
    axios
      .get('/inbox')
      .then(res => {
        this.setState({ messages: res.data });
      })
      .catch(err => alert(err));
  }

  getSender() {
    axios
      .get('/sender')
      .then(res => {
        console.log(res.data);
        this.setState({ sender: res.data });
        console.log(this.sender)
      })
      .catch(err => alert(err));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { messages } = this.state;
    const { sender } = this.state;
    return (
      <div>
          <div style={pageHeader}><h2>Messages</h2></div>
          <center>
              <Col sm='4'>
                {messages.map(message => {
                  return (
                    <div>
                      <ListGroup style={{textAlign: 'left'}}>

                        <ListGroupItem onClick={this.toggle} action>
                          <ListGroupItemHeading>
                            From: {sender.username}
                          </ListGroupItemHeading>

                          <ListGroupItemText>
                            Subject: {message.subject}
                          </ListGroupItemText>

                        </ListGroupItem>
                      </ListGroup>

                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                      >

                      <SelectMessage messages={message}/>
                      </Modal>
                    </div>
          );
        })}
          </Col>
      </center>
            </div>
    );
  }
}

export default Inbox;