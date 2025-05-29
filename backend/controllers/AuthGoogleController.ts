import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { oauth_google } from "../models/oauth_google";
import handleError from "../handleError";
import axios from "axios";

const AuthGoogleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const oauthRequest = {
      url: new URL("https://oauth2.googleapis.com/token"),
      params: {
        client_id: oauth_google.client_id,
        client_secret: oauth_google.client_secret,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: oauth_google.redirect_uri,
      },
    };
    const oauthResponse = await axios.post(oauthRequest.url.toString(), null, {
      params: oauthRequest.params,
    });
    const oauthResponseData = oauthResponse.data;

    const client = new OAuth2Client();

    const fetchUserFromIdToken = async (idToken: string) => {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: oauth_google.client_id,
      });
      const payload = ticket.getPayload();
      return payload;
    };

    const user = await fetchUserFromIdToken(oauthResponseData.id_token);
    res.status(200).json({ data: user, message: "Success" });
  } catch (error) {
    handleError(res, "Something went wrong", error);
  }
};
export default AuthGoogleController;
