import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

//Users will need to provide their own Google Client ID in order to utilize OAuth 2.0
const clientId = 'YOUR_GOOGLE_CLIENT_ID';

const GoogleOAuth: React.FC = () => {
    const handleLoginSuccess = (response: CredentialResponse) => {
        console.log('Login Success:', response);
        // Handle the successful login here, send the token to your backend
    };

    const handleLoginFailure = (error: void) => {
        console.log('Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="google-oauth">
                <h2>Sign in with Google</h2>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleOAuth;