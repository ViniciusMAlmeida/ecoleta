import express from "express"

const app = express()

app.get("/users", (request, response) => {
  response.json(["joao", "maria", "josess"])
})

app.listen(3333)
