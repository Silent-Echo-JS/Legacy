import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const SelectMessage = (props) => {
  const { messages } = props;

    return (
      <div>
        <Card>
          <CardHeader>{messages.subject}</CardHeader>
          <CardBody>
            <CardTitle>{messages.content}</CardTitle>
            <Button>Reply</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

export default SelectMessage;
