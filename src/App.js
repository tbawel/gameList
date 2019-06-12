import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import GameList from './components/games/GameList';
import Register from './components/Register';
import Home from './components/Home';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 5,
      loggedIn: false,
      users: [
        {
          email: 'a',
          password: 'a'
        }
      ],
      games: [
        // {
        //   id: 0,
        //   name: "Black Ops 2",
        //   rating: 7
        // },
        // {
        //   id: 1,
        //   name: "Seven Days to Die",
        //   rating: 8
        // },
        // {
        //   id: 2,
        //   name: "Minecraft",
        //   rating: 9
        // },
        // {
        //   id: 3,
        //   name: "Shrek 2",
        //   rating: 1
        // },
        // {
        //   id: 4,
        //   name: "Halo",
        //   rating: 7.5
        // }
      ],
      editGame: {
        name: "",
        rating: ""
      },
      editName: "",
      editRating: "",
      newName: "",
      newRating: ""
    }
  };

  componentDidMount() {
    axios.get('/games')
      .then((response) => {
        console.log(response.data)
        let newGames = response.data.map((game) => {
          return {
            id: game.id,
            name: game.name,
            rating: game.rating,
            developer: game.developer ? game.developer.name : "Indie Developer"
          }
        })
        //console.log("Look here at these new games: !", newGames);
        this.setState({ games: newGames })
        //debugger;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
      })
  }

  handleEditToggle = (e, gameId) => {
    let tempName = '';
    let tempRating = '';
    let newGames = this.state.games.map(game => {
      if (game.id === gameId) {
        tempName = game.name;
        tempRating = game.rating;
        return {
          ...game,
          edit: !game.edit
        }
      } else {
        return {
          ...game,
          edit: false
        };
      }
    });
    this.setState({
      games: newGames,
      editName: tempName,
      editRating: tempRating
    });
  };

  handleDelete = (e, gameId) => {
    axios.delete(`/games/${gameId}`)
    let newGames = this.state.games.filter((game) => (game.id !== gameId));
    this.setState({ games: newGames });
  }

  // handleNewChange = e => {
  //   this.setState({
  //     newGame: {
  //       ...this.state.newGame,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };

  handleChange = e => {
    this.setState({
      // editGame: {
      //   ...this.state.editGame,
      //   [e.target.name]: e.target.value
      // }
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = (e, gameId) => {
    e.preventDefault();
    let updateGame = { name: this.state.editName, rating: this.state.editRating }
    axios.put(`/games/${gameId}`, updateGame)
    let editGames = this.state.games.map(game => {
      if (game.id === gameId) {
        return {
          ...game,
          name: this.state.editName,
          rating: this.state.editRating,
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
    // let newGame = this.state.newGame
    // axios.post('/games', newGame)
    // let tempList = this.state.games.slice();
    // tempList.push(this.state.newGame);
    // tempList[tempList.length - 1].id = this.state.idCounter;
    // this.setState({ games: tempList, idCounter: this.state.idCounter + 1 });
  }

  toggleLogin = (e) => {
    this.setState({ loggedIn: !this.state.loggedIn });
  }

  checkCredentials = (e, inUser, inPassword) => {
    e.preventDefault();
    let verified = false;
    this.state.users.forEach(user => {
      if (inUser === user.email) {
        if (inPassword === user.password) {
          verified = true;
        }
      }
    });
    if (verified === true) {
      this.toggleLogin();
      this.props.history.push('/gameList');
    } else {
      alert('Invalid Username or password');
    }
  }

  logout = (e) => {
    e.preventDefault();
    this.props.history.push('/logout');
    this.toggleLogin();
    setTimeout(() => this.props.history.push('/'), 3000);
  }

  render() {
    // if(this.state.justLoggedIn === true){
    //   return <Redirect to='/GameList' />
    // }
    /*
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
    );*/

    return (
      <div>
        {/*
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
        </form>*/}
        <Header loggedIn={this.state.loggedIn} logout={(e) => this.logout(e)} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={(props) => (<Login checkCredentials={(e, user, password) => this.checkCredentials(e, user, password)} />)} />
          <Route path="/gameList" render={(props) => (<GameList games={this.state.games} handleEditToggle={(e, gameId) => this.handleEditToggle(e, gameId)} handleDelete={(e, gameId) => this.handleDelete(e, gameId)} handleChange={(e, gameId) => this.handleChange(e, gameId)} editName={this.state.editName} editRating={this.state.editRating} handleUpdate={(e, gameId) => this.handleUpdate(e, gameId)} addGame={(e) => this.addGame(e)} newName={this.state.newName} newRating={this.state.newRating} />)} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  };
}

export default withRouter(App);

