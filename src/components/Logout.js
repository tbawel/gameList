import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
    <div>
      <h1> You are now logged out. You will be redirected after 3 seconds. </h1>
    </div>
    );
  }
}

export default Logout;