import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormContainer, Button, Input, InputArea, Label } from "./styles";

interface Props {
    getUsers: () => void;
    onEdit: any;
    setOnEdit: React.Dispatch<React.SetStateAction<any>>;
  }
  
  const Form: React.FC<Props> = ({ getUsers, onEdit, setOnEdit }) => {
    const [name, setName] = useState("");
    const [socialSecurity, setSocialSecurity] = useState("");
    useEffect(() => {
      if (onEdit) {
        const user = {name, socialSecurity};
  
        if (user) {
          user.name = onEdit.name;
          user.socialSecurity = onEdit.socialSecurity;
        }
      }
    }, [onEdit]);
  
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const user = {name, socialSecurity};
      if (!user) {
        return;
      }
  
      if (! user.name || !user.socialSecurity) {
        return alert("Preencha todos os campos!");
      }
  
      const userData = {
        name:  user.name,
        socialSecurity:user.socialSecurity,
      };
  
      if (onEdit) {
        try {
          await axios.put("http://localhost:8800/user/" + onEdit.userId, userData);
          getUsers();
          setOnEdit(!onEdit)
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          await axios.post("http://localhost:8800/user", userData);
          getUsers();
        } catch (error) {
          alert(error);
        }
      }
    };
  
    return (
      <FormContainer onSubmit={handleFormSubmit}>
        <InputArea>
          <Label>Nome</Label>
          <Input 
           value={name}
           onChange={(e) => setName(e.currentTarget.value)}
           />
        </InputArea>
        <InputArea>
          <Label>CPF</Label>
          <Input 
           value={socialSecurity}
           onChange={(e) => setSocialSecurity(e.currentTarget.value)}
           />
        </InputArea>
  
        <Button type="submit">SALVAR</Button>
      </FormContainer>
    );
  };
  
  export default Form;
