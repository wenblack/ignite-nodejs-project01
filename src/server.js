//use 'node:' to import internal modules
import http from 'node:http'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  //Array of string data
  const buffers = []
  //async function to set/get data for Array
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  //try function to convert data to JSON (for response)
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    console.log(req.body)
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email,
    })
    return res
      .writeHead(201)
      .end()
  }

  return res.writeHead(404)
})

server.listen(3333)