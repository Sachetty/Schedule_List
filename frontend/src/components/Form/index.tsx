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
  
      if (! user.name || !user.socialSecurity || !isSocialSecurity(socialSecurity)) {
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

    const formatSocialSecurity = (value: string) => {
      const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
      return value.replace(cpfRegex, "$1.$2.$3-$4");
    };

    const isSocialSecurity = (cpf: string) => {
      const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
      return cpfRegex.test(cpf);
    };

    const handleSocialSecurity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numericValue = value.replace(/\D/g, "");
      setSocialSecurity(numericValue);
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
           value={formatSocialSecurity(socialSecurity)}
           onChange={handleSocialSecurity}
           />
        </InputArea>
  
        <Button type="submit">SALVAR</Button>
      </FormContainer>
    );
  };
  
  export default Form;
