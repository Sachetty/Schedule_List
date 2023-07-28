import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FormContainer,
  Button,
  Input,
  InputArea,
  Label,
  Select,
} from "./styled";

interface Props {
  getContacts: () => void;
  onEdit: any;
  setOnEdit: React.Dispatch<React.SetStateAction<any>>;
  userId: number;
}

const FormContact: React.FC<Props> = ({
  getContacts,
  onEdit,
  setOnEdit,
  userId,
}) => {
  const [typeOptions] = useState(["Email", "Telefone"]);
  const [type, setType] = useState<number>(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (onEdit) {
      const contact = { type, description };

      if (contact) {
        contact.type = onEdit.type;
        contact.description = onEdit.description;
      }
    }
  }, [onEdit]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !isValidDescription(description)) {
      return alert("Preencha todos os campos corretamente!");
    }
    const contactData = {
      type,
      description,
      userId,
    };

    if (onEdit) {
      try {
        await axios.put(
          "http://localhost:8800/contact/" + onEdit.contactId,
          contactData
        );
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
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === 1) {
      const numericValue = value.replace(/\D/g, "");
      setDescription(numericValue);
    }
    if (type === 0) {
      setDescription(value);
    }
  };

  const formatDescription = (value: string) => {
    if (type === 1) {
      if (value.length === 11) {
        return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else {
        return value.replace(/^(\d{2})(\d{4})(\d{4})$/, "$1 $2-$3");
      }
    }
  };

  const isValidDescription = (value: string) => {
    if (type === 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.log(value);
      return emailRegex.test(value);
    }
    if (type === 1) {
      const telefoneRegex =
        /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
      console.log(value, type);
      return telefoneRegex.test(value);
    }
  };

  console.log(isValidDescription(description));
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
          value={formatDescription(description)}
          onChange={handleDescription}
        />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormContact;
