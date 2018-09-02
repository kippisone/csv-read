const fs = require('fs')
const CSVStream = require('csv-stream')
console.log(CSVStream)
class CSVRead {
  constructor (readStream, opts) {
    opts = opts || {}
    const options = {
      delimiter: opts.delimiter || ',',
      endLine: opts.newline || '\n',
      escapeChar: opts.quote || '"',
      enclosedChar: opts.quote || '"'
    }
    const csvStream = CSVStream.createStream(options)
    readStream.pipe(csvStream)
    csvStream.on('error', (err) => {
      console.log('ERR', err)
    }).on('header', (cols) => {
      console.log('COLS', cols)
    }).on('data', (data) => {
      console.log('DATA', data)
    }).on('column', (key, val) => {
      console.log('COL', key, val)
    })
  }

  static load (file, opts) {
    const options = {
      encoding: 'buffer'
    }
    const stream = fs.createReadStream(file, options)
    return new CSVRead(stream, opts)
  }

  static stream (readStream) {
    return new CSVRead(readStream)
  }

  then (fn) {
    const p = new Promise((resolve, reject) => {
      this.__resolve = resolve
      this.__reject = reject
    })
    p.then(fn)
    return p
  }

  parse (fn) {
    this.__parseFn = fn
    return this
  }

  parseLine (str) {
    let index = 0
    while (true) {}
    const firstChar = str.charAt(0)
    if (this.quoteReg.test(firstChar)) {
      const startIndex = 1
    }
  }
}
module.exports.default = CSVRead
module.exports = { CSVRead: CSVRead }
module.exports.__esModule = true
