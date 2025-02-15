const handleRoot = (req, res) => {
  return res.json({ message: "message from get req on domain/" });
};

export default handleRoot;
