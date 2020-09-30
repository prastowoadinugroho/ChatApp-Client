import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter, Switch} from 'react-router-dom';

import ApolloProvider from './AppolloProvider';

import './App.scss';
import Register from './pages/register';
import Login from './pages/Login';
import Home from './pages/home/Home';

import { AuthProvider } from './context/auth';
import { MessageProvider } from './context/message';
import DynamicRoute from './util/DynamicRoute';
function App() {
  
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
          <Container className="pt-3">
            <Switch>
              <DynamicRoute exact path="/" component={Home} authenticated/>
              <DynamicRoute path="/register" component={Register} guest/>
              <DynamicRoute path="/login" component={Login} guest/>
            </Switch>
          </Container>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
