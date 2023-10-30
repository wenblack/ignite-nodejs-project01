import htttp from 'node:http'
import { Transform } from 'node:stream'

//Using transform String to receive and change request
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = htttp.createServer(async (req, res) => {
  //Create array for storage pieces of completed strings
  const buffers = []

  //Create async for save pieces of data from array 
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  /*
  Old method
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
  */

  return res.end(fullStreamContent)
})

server.listen(3334)