import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLIENT_URL,
} from "../../const/config";

export const OAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${CLIENT_URL}/v1/auth/google/callback`
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const authUrl = OAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});
