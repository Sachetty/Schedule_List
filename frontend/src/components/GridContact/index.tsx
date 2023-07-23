import React from "react";
import { Table, Tbody, Td, Tr, EditIcon, TrashIcon, Thead, Th } from "./styled";
import axios from "axios";
import { APIContact } from "../../API";
import { Button } from "../Form/styles";

interface Data {
  contact: APIContact[];
  error?: string;
}

interface Props {
  contacts: APIContact[];
  setContacts: React.Dispatch<React.SetStateAction<Data>>;
  setOnEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const ContactGrid: React.FC<Props> = ({ contacts, setContacts, setOnEdit }) => {
  const handleEdit = (item: any) => {
    setOnEdit(item);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("http://localhost:8800/contact/" + id);
      const newArray = contacts.filter((contacts) => contacts.contactId !== id);

      setContacts({ contact: newArray });
    } catch (error) {
      console.error(error);
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Descrição</Th>
          <Th>Tipo</Th>
          <Th>Usuário</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contacts.map((item, i) => (
          <Tr key={item.userId}>
            <Td >{item.description}</Td>
            <Td >{item.type}</Td>
            <Td >{item.userName}</Td>
            <Td alignCenter width="5%">
              
            <Td alignCenter width="5%">
                <Button onClick={() => handleEdit(item)}>
                <EditIcon/>
                </Button>
            </Td>

             <Td alignCenter width="5%">
               <Button onClick={() => handleDelete(item.contactId)}>
                <TrashIcon/>
                </Button>
            </Td> 
            </Td>  
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ContactGrid;