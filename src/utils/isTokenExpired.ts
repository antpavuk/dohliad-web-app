const isTokenExpired = (token: string) => {
  const tokenPayload = token.split('.')[1]; // Extract the payload part of the token

  const decodedPayload = new TextDecoder().decode(
    Uint8Array.from(atob(tokenPayload), (c) => c.charCodeAt(0))
  ); // Decode the base64-encoded payload using TextDecoder

  const payloadObject = JSON.parse(decodedPayload);
  const expirationTime = payloadObject.exp; // Access the expiration time from the payload

  const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds

  return expirationTime < currentTime;
};

export default isTokenExpired;
