import React, { useState } from "react";
import "./registration-view.scss";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("https://nameless-mesa-66831.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        props.onRegisterSuccess();
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  // SO in this view we try to create a user on our database, by sending a POST request to the server
  // If user can register successfully, we show them the login view, if not, we ask them to register with different info
  // Then how do we tell the main view that user register succesfully or not? => we can use props in this case
  // props is something we pass to this view from the main view

  // TODO:
  /*
  - the server is broken, we can not send request to, we need to fix it on heroku
  - then we need to test if we can register or not
  - then implement the login in a very similar way as register
  - style the page. that's it
  */

  return (
    <Container>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => createUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => createPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => createEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Control
            type="text"
            placeholder="Enter Date of Birth"
            value={birthday}
            onChange={(e) => createBirthday(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="btn-lg btn-secondary"
          type="submit"
          onClick={handleRegister}
        >
          Register
      </Button>
      </Form>
    </Container>
  );
}
RegistrationView.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};
