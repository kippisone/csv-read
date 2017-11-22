CSVRead
=======

Read a CSV file using streams. Optimized for big files.

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
