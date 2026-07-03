function getHello(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

module.exports = {
  getHello,
};
