// Create a Node Stream from zero:

//Import a readable instance from node core
import { Readable } from "node:stream"

//Create a class to extend instance with reading props
class OneToHundredStream extends Readable {
  index = 1

  //function to get default index and increments one number
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

new OneToHundredStream().pipe(process.stdout)