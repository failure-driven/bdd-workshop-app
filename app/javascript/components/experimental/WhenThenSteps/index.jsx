import React, { Component } from 'react';

const GivenWhenThenBlock = () => (
  <div>
    <div>Given</div>
    <div>When</div>
    <div>Then</div>
  </div>
);

class WhenThenSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.forward = () => {
      const { count } = this.state;
      this.setState({ count: count + 1 });
    };
    this.reset = () => {
      this.setState({ count: 0 });
    };
  }

  render() {
    const { count } = this.state;
    return (
      <>
        <div style={{ height: '300px' }}>
          {count >= 1 && <GivenWhenThenBlock />}
          {count >= 2 && <GivenWhenThenBlock />}
          {count >= 3 && <GivenWhenThenBlock />}
        </div>
        <button type="submit" onClick={this.reset}>
          reset
        </button>
        <button type="submit" onClick={this.forward}>
          forward
        </button>
      </>
    );
  }
}

export default WhenThenSteps;
