const express = require("express");

const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" }
];


app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const user = users.find(
    u => u.id === id
  );

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  res.json(user);

});

app.post("/users", (req, res) => {

  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json(newUser);

});

app.patch("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const user = users.find(
    u => u.id === id
  );

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  user.name = req.body.name;

  res.json(user);

});

app.delete("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const index = users.findIndex(
    u => u.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  const deletedUser = users.splice(index, 1);

  res.json({
    message: "Usuario eliminado",
    user: deletedUser
  });

});


app.listen(3000, () => {
  console.log("REST CRUD server running on port 3000");
});