CSVRead
=======

Read a CSV file using streams. Optimized for big files.
Reads 1 Million lines in lesser then a second!

```js
const CSVRead = require('csv-read')

const csv = CSVRead.load('./data/test.csv', {
  encoding: 'utf8'
})

csv.parse((line) => {
  console.log(line) // ['col1', 'col2', 'col3']
}).then((numLine) => {
  console.log(`${numLine} lines parsed`)
})
```

### Options

#### delimiter

Set column delimiter, default: `,`

#### quote

Set column quote, default: `"`

#### newline

Set new line char, default: `\n`
