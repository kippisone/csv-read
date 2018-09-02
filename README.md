CSVRead
=======

Read a CSV file using streams. Optimized for big files.
Reads 1 Million lines in lesser then a second!

```js
const CSVRead = require('csv-read')

const csv = CSVRead.load('./data/test.csv', {
  delimiter: ';'
})

csv.parse((line, index) => {
  console.log(line) // Line as an object, using keys from first line
}).then((res) => {
  // res contains the full parsed csv as an array
  console.log(`${res.length} lines parsed`)
})
```

### Options

#### *str* delimiter

Set column delimiter, default: `,`

#### *str* quote

Set column quote, default: `"`

#### *str* newline

Set new line char, default: `\n`

#### *arr* columns

Optional, set column keys, if this is not set, the first line is used as column keys

#### *num* columnOffset

Sets the column offset. Defaults to `0`
