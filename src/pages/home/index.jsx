import React from 'react';
import { Typography, Grid, Container, Toolbar, CssBaseline, AppBar, Button, Modal, Box} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { formatData, columns } from "./constants";
import { useLocation } from 'react-router-dom';

const clientId = 'c5dfe8f805712f0f0e88';
const clientSecret = "7c10b630520202c13ee98a8551b19b3fb34adb54"
const redirectUri = 'https://issue-tracker-1grid.000webhostapp.com/';
const token = "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";
const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

const Home = () =>{
    const [issues, setIssues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');

    const fetchIssues = async () => {
        const config = {
            owner: '1-grid',
            repo: 'GitIntegration',
            accessToken: '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'
        };
        const url = `https://api.github.com/repos/${config.owner}/${config.repo}/issues?state=all&per_page=100`
        const request =  await fetch(url, {
            headers: {
                Authorization: `${config.accessToken}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'DDN'
            },
        });
        const response = await request.json();
        console.log(response);
        setIssues(formatData(response));
    }

    const handleModal = () => {
        setShowModal(!showModal);
    }


    

    const  createIssue = async () =>{
        const owner = "1-grid";
        const repo = "GitIntegration";
        const token = "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";
        const ownerId = "bf56b82110ed92bfc649"
        const ownerSecret = "7c10b630520202c13ee98a8551b19b3fb34adb54"
      
        // const apiUrl = 'https://api.github.com/repos/1-grid/GitIntegration/issues';
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

        const data = {
          title: 'New Issue',
          body: 'This is a new issue created using the GitHub API.',
          labels: ['bug'],
        };

        const options = {
          method: 'POST',
          headers: {
            // Authorization: `Basic ${ownerId}:${ownerSecret}`,
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
            // Accept: 'application/vnd.github.v3+json',
            Accept: 'application/json',
            'User-Agent': 'DDN',
          },
          body: JSON.stringify(data),
        };

        fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
          // process the response data
          console.log(data);
        })
        .catch(error => {
          // handle the error
          console.log(error);
        });

    }

    const exchangeCodeForToken = async () => {
      try {
          const response = await fetch('https://github.com/login/oauth/access_token', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify({
                  client_id: clientId,
                  client_secret: clientSecret,
                  code: code,
                  redirect_uri: redirectUri
              })
          });

          const data = await response.json();
          const accessToken = data.access_token;

          // Store the access token in local storage for future requests
          localStorage.setItem('accessToken', accessToken);
      } catch (error) {
          console.error(error);
      }
  }
    useEffect(() => {
        if (code) {
            return exchangeCodeForToken();
        }
    },[])


    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h4">Issue Tracker</Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    {/* <Modal 
                        // open={showModal}
                        // onClose={handleModal}
                        // aria-labelledby="modal-modal-title"
                        // aria-describedby="modal-modal-description"
                    >


                    </Modal> */}
                    {/* <Modal>

                    </Modal> */}
                    <a href={authUrl}>Login</a>
                    <Container maxWidth="md">
                        <br />
                        <Button variant="contained" onClick={createIssue}>Create new Issue</Button>
                        {/* <Button variant="contained" onClick={handleModal}>Create new Issue</Button> */}
                        <br /><br /><br />
                        <DataGrid
                            rows={issues}
                            columns={columns}
                            initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 5,
                                  },
                                },
                            }}
                            rowsPerPageOptions={[5,10]}
                            disableRowSelectionOnClick
                            getRowId={(row) =>  row.number}
                        />
                    </Container>
                </div>
            </main>
        </>
    )
}


export default Home;