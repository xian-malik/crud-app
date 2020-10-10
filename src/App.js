import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './components/List';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">CRUD App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav navbar-right">
              <Nav className="mr-auto">
                <Nav.Link href="/">List</Nav.Link>
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link href="/update">Update</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <List />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
