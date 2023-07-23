import React, { useEffect, useState } from "react";
import { Container, Title } from "./styles";
import { APIContact } from "../../API";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactGrid from "../../components/GridContact";
import FormContact from "../../components/FormContact";

interface Data {
  contact: APIContact[];
  error?: string;
}

const Contact: React.FC = () => {
  const [data, setData] = useState<Data>({ contact: [] });
  const { userId } = useParams();
  const [onEdit, setOnEdit] = useState<number | null>(null);

  const getContacts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/contact/${userId}`
      );
      setData({ contact: response.data });
    } catch (error) {
      setData({ contact: [], error: "Repository not found!" });
    }
  };

  useEffect(() => {
      getContacts();
  }, [userId]);

  if (!data?.contact) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
        <Title>Contatos</Title>
      <FormContact
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getContacts={getContacts}
        userId={parseInt(userId!)}
      />
      <ContactGrid
        setOnEdit={setOnEdit}
        contacts={data.contact}
        setContacts={setData}
      />
    </Container>
  );
};

export default Contact;
