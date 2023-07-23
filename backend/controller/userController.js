import { connection } from "../database/connection.js";

export const getUsers = (req, res) => {

  const { name } = req.query;
  let query = "SELECT * FROM user";

  if (name) {
    query += " WHERE name LIKE ?";
  }

  connection.query(query, [`%${name}%`], (err, data) => {
    if (err) {
      console.log("Not connected");
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json(data);
    }
  });
};

export const addUser = (req, res) => {
  const query = "INSERT INTO user( `name`, `socialSecurity`) VALUES(?)";

  const values = [req.body.name, req.body.socialSecurity];

  connection.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const query =
    "UPDATE user SET `name` = ?, `socialSecurity` = ? WHERE `userId` = ?";

  const values = [req.body.name, req.body.socialSecurity];

  connection.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const query = "DELETE FROM user WHERE `userId` = ?";
  const queryFK = "DELETE FROM contact WHERE `userId` = ?";

  connection.query(queryFK, [req.params.id], (err) => {
    if (err) return res.json(err);

    connection.query(query, [req.params.id], (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Usuário deletado com sucesso.");
    });
  });
};
