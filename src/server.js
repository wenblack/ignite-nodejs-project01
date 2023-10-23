//use 'node:' to import internal modules
import http from 'node:http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res.end('User List')
  }

  if (method === 'POST' && url === '/users') {
    return res.end('User Create')
  }
  return res.end('Hello World')
})

server.listen(3333)