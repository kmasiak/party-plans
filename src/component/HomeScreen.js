import React, { Component } from "react";
import "../css/HomeScreen.css";

import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewIcon from "@material-ui/icons/Visibility";
import TextField from "@mui/material/TextField";

import PartyPlans from "../images/party-plans.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Link, Redirect } from "react-router-dom";

class HomeScreen extends Component {
  render() {
    const {
      friends,
      parties,
      collections,
      first_name,
      logged_in,
      onLogout,
      collection_open,
      friend_open,
      setShowPassword,
      handleFemail,
      onAddFriend,
      onAddCollection,
      handleCollectionName,
      onRemoveFriend,
      onRemoveCollection,
      onViewFriend,
      friend_email,
      onViewCollection,
    } = this.props;

    if (!logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img className="img2" src={PartyPlans} alt="Party Plans Logo" />

          <h1
            style={{ marginTop: "auto", marginBottom: "auto" }}
            className="h1"
          >
            Welcome, {first_name}
          </h1>

          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
            }}
            variant="contained"
            endIcon={<PersonAddIcon />}
            onClick={() => setShowPassword(friend_open, "fo")}
          >
            Add Friend
          </Button>
          <Dialog
            open={friend_open}
            onClose={() => setShowPassword(friend_open, "fo")}
          >
            <DialogTitle>Add a Friend</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Friend Email"
                type="email"
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 45 }}
                onChange={handleFemail}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPassword(friend_open, "fo")}>
                Cancel
              </Button>
              <Button onClick={() => onAddFriend(friend_email)}>Submit</Button>
            </DialogActions>
          </Dialog>
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "auto",
            }}
            variant="contained"
            endIcon={<ListIcon />}
            onClick={() => setShowPassword(collection_open, "co")}
          >
            Create Collection
          </Button>
          <Dialog
            open={collection_open}
            onClose={() => setShowPassword(collection_open, "co")}
          >
            <DialogTitle>Create a Collection</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Collection Name"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 45 }}
                onChange={handleCollectionName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowPassword(collection_open, "co")}>
                Cancel
              </Button>
              <Button onClick={onAddCollection}>Submit</Button>
            </DialogActions>
          </Dialog>
          <Button
            style={{
              backgroundColor: "#dc143c",
              color: "white",
              margin: "5px",
              height: "0%",
            }}
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%" }}>
            <TableContainer
              component={Paper}
              style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      First Name
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      Last Name
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {friends.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.f_name}
                      </TableCell>
                      <TableCell align="left">{row.l_name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                          onClick={() => onViewFriend(row.email, row.f_name)}
                          component={Link}
                          to="/friend"
                        >
                          View Profile
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<DeleteIcon />}
                          onClick={() => onRemoveFriend(row.email)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: "50%" }}>
            <TableContainer
              component={Paper}
              style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#dc143c" }}>
                    <TableCell align="left" style={{ color: "white" }}>
                      My Collections
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collections.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.list_name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<ViewIcon />}
                          onClick={() =>
                            onViewCollection(row.list_id, row.list_name)
                          }
                          component={Link}
                          to="/view-collection"
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#dc143c", color: "white" }}
                          endIcon={<DeleteIcon />}
                          onClick={() =>
                            onRemoveCollection(row.list_id, row.list_name)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <br />
        <TableContainer
          component={Paper}
          style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#dc143c" }}>
                <TableCell align="left" style={{ color: "white" }}>
                  Party
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Date
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {parties.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.time}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<LinkIcon />}
                      onClick={() => window.open(row.url)}
                    >
                      Link
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<ViewIcon />}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#dc143c", color: "white" }}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default HomeScreen;
