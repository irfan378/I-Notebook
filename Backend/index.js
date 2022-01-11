const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const path = require('path')

connectToMongo();
const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

//Available Routes.  
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static("inotebook/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'inotebook', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
