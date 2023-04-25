import React from 'react';

const Login = () => {

    const clientId = 'bf56b82110ed92bfc649';
    const redirectUri = 'http://localhost:3001';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo:GitIntegration`;
    return (
        <>
            <a href={authUrl}>Login</a>
        

        </>
    )
}

export default Login;
