const express = require('express')
const mongodb = require('mongodb').MongoClient;
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080;

let db
const connectionString = `mongodb://localhost:27017/impl-mongodb`

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

app.post('/inputValue', (req, res) => {
    db.collection('data').insertOne({ message: req.body.inputValue })
})

app.get('/messages', function (req, res) {
    db.collection('data')
      .find()
      .toArray(function (err, items) {
        res.send(items)
      })
  })

app.listen(PORT, console.log(`Server started on port ${PORT}`));