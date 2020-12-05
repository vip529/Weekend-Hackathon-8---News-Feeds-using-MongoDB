const express = require('express');
const { newsArticleModel } = require('./connector');
const app = express()
const port = 8080

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds',(req,res)=>{
    const limit  = Object.is(parseInt(req.query.limit),NaN) ? 10 : parseInt(req.query.limit);
    const offset = Object.is(parseInt(req.query.offset),NaN) ? 0 : parseInt(req.query.offset);
    
    newsArticleModel.find({}).limit(limit).skip(offset)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        res.sendStatus(400).json(err);
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;