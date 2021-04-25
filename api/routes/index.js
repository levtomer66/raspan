const app = require('../app')
const axios = require('axios')

app.get('/api', async (req, res) => {
    const headers = {
        'preparedvisittoken': '4437e9aa-9808-4541-950d-2802cc13fb37',
        'application-api-key': '8640a12d-52a7-4c2a-afe1-4411e00e3ac4',
        'authorization': 'JWT ' + process.env.MYVISIT_JWT,
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
        'application-name': 'myVisit.com v3.5',
        'origin': 'https://myvisit.com',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://myvisit.com/',
    }
 
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    console.log(`https://central.qnomy.com/CentralAPI/SearchAvailableDates?maxResults=31&serviceId=6142&startDate=${year + "-" + month + "-" + date}`);
    const response = await axios.get(`https://central.qnomy.com/CentralAPI/SearchAvailableDates?maxResults=31&serviceId=6142&startDate=${year + "-" + month + "-" + date}`, { headers: headers })
    const result = response.data
    if  (result['Success'] === false) {
        console.log((`"Error [${result['ErrorNumber']}]: ${result['ErrorMessage']}`));
    }
    if (result['TotalResults'] == 0) {
        let msg = `${result['TotalResults']} Available dates!! ${result['Messages']}`
        msg += `\n${result['Results']}`
        console.log(msg);
        const r = await axios.post("https://api.pushover.net/1/messages.json", data = {
            "token": "aq3pkim4zkdrxsribgdnth1fnizq33",
            "user": "uwsqxnsxkcr5zgxoztqhzadfyf4298",
            "message": msg
        })
        console.log(r.data);
    }

    console.log(result);
    return res.status(200).send(result)
    // axios.post(`https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/resources/search`, {"expression": "folder=bots/botimzozli"} ,{ headers: {'Access-Control-Allow-Origin' : '*'}})

})

module.exports = app
