const express = require('express')
const port = process.env.PORT || 8081

const app = express()

app.get('/ayy', (req, res) => res.json({ response: 'lmao' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
