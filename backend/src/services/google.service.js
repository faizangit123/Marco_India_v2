import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/index.js';

const client = new OAuth2Client(config.google.clientId);

export const verifyGoogleToken = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.google.clientId
  });
  
  const payload = ticket.getPayload();
  return {
    email: payload.email,
    name: payload.name,
    googleId: payload.sub,
    picture: payload.picture
  };
};
