import { useState } from "react";
import Container from "@mui/material/Container";
import LeaderTable from "./LeaderTable.tsx";
import { User } from "../User/User.ts";
import { MockUsers } from "../MockData/MockUsers.ts";

const LeaderboardPage = () => {
  const [users] = useState<User[]>(MockUsers);
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{ height: "100vh", backgroundColor: "grey" }}
    >
      <LeaderTable users={users} />
    </Container>
  );
};

export default LeaderboardPage;
