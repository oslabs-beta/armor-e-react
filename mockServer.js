const express = require ('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:6006',
  credentials: true
}))

app.post('/checkUsername', (req, res) => {
  console.log('hi', req.body)
  const {username} = req.body;
  const response = {available: true, username};
  if (username === 'abcdef' || username === 'abcdefg') response.available = false;
  res.json(response);
})

app.listen(8080, () => {
  console.log('Server listening on port 8080')
}) 