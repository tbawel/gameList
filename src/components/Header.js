import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const shownHeader = (this.props.loggedIn === false ? 
      (<div>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
      </div>):
      (<div>
        <Link to="/"> Home </Link>
        <Link to="/gameList"> Game List </Link>
        <button onClick={(e) => this.props.logout(e)}> Logout </button>
      </div>)
      );

    return (
    <div>
      {shownHeader}
    </div>
    );
  }
}

export default withRouter(Header);