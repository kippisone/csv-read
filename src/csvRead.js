'use strict'

const fs = require('fs');

class CSVRead {
  constructor (file, opts) {
    opts = opts || {}
    const stream = fs.createReadStream(file, {
      encoding: opts.encoding || 'utf8'
    })

    this.delimiter = opts.delimiter || ','
    this.quote = opts.quote || '"'
    this.newline = opts.newline || '\n'

    let lines = '';
    const delimiterReg = new RegExp(this.delimiter)
    const quoteReg = new RegExp(`^${this.quote}|${this.quote}$`)

    stream.on('data', (chunk) => {
      const split = chunk.split(/\n/g)
      split[0] = lines + split[0]
      if (split.length > 1) {
        lines = split.pop()
      } else {
        lines = ''
      }

      split.forEach((line) => {
        const cols = line.split(delimiterReg)

        this.__parseFn(cols.map((c) => c.replace(quoteReg, '')))
      })

    })

    stream.on('end', () => {
      this.__resolve()
    })

    stream.on('error', (err) => {
      this.__reject(err)
    })
  }

  static load (file) {
    return new CSVRead(file)
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
  }
}

module.exports = CSVRead
