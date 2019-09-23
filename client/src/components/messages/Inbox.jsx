import React from 'react';
import { pageHeader } from './../Style.jsx';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText, Modal, Row, Col, Button,
} from 'reactstrap';
import axios from 'axios';
import SelectMessage from './SelectMessage.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages,
      modal: false,
      senders: []
    };
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.getSender();
    this.getMessages();
  }

  getMessages() {
    axios
      .get('/inbox')
      .then(res => {
        this.setState({ messages: res.data });
      })
      .catch(err => alert(err));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  getSender(){
    axios.get('/sender')
    .then(res => {
      // console.log(res, 'SENDERS');
      this.setState({senders : res.data});
    })
    .catch(err => alert(err));
  }

  delete(id) {
    console.log(`MESSAGE ID ${id}`);
    axios.post('/deleteMessage', { id: id })
      .then(response => {
        console.log(response, 'deleted');
      })
      .catch(err => {
        console.log(err);
      })
    this.componentDidMount();
  }

  render() {
    const { messages, senders } = this.state;
    console.log(messages, 'messages inside of inbox');
    // console.log(senders, 'SENDERS');
    return (
      <div>
          <div style={pageHeader}><h2>Messages</h2></div>
          <center>
              <Col sm='4'>
                {messages.map(message => {
                  return (
                    <div>

                      <div style={{display: 'inline-block', width: '200px'}}>
                      <ListGroup style={{textAlign: 'left'}}>

                        <ListGroupItem onClick={this.toggle} action>
                          <ListGroupItemHeading>
                            From: {senders[message.sender_id - 1].username}
                          </ListGroupItemHeading>

                          <ListGroupItemText>
                            Subject: {message.subject}
                          </ListGroupItemText>

                        </ListGroupItem>
                      </ListGroup>
                      </div>

                      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <Button onClick={() => {this.delete(message.mess_id)}}>Delete</Button>
                      </div>

                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                      >

                        <SelectMessage messages={message} />
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