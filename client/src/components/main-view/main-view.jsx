import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
// import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      view: 'login', 
    };
  }

  componentDidMount() {
    axios
      .get("https://nameless-mesa-66831.herokuapp.com/movies/")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
      });
  }

  resetSelectedMovie() {
    this.setState({
      selectedMovie: null,
    });
  }
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }


  onLoggedIn(user) {
    // Here we need to switch to movies view as well
    // Here we also need to check by sending a request to our server and see if user are allowed to login
    // TODO!!!!!!!!!!!
    const view = 'movies';
    this.setState({
      //console.log(user);
      user,
      view,
    });
  }


  setViewState(view) { // view could be one of ['login', 'register', 'movies']
    this.setState({
      view,
    });
  }

  render() {
    //   // If the state isn't initialized, this will throw on runtime
    //   // before the data is initially loaded
    const { movies, selectedMovie, user, view } = this.state;

    if (view === 'login') { 
      return (<>
        {/* {navbar} */}
        <Navbar bg="light">
          <Button variant="primary" size="sm ml-2 mr-2" onClick={() => this.setViewState('login')}>Login</Button>
          <Button variant="primary" size="sm" onClick={() => this.setViewState('register')}>Register</Button>
        </Navbar>
        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
      </>);
    } else if (view === 'register') { 
      return (
        <>
          {/* {navbar} */}
          <Navbar bg="light">
            <Button variant="primary" size="sm ml-2 mr-2" onClick={() => this.setViewState('login')}>Login</Button>
            <Button variant="primary" size="sm" onClick={() => this.setViewState('register')}>Register</Button>
          </Navbar>
          <RegistrationView
            onRegisterSuccess={() => this.setViewState('login')}
          />
        </>
      );
    }
    // Login view is fine, now we care about the registration view
    // Or we only need one props, incase register fine, if not, we handle it there
    // We pass two props to the RegistrationView, corresponding to the 2 cases
    // The alreadyMember and onSignedIn we don't use yet
    // Then view is always login, as we don't change it, we need to change it to another view when user clicks on sth

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    // We don't need the Nav, instead we need to havw 2 buttons, to switch between login and register
    // Is it clear? But we don't have the function setViewState defined yet, we can do it now :D
    // Let's try it and see how many errors we get
    // Navbar should appear in the movies view as well, it;s not so nice because we duplicate the Nav, let's do it better
    return (
      <>
        {}
        {/* {navbar} */}
        <Navbar bg="light">
          <Button variant="primary" size="sm ml-2 mr-2" onClick={() => this.setViewState('login')}>Login</Button>
          <Button variant="primary" size="sm" onClick={() => this.setViewState('register')}>Register</Button>
        </Navbar>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
            <div className="main-view card-deck">
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={(movie) => this.onMovieClick(movie)}
                />
              ))}
            </div>
          )}
      </>
    );
  }
}
