import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./login-view.scss";
import PropTypes from "prop-types";
import axios from 'axios';


export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password);
  //   // TODO: we need to check
  //   // By sending a request to the server for authentication then call props.onLoggedIn(username)
  //   // In a very similar way as in registration view, got it?
  //   props.onLoggedIn(username);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://nameless-mesa-66831.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };
  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="btn-lg btn-secondary btn-block"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Form>
  );
}
