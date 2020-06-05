import express from 'express'

const app = express()

app.use(express.json())

const users = ['joao', 'maria', 'jose']

app.get('/users', (request, response) => {
  const search = String(request.query.search)

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users

  return response.json(filteredUsers)
})

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users[id]
  return response.json(user)
})

app.post('/users', (request, response) => {
  const data = request.body

  return response.json(data)
})

app.listen(3333)
