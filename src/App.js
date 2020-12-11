import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckikhvbwlugjl01xk8ui0dkz4/master",
  cache: new InMemoryCache(),
});

const MY_QUERY = gql`
  {
    posts {
      title
      body
      createdAt
      id
    }
  }
`;

client
  .query({
    query: MY_QUERY,
  })
  .then((res) => console.log(res));

const GetPosts = () => {
  const { loading, error, data } = useQuery(MY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.posts.map(({ title, body, id, createdAt }) => (
    <div className="post-container" key={id}>
      <h1 className="title">
        {title}
      </h1>
      <p className="content">{body}</p>
      <p className="createdAt">{createdAt}</p>
    </div>
  ));
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>This is a simple example of Apollo</h1>
        <GetPosts />
      </div>
    </ApolloProvider>
  );
};

export default App;
