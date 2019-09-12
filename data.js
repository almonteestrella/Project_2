const request = require('request');

const options = {
    url: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=c4052ff7-a09d-4eaf-84e6-6669519f413d',
    method: 'GET'
}

request(options, function(err, res, body){
    json = JSON.parse(body)
    // console.log(json)
    for (i in json["result"]["resources"]){
        console.log(json["result"]["resources"][i])
    }
})