import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUpdate = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  render(){
    return (
    <div>
      <form onSubmit={(e) => this.props.checkCredentials(e, this.state.username, this.state.password)}>
      <input
            type="text"
            value={this.state.username}
            placeholder='username'
            name="username"
            onChange={e => this.handleUpdate(e)}/>
            <br />
            <input
            type="text"
            value={this.state.password}
            placeholder='password'
            name="password"
            onChange={e => this.handleUpdate(e)}/>
            <br />
      <button type="submit"> Login </button>
      </form>
    </div>
    );
  }
}

export default Login;