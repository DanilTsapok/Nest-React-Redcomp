interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  roles: string[];
  isBanned: boolean;
}
export default TokenPayload;
