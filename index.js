const express = require("express");
const app = express()

const users =[{
    name : "john",
    kidneys :[{
        healthy : false
    }]
}];
app.use(express.json());

app.get("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length ;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy){

            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    } 
    const numberOfUnealthyKidneys = numberOfKidneys - numberOfHealthyKidneys ; 
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnealthyKidneys
    })
})
app.post("/", function(req, res){
    // like for the get how we use the enquiry same here we be using the body here
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg : "hoga jaare ab"
    })
})
// replacing a kidney and making it healthy
app.put("/", function(req, res){
    // basically we are running a for loop where we are generating a put req where we will be updating the every unhealthy kidney to healthy
    for(let i=0; i< users[0].kidneys.length; i++)
    users[0].kidneys[i].healthy = true ;
res.json({});
})
// we are here creating the delete req where we can remove all the unhealthy kidneys
app.delete("/", function(req, res){
    if(isThereAtleastOneUnhealthyKidney()){

        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                // here we are pushing the healthy kidneys when ever there is an unhealthy kidney
                newKidneys.push({
                    healthy : true 
                })
            }
            // hence this removes all the unhealthy kidneys 
        }
        users[0].kidneys = newKidneys;
        res.json({msg:"hoga re nikal daliya poore unhealthy kidneys tere"});
    }else{
        res.status(411).json({
            msg : " unheatlhy kidney nai hai jaa wrong input daal nakko re"
        })
    }
})
// basically here we have created a function where if at initial state there is no unhealthy kidney then fs there we should throw an 411 indicating that there are no unhealthy kidney
function isThereAtleastOneUnhealthyKidney(){
    let AtleastOneUnhealthyKidney =false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            AtleastOneUnhealthyKidney = true;
}
return AtleastOneUnhealthyKidney ;
    }
}
app.listen(3000);