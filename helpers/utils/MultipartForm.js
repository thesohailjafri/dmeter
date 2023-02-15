const multiparty = require('multiparty')

const promisifyFormParse = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err)
      return resolve([fields, files])
    })
  })
}

module.exports = { promisifyFormParse }
