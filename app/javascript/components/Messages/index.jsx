import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import messageBus from '../../utils/messageBus';

class Messages extends Component {
  constructor(props) {
    super(props);
    // subscribe in constructor as useEffect hook is called too late
    messageBus.subscribe(this.setMessage);
  }

  state = { message: null };

  setMessage = message => {
    this.setState({ message: message });
  };

  render() {
    const { message } = this.state;

    if (!message) return null;

    const { status, content } = message;
    if (status == 'info') {
      return <Alert color="info">{content}</Alert>;
    } else if (status == 'error') {
      return <Alert color="danger">{content}</Alert>;
    }
  }
}

export default Messages;
