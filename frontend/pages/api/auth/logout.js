// pages/api/auth/logout.js
// Rota de logout que chama a rota Express
export default async (req, res) => {
  // Redirecionar para a rota Express de logout
  res.redirect('/logout');
}
