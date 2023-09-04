import './App.css';
import Router from './Router';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
function App() {
  const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })
  return (
    <ApolloProvider client={client}>
      <Router/>
    </ApolloProvider>
  );
}

export default App;
