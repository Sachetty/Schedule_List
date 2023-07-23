import React, { useEffect, useState } from "react";
import { Container, Title, Search , SearchIcon, Button} from "./styles";
import { APIUser } from "../../API";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "../../components/Grid";
import axios from "axios";
import Form from "../../components/Form";

interface Data {
  user: APIUser[];
  error?: string;
}

const User: React.FC = () => {
  const [data, setData] = useState<Data>({ user: [] });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [onEdit, setOnEdit] = useState<number | null>(null);

  const getUsers = async () => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name") || "";

    let apiURL = "http://localhost:8800/user";
    if (name) {
      apiURL += `?name=${name}`;
    }

    try {
      const response = await axios.get(apiURL);
      setData({ user: response.data });
    } catch (error) {
      setData({ user: [], error: "Not found!" });
    }
  };

  useEffect(() => {
    getUsers();
  }, [location.search]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    navigate(`?name=${search.toLowerCase().trim()}`);
  }

  if (!data.user) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Title>USUÁRIOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Search onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Button type="submit">
        <SearchIcon/>
        </Button>
      </Search>
      <Grid setOnEdit={setOnEdit} users={data.user} setUsers={setData} />
    </Container>
  );
};

export default User;