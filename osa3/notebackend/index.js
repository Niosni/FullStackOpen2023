require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World hot reload!</h1>')
})

//UPDATED
app.get('/api/notes', (req, res) => {
  //console.log(Note);
  return Note.find({}).then(notes => {
    res.json(notes)
  })
})

//UPDATED
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
// TODO mongoDB implementation
app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const changedNote = request.body
  if (request.params.id && request.body.content) {
    noteId = notes.indexOf(notes.find(note => note.id === id))
    notes[noteId] = changedNote
  
    response.json(changedNote)
  } else {
    response.status(404).end()
  }

})

//UPDATED
app.delete('/api/notes/:id', (request, response) => {
  Note.deleteOne({"_id": request.params.id}).then(note => {
    response.json(note)
  })
})


//UPDATED
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})