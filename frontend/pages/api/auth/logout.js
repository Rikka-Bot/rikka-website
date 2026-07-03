// pages/api/auth/logout.js

export default async function handler(req, res) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  res.redirect(`${apiUrl}/logout`);
}
