import React from "react";
import { Table, Th, Tbody, Thead, Td, Tr, EditIcon, TrashIcon, InfoContactIcon} from "./styles";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { APIUser } from "../../API";
import { Button } from "../Form/styles";

interface Data {
  user: APIUser[];
  error?: string;
}

interface Props {
  users: APIUser[];
  setUsers: React.Dispatch<React.SetStateAction<Data>>; 
  setOnEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const Grid: React.FC<Props> = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item: any) => {
    setOnEdit(item);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("http://localhost:8800/user/" + id);
      const newArray = users.filter((user) => user.userId !== id);

      setUsers({ user: newArray });
    } catch (error) {
      console.error(error);
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>CPF</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td>{item.name}</Td>
            <Td>{item.socialSecurity}</Td>
            <Td alignCenter width="5%">
            <Td alignCenter width="5%">
                <Button onClick={() => handleEdit(item)}>
                <EditIcon/>
                </Button>
            </Td>
             <Td alignCenter width="5%">
               <Button onClick={() => handleDelete(item.userId)}>
                <TrashIcon/>
                </Button>
            </Td> 
            <Td alignCenter width="5%">
            <Link to={`/contact/${item.userId}`}>
               <Button>
                <InfoContactIcon/>
                </Button>
              </Link>
            </Td> 
            </Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;