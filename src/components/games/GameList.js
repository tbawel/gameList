import React from 'react';
import AddGame from './AddGame.js'

class GameList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const gamesList = this.props.games.map((game) =>
      <li className="spacedList" key={game.id}>
        {game.name} has a rating of {game.rating}/10
      <button onClick={(e, gameId) => this.props.handleEditToggle(e, game.id)}> Edit </button>
        <button onClick={(e, gameId) => this.props.handleDelete(e, game.id)}> Delete </button>
        <br />
        Developer: {game.developer}
        {game.edit ? (
          <form onSubmit={(e, gameId) => this.props.handleUpdate(e, game.id)}>
            <input
              type="text"
              value={this.props.editName}
              placeholder={game.name}
              name="editName"
              onChange={(e, gameId) => this.props.handleChange(e, game.id)} />
            <input
              type="number"
              value={this.props.editRating}
              placeholder={game.rating}
              name="editRating"
              onChange={(e, gameId) => this.props.handleChange(e, game.id)} />
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
        <h1> Game List </h1>
        {gamesList}
        <AddGame addGame={(e) => { this.props.addGame(e) }} handleChange={(e) => this.props.handleChange(e)} newName={this.props.newName} newRating={this.props.newRating} />
      </div>
    );
  }
}

export default GameList;