import React from "react";
import { Navigate as Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from "@mui/material";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container maxWidth="sm" style={{marginTop: "10vh", marginLeft: '10vw'}}>
      <CssBaseline/>
     <Container>
          <Box>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </Box>
      <Box>
        <strong>Id:</strong> {currentUser.id}
      </Box>
      <Box>
        <strong>Email:</strong> {currentUser.email}
      </Box>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      </Container>

    </Container>

  );
};

export default Profile;