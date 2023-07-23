import { connection } from "../database/connection.js";

const typeEnum = {
  0: 'email',
  1: 'telefone',
};

export const getContact = (req, res) => {
  const query = "SELECT contact.*, user.name AS userName FROM contact INNER JOIN user ON contact.userId = user.userId WHERE contact.userId = ?";
  
    connection.query(query, [req.params.id], (err, data) => {
      if (err) return res.json(err);

      const result = data.map(contact => ({
        ...contact,
        type: typeEnum[contact.type], 
      }));
      return res.status(200).json(result);
    });
  };

  export const addContact = (req, res) => {
    const query =
      "INSERT INTO contact( `type`, `description`, `userId`) VALUES(?)";
  
    const values = [
      req.body.type,
      req.body.description,
      req.body.userId
    ];
  
    connection.query(query, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Contato criado com sucesso.");
    });
  };

  export const updateContact = (req, res) => {
    const query =
      "UPDATE contact SET `type` = ?, `description` = ? WHERE `contactId` = ?";
  
    const values = [
      req.body.type,
      req.body.description,
    ];
  
    connection.query(query, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Contato atualizado com sucesso.");
    });
  };

  export const deleteContact = (req, res) => {
    const query = "DELETE FROM contact WHERE `contactId` = ?";
  
    connection.query(query, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Contato deletado com sucesso.");
    });
  };