const fs = require('fs');
const CSVStream = require('csv-stream');
class CSVRead {
  constructor (readStream, opts) {
    opts = opts || {};
    const options = {
      delimiter: opts.delimiter || ',',
      endLine: opts.newline || '\n',
      escapeChar: opts.quote || '"',
      enclosedChar: opts.quote || '"',
      columns: opts.columns || null
    };
    const csvStream = CSVStream.createStream(options);
    readStream.pipe(csvStream);
    const res = [  ];
    csvStream.on('error', (err) => {
      this.__reject(err);
    }).on('data', (data) => {
      const parsedData = this.__parseFn(data, res.length);
      if (parsedData !== null) {
        res.push(parsedData === undefined ? data : parsedData);
      }
    }).on('end', (end) => {
      this.__resolve(res);
    });
  }

  static load (file, opts) {
    const stream = fs.createReadStream(file);
    return new CSVRead(stream, opts);
  }

  static stream (readStream) {
    return new CSVRead(readStream);
  }

  then (fn) {
    const p = new Promise((resolve, reject) => {
      this.__resolve = resolve;
      this.__reject = reject;
    });
    p.then(fn);
    return p;
  }

  parse (fn) {
    this.__parseFn = fn;
    return this;
  }
}
module.exports.default = CSVRead;
module.exports = { CSVRead: CSVRead };
module.exports.__esModule = true;
