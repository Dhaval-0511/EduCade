require('dotenv').config()
const express = require('express');
const api_route = require('./routes/api.routes');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.static('public'))

app.use('/api/v1', api_route)

app.get('/', (req, res) => {
  res.send('<h2>Hello World!</h2>')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})