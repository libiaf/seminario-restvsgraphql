const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

let users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" }
];

// Esquema 
const schema = buildSchema(`

  type User {
    id: Int
    name: String
  }

  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    createUser(name: String): User
    updateUser(id: Int, name: String): User
    deleteUser(id: Int): String
  }

`);

// Funciones
const root = {

  users: () => users,

  user: ({ id }) => {
    return users.find(u => u.id === id);
  },

  createUser: ({ name }) => {

    const newUser = {
      id: users.length + 1,
      name
    };

    users.push(newUser);

    return newUser;
  },

  updateUser: ({ id, name }) => {

    const user = users.find(
      u => u.id === id
    );

    if (!user) return null;

    user.name = name;

    return user;
  },

  deleteUser: ({ id }) => {

    const index = users.findIndex(
      u => u.id === id
    );

    if (index === -1) return "Usuario no encontrado";

    users.splice(index, 1);

    return "Usuario eliminado";
  }

};

app.use("/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running on port 4000");
});

//http://localhost:4000/graphql