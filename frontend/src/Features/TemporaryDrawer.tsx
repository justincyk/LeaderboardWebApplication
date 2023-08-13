import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { createTheme, PaletteColorOptions, ThemeProvider } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

declare module "@mui/material/styles" {
  interface CustomPalette {
    anger: PaletteColorOptions;
    apple: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
    violet: PaletteColorOptions;
  }

  interface Palette extends CustomPalette {}

  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    anger: true;
    apple: true;
    steelBlue: true;
    violet: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
// @ts-ignore
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor("#F40B27"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
  },
});

type Anchor = "right";

interface TemporaryDrawerProps {
  openAddPlayer: boolean;
  handleAddPlayerOpen: () => void;
  handleAddMatchOpen: () => void;
}

export default function TemporaryDrawer({
  handleAddPlayerOpen,
  handleAddMatchOpen,
}: TemporaryDrawerProps) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          key={"Add Player"}
          onClick={handleAddPlayerOpen}
          sx={{
            borderBottom: 1,
            borderTop: 1,
            fontFamily: "AtariFont",
            fontSize: "1.5vw",
            minHeight: "9vh",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            Add Player
          </ListItemButton>
        </ListItem>

        <ListItem
          key={"Add Match"}
          onClick={handleAddMatchOpen}
          sx={{
            borderBottom: 1,
            fontFamily: "AtariFont",
            fontSize: "1.5vw",
            minHeight: "9vh",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <VideogameAssetIcon />
            </ListItemIcon>
            Add Match
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <ThemeProvider theme={theme}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              variant={"outlined"}
              color="steelBlue"
              size="large"
              sx={{
                position: "fixed",
                top: "25px",
                right: "25px",
                color: "white",
                fontSize: "1.8vw",
                fontFamily: "AtariFont",
              }}
            >
              Menu
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </ThemeProvider>
        </React.Fragment>
      ))}
    </div>
  );
}
