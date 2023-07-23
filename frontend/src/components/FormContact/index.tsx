import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormContainer, Button, Input, InputArea, Label, Select } from "./styled";

interface Props {
    getContacts: () => void;
    onEdit: any;
    setOnEdit: React.Dispatch<React.SetStateAction<any>>;
    userId: number;
  }
  
  const FormContact: React.FC<Props> = ({ getContacts, onEdit, setOnEdit, userId}) => {
    const [typeOptions] = useState(["Email","Telefone"]);
    const [type, setType] = useState<number>(0);
    const [description, setDescription] = useState("");
    
    useEffect(() => {
      if (onEdit) {
        const contact = {type, description};

        if (contact) {
            contact.type = onEdit.type;
            contact.description = onEdit.description;
          }
      }
    }, [onEdit]);
  
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!description) {
        return alert("Preencha todos os campos!");
      }
  
      const contactData = {
        type,
        description,
        userId
      };
  
      if (onEdit) {
        try {
          await axios.put("http://localhost:8800/contact/" + onEdit.contactId, contactData);
          getContacts();
          setOnEdit(null); 
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          await axios.post("http://localhost:8800/contact", contactData);
          getContacts();
        } catch (error) {
          alert(error);
        }
      }
    };
  
    return (
      <FormContainer onSubmit={handleFormSubmit}>
        <InputArea>
          <Label>Type</Label>
          <Select
            value={type}
            onChange={(e) => setType(Number(e.currentTarget.value))}
          >
            {typeOptions.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </Select>
        </InputArea>
        <InputArea>
          <Label>Description</Label>
          <Input
            name="email"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </InputArea>
        <Button type="submit">SALVAR</Button>
      </FormContainer>
    );
  };
  
  export default FormContact;