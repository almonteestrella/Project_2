const request = require('request');
var db = require('./models')



const options = {
    url: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=c4052ff7-a09d-4eaf-84e6-6669519f413d',
    method: 'GET'
}

request(options, function(err, res, body){
    json = JSON.parse(body)
    // console.log(json)
    for (i in json["result"]["resources"]){
        getData(json["result"]["resources"][i]["id"])
    }
})


var getData = (a) => {
    request.get(`https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${a}`, function(err, res, body){
        parsed = JSON.parse(body)
        console.log(parsed["result"])
        for (i in parsed["result"]){
            db.Review.create(parsed["result"]).then(newRow => {
                console.log(newRow)
            })
            
        }
    })
}