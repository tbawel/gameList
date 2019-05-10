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
        rating: ""
      },
      editGame: {
        name: "",
        rating: ""
      }
    }
  };

handleEdit = (e, gameId) => {
  let newGames = this.state.games.map(game => {
    if (game.id === gameId) {
      this.setState({editGame: {
        name: game.name,
        rating: game.rating
      }
    })
      return {
        ...game,
        edit: !game.edit
      };
    } else {
      return {
        ...game,
        edit: false
      };
    }
  });
  this.setState({
    games: newGames
  });
};

  handleDelete = (e, gameId) => {
    let newGames = this.state.games.filter((game) => (game.id !== gameId));
    this.setState({ games: newGames });
  }

  handleNewChange = e => {
    this.setState({
      newGame: {
        ...this.state.newGame,
        [e.target.name]: e.target.value
      }
    });
  };

  handleEditChange = e => {
    this.setState({
      editGame: {
        ...this.state.editGame,
        [e.target.name]: e.target.value
      }
    });
  };

  handleUpdate = (e, gameId) => {
    e.preventDefault();
    let editGames = this.state.games.map(game => {
      if(game.id === gameId) {
        return {
          ...game,
          name: this.state.editGame.name,
          rating: this.state.editGame.rating,
          edit: false
        };
      } else {
        return {
          ...game
        };
      }
    });
    this.setState({
      games: editGames
    });

  };

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
      <button onClick={(e) => this.handleEdit(e, game.id)}> Edit </button>
      <button onClick={(e) => this.handleDelete(e, game.id)}> Delete </button>
      <br />
      {game.edit ? (
        <form onSubmit={e => this.handleUpdate(e, game.id)}>
          <input
            type="text"
            value={this.state.editGame.name}
            placeholder={game.name}
            name="name"
            onChange={e => this.handleEditChange(e)}/>
          <input
            type="number"
            value={this.state.editGame.rating}
            placeholder={game.rating}
            name="rating"
            onChange={e => this.handleEditChange(e)}/>
          <button type="submit">Update</button>
        </form>
      ) : (
        ""
      )
      }
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
            onChange={(e) => this.handleNewChange(e)} />
          <label>  Rating: </label>
          <input type="number"
            name="rating"
            min="0"
            max="10"
            placeholder="Enter Value"
            value={this.state.newGame.rating}
            onChange={(e) => this.handleNewChange(e)} />
          <button type="submit">Add</button>
        </form>

      </div>
    );
  };
}

export default App;

