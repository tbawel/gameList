import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 5,
      games: [
        {
          id: 0,
          name: "Black Ops 2",
          rating: 7
        },
        {
          id: 1,
          name: "Seven Days to Die",
          rating: 8
        },
        {
          id: 2,
          name: "Minecraft",
          rating: 9
        },
        {
          id: 3,
          name: "Shrek 2",
          rating: 1
        },
        {
          id: 4,
          name: "Halo",
          rating: 7.5
        }
      ],
      newGame: {
        name: "",
        rating: 0
      }
    }


  };

  handleClick = (e, gameID) => {
    let newGames = this.state.games.filter((game) => (game.id !== gameID));
    this.setState({ games: newGames });
  }

  handleChange = e => {
    this.setState({
      newGame: {
        ...this.state.newGame,
        [e.target.name]: e.target.value
      }
    })
  }
//added comment
  addGame = (e) => {
    e.preventDefault();
    let tempList = this.state.games.slice();
    tempList.push(this.state.newGame);
    tempList[tempList.length - 1].id = this.state.idCounter;
    this.setState({ games: tempList, idCounter: this.state.idCounter + 1 });
  }

  render() {
    const gamesList = this.state.games.map((game) =>
      <li key={game.id}>{game.name} has a rating of {game.rating}/10
      <button onClick={(e) => this.handleClick(e, game.id)}> Delete </button>
      </li>
    );

    return (
      <div>
        <ul>{gamesList}</ul>
        <form onSubmit={(e) => this.addGame(e)}>
          <label>Add A Game: </label>
          <input type="text"
            name="name"
            placeholder="Type new game here"
            value={this.state.newGame.name}
            onChange={(e) => this.handleChange(e)} />
          <label>  Rating: </label>
          <input type="number"
            name="rating"
            min="0"
            max="10"
            value={this.state.newGame.rating}
            onChange={(e) => this.handleChange(e)} />
          <button type="submit">Add</button>
        </form>

      </div>
    );
  };
}

export default App;
