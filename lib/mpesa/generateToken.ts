// lib/mpesa/generateToken.ts
import axios from "axios";

/**
 * Generates an access token for Mpesa API
 * @returns {Promise<string>} The access token
 */
export async function generateMpesaToken(): Promise<string> {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error("Mpesa consumer key or secret is missing in environment variables");
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    const response = await axios.get(
      `${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!response.data?.access_token) {
      throw new Error("Failed to generate Mpesa access token");
    }

    return response.data.access_token;
  } catch (error: any) {
    console.error("Error generating Mpesa token:", error.message || error);
    throw new Error("Could not generate Mpesa access token");
  }
}