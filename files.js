const express = require('express');
const app = express();
const fs = require('fs')

app.get("/files/:Filename", function(req, res){
    const name = req.params.Filename;
    // console.log(name);
fs.readFile(name, "utf-8", function(err, data){
    
    res.json({
        data
    })
})
});
app.listen(3001);