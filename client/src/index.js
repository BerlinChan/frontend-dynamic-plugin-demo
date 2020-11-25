import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,  
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({uri: 'http://localhost:4000/graphql',}),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
