import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import LeaderTable from "./LeaderTable.tsx";
import { User } from "../User/User.ts";
// @ts-ignore
import { MockUsers } from "../MockData/MockUsers.ts";
import { userAPI } from "../API/userApi.ts";

const LeaderboardPage = () => {
  // @ts-ignore
  const [users, setUsers] = useState<User[]>([]);
  // @ts-ignore
  const [players, setPlayers] = useState<User[]>([]);
  // @ts-ignore
  const [mockUsers, setMockUsers] = useState<User[]>(MockUsers);

  // @ts-ignore
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      try {
        const data = await userAPI.get();
        setError("");
        setUsers(data);
        setPlayers(data.filter((user) => user.wins + user.loses > 0));
        console.log(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{ height: "100vh", backgroundColor: "grey" }}
    >
      <LeaderTable users={mockUsers} />
    </Container>
  );
};

export default LeaderboardPage;
