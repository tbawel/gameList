import React from 'react';
import axios from 'axios';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: []
    }
  }

  componentDidMount() {
    axios.get('/developers')
      .then((response) => {
        console.log(response.data)
        let newDevelopers = response.data.map((developer) => {
          return {
            id: developer.id,
            name: developer.name
          }
        })
        this.setState({ developers: newDevelopers })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
      })
  }

  handleDevChange = e => {
    this.setState({
      developer_id: e.target.value
    });
  };

  render() {
    const developerOptions = this.state.developers.map((developer) => {
      return (
        <option value={developer.id}>
          {developer.name}
        </option>
      )
    })
    return (
      <div>
        <form onSubmit={(e) => this.props.addGame(e)} className='newGameForm'>
          <label>Add A Game: </label>
          <input type="text"
            name="newName"
            placeholder="Type new game here"
            value={this.props.newName}
            onChange={(e) => this.props.handleChange(e)} />
          <label>  Rating: </label>
          <input type="number"
            name="newRating"
            min="0"
            max="10"
            placeholder="Enter Value"
            value={this.props.newRating}
            onChange={(e) => this.props.handleChange(e)} />
          <hr />
          <select>
            {developerOptions}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddGame;

