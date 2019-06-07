import React from 'react';

class GameList extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const gamesList = this.props.games.map((game) =>
      <li key={game.id}>{game.name} has a rating of {game.rating}/10
      <button onClick={(e) => this.props.handleEdit(e, game.id)}> Edit </button>
      <button onClick={(e) => this.props.handleDelete(e, game.id)}> Delete </button>
      <br />
      {game.edit ? (
        <form onSubmit={e => this.props.handleUpdate(e, game.id)}>
          <input
            type="text"
            value={this.props.editGame.name}
            placeholder={game.name}
            name="name"
            onChange={e => this.props.handleEditChange(e)}/>
          <input
            type="number"
            value={this.props.editGame.rating}
            placeholder={game.rating}
            name="rating"
            onChange={e => this.props.handleEditChange(e)}/>
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
    </div>
    );
  }
}

export default GameList;