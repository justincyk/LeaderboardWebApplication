import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import LeaderTable from "./LeaderTable.tsx";
import { User } from "../User/User.ts";
// @ts-ignore
import { MockUsers } from "../MockData/MockUsers.ts";
import { userAPI } from "../API/userApi.ts";
import TemporaryDrawer from "../Features/TemporaryDrawer.tsx";
import AddPlayer from "../Features/AddPlayer.tsx";
// import Typography from "@mui/material/Typography";
import AddMatch from "../Features/AddMatch.tsx";
import { Matches } from "../User/Matches.ts";
import { matchAPI } from "../API/matchApi.ts";
import { Player } from "../User/Player.ts";
import UserBio from "../Features/UserBio.tsx";

const LeaderboardPage = () => {
  const containerStyle: React.CSSProperties = {
    backgroundImage: `url("../images/leaderboardBackground.gif")`,
    // backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "hidden",
    // Add more styling properties as needed
  };

  // @ts-ignore
  const [users, setUsers] = useState<User[]>([]);
  // @ts-ignore
  const [players, setPlayers] = useState<User[]>([]);
  // @ts-ignore
  const [mockUsers, setMockUsers] = useState<User[]>(MockUsers);
  // @ts-ignore
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const [newMatchLoading, setNewMatchLoading] = useState<Boolean>(false);
  // @ts-ignore
  const [addNewPlayerLoading, setNewPlayerLoading] = useState<Boolean>(false);

  const [openAddPlayer, setOpenAddPlayer] = useState<boolean>(false);

  const [openAddMatch, setOpenAddMatch] = useState<boolean>(false);

  const [openUserBio, setOpenUserBio] = useState<boolean>(false);

  async function addNewPlayer(newPlayer: Player) {
    await userAPI
      .post(newPlayer)
      .then((newPlayer) => {
        console.log(newPlayer);
        setNewPlayerLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
    const newUsers = await userAPI.get();
    setUsers(newUsers);
    setPlayers(
      newUsers.filter((user) => {
        return user.wins + user.loses >= 5;
      }),
    );
    setNewPlayerLoading(false);
  }

  async function addNewMatch(newAddMatch: Matches) {
    await matchAPI
      .post(newAddMatch)
      .then((newAddMatch) => {
        console.log(newAddMatch);
        setNewMatchLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
    const newUsers = await userAPI.get();
    setUsers(newUsers);
    setPlayers(
      newUsers.filter((user) => {
        return user.wins + user.loses >= 5;
      }),
    );
    setNewMatchLoading(false);
  }

  const handleAddPlayerClose = () => {
    setOpenAddPlayer(false);
  };
  const handleAddPlayerOpen = () => {
    setOpenAddPlayer(true);
  };

  const handleAddMatchClose = () => {
    setOpenAddMatch(false);
  };
  const handleAddMatchOpen = () => {
    setOpenAddMatch(true);
  };

  const handleUserBioOpen = () => {
    setOpenUserBio(true);
  };

  const handleUserBioClose = () => {
    setOpenUserBio(false);
  };

  // @ts-ignore
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function loadUsers() {
      setNewMatchLoading(false);
      setNewPlayerLoading(false);
      setLoading(true);
      try {
        const data = await userAPI.get();
        setError("");
        setUsers(data);
        setPlayers(data.filter((user) => user.wins + user.loses > 4));
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
    <Container maxWidth={false} disableGutters style={containerStyle}>
      <AddPlayer
        openAddPlayer={openAddPlayer}
        handleAddPlayerClose={handleAddPlayerClose}
        users={users}
        addNewPlayer={addNewPlayer}
      />
      <AddMatch
        openAddMatch={openAddMatch}
        handleAddMatchClose={handleAddMatchClose}
        users={users}
        addNewMatch={addNewMatch}
      />
      <UserBio
        openUserBio={openUserBio}
        handleUserBioClose={handleUserBioClose}
        users={users}
      />
      <TemporaryDrawer
        openAddPlayer={openAddPlayer}
        handleAddPlayerOpen={handleAddPlayerOpen}
        handleAddMatchOpen={handleAddMatchOpen}
      />
      <div
        style={{
          textAlign: "center",
          fontFamily: "AtariFont",
          paddingTop: "3rem",
          fontSize: "6.8vw",
          color: "#c026d3",
        }}
      >
        Leaderboard
      </div>
      <LeaderTable users={players} handleUserBioOpen={handleUserBioOpen} />
    </Container>
  );
};

export default LeaderboardPage;
