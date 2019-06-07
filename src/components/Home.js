import React from 'react';
import homeImage from '../homePage.png'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
    <div>
      <img src={homeImage} alt="Tom's Choice"/>
    </div>
    );
  }
}

export default Home;