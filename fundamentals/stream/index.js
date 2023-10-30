// Create a Node Stream from zero:

//Import a readable instance from node core
import { Readable, Transform, Writable } from "node:stream"

//Create a class to extend instance with reading props
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

//Writable string example to multiply d number
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//Transform string example to receive a value and tranform
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}



new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())