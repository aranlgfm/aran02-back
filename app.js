var express = require('express')
var env = require('dotenv').config()
var cors = require('cors')
var app = express()
var router = express.Router()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var Feel = require('./entity/feel')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.use(cors())

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('successfully connected to mongoDB!!'))
    .catch(e => console.log(e))

app.listen(process.env.PORT || 3001, () => {
    console.log('server start')
})

// 메인 화면
router.get('/', (req, res) => {
    // res.send('success!!')
    console.log('test')
    Feel.find((err, feels) => {
        if (err)
            return res.status(500).send('feels find failure')
        res.status(200).send(feels)
    })
})

// 기분 생성
router.post('/add', (req, res) => {
    Feel.create({
        feeldate: req.body.date,
        feelfeel: req.body.feel,
        feeltext: req.body.comment
    }, (err, feel) => {
        if (err) return res.status(500).send('fail!!')
        res.status(200).redirect('/')
    })
})