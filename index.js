const express = require('express')
const multer  = require('multer')
const bodyParser = require('body-parser')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    if (req.query.client) {
      cb(null, req.query.client + '-' + file.originalname)
    } else {
      cb(null, file.originalname)
    }
  }
})

// const upload = multer({ dest: './uploads/' })
const upload = multer({ storage: storage })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('ToDo Pila! Node Version...')
})

app.get('/users/check/:username', function(req, res) {
  // TODO:as send back the file timestamps.
})

app.post('/users/:username', upload.any(), function(req, res, next) {
  res.json({message: 'Upload complete...'});
})

app.listen(3000, function() {
  console.log('Listening on port: 3000')
})
