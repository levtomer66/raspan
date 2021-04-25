const app = require('../app')
const axios = require('axios')

app.get('/api/raspan', async (req, res) => {
    const headers = {
        'preparedvisittoken': '4437e9aa-9808-4541-950d-2802cc13fb37',
        'application-api-key': '8640a12d-52a7-4c2a-afe1-4411e00e3ac4',
        'authorization': 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InljeDFyWFRmalRjQjZIQWV1aGxWQklZZmZUbyJ9.eyJpc3MiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJhdWQiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJuYmYiOjE2MTkzMDYxOTgsImV4cCI6MTY1MDQxMDE5OCwidW5pcXVlX25hbWUiOiJjZjBhM2E4ZS1lZmMyLTRlN2EtOTJjMS04ZTc1OTgzYTQ1YTYifQ.ZHj5wgZNrpMYzbo0toQRJXEZWUK1Uw8wRG1GAaTtHL8V4rYZr96fN4dVXq2ftqDTeYQ48jRBt4EfspxfollSc0pf4e64XGpLzsASaS-5PHCvgSg4ELJF0NtwS1j7_DmtOuCF0dyWemA4pb-DBbr8zXizqEqyO9s60crWJ5hh__bOibyIhBczjq4NZjZ-kkbbaMp014zq1SKhYUc1IYZKbNR563Yu8hq2MzHhlVRd5ycaMS7rL3rzY_50wPB6pxou10ajcchTGY6GV0LTniCCdqrMZzaxpu_TgIl1U1AlToZw1mcOmTSk0QPIjcBUF68DT9UIk2WPPunWP3rca5S1pw',
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
    if (result['TotalResults'] > 0) {
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
