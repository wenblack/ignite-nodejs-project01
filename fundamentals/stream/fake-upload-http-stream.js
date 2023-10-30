import { Readable } from 'node:stream'
import fetch from "node-fetch"

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    //Timeout to return String value
    setTimeout(() => {
      if (i >= 100) {
        //reset value on 100 count
        this.push(null)
      } else {
        //Buffer is the type data of node output
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 500)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // adicione essa linha
})