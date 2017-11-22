'use strict'

const path = require('path')
const inspect = require('inspect.js')
const CSVRead = require('../')

describe('CSV Read', () => {
  describe('load', (done) => {
    it('reads a CSV file line by line', () => {
      const opts = {}
      const csv = CSVRead.load(path.join(__dirname, './fixtures/data.csv'), opts)
      csv.parse((line) => {
        inspect(line).isArray()
        inspect(line).hasLength(6)
        inspect(line[0]).doesContain('2017-11-21')
      })

      return csv.then((res) => {
        inspect(res).isUndefined()
      })
    })
  })
})
