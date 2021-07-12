// const app = require('express')()

// module.exports = app


// const app = require('../app')
const axios = require('axios')

module.exports = async (req, res) => {
    const headers = {
        'preparedvisittoken': '4437e9aa-9808-4541-950d-2802cc13fb37',
        'application-api-key': '8640a12d-52a7-4c2a-afe1-4411e00e3ac4',
        'authorization': 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InljeDFyWFRmalRjQjZIQWV1aGxWQklZZmZUbyJ9.eyJpc3MiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJhdWQiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJuYmYiOjE2MTkyNTYzNjUsImV4cCI6MTY1MDM2MDM2NSwidW5pcXVlX25hbWUiOiJjZjBhM2E4ZS1lZmMyLTRlN2EtOTJjMS04ZTc1OTgzYTQ1YTYifQ.o1s-9MuI-QcuB7vlGOSDw0jwdsUgSZjUiDr2e_67BYs0SmIGfYFvITrQhZpgbqZYArVEW1jL0HxvWl8-Eq_1o69BTWFYrxeMGIAxQf7Mx4-ANkRxc9oUTiB0LOTjePzebqt1yAJaCIGWDWEsYj7Iyz-yL2cttic8QNfWyXCL6z8ovYxGmmGs9H4IK4LhQ3xXvKlOvHsP2cstAP9d50UgZ4D1AuVrgm6NfO3hd3XtF5mJiAwkUX2ry5EcUHRC57ECaVi7I76CST_skYf-93h2zzPHQ3hZ4steyF3z3a4kTlkeTn9HbwhM0rzxZW8ONtz7JrCPL1bJsYG9bNfk63dsSQ',
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
    console.log(`https://central.qnomy.com/CentralAPI/SearchAvailableDates?maxResults=31&serviceId=8886&startDate=${year + "-" + month + "-" + date}`);
    const response = await axios.get(`https://central.qnomy.com/CentralAPI/SearchAvailableDates?maxResults=31&serviceId=8886&startDate=${year + "-" + month + "-" + date}`, { headers: headers })
    const result = response.data
    if  (result['Success'] === false) {
        console.log((`Error [${result['ErrorNumber']}]: ${result['ErrorMessage']}`));
    }
    if (result['TotalResults'] > 0) {
        let msg = `Machines: ${result['TotalResults']} Available dates!!`
        msg += `\n${JSON.stringify(result['Results'])}`
        console.log(msg);
        const r = await axios.post("https://api.pushover.net/1/messages.json", data = {
            "token":   "ah2acbn5tnc7nhwb5umqgjju1k1m6z",
	        "user":    "u85wt371dhctud6d7e29gkhanudcyu",
            "message": msg
        })
        console.log(r.data);
    }
    const navRes = await axios.get(`https://central.qnomy.com/CentralAPI/SearchAvailableDates?maxResults=31&serviceId=8873&startDate=${year + "-" + month + "-" + date}`, { headers: headers })
    const navResult = navRes.data
    if  (navResult['Success'] === false) {
        console.log((`Error [${navResult['ErrorNumber']}]: ${navResult['ErrorMessage']}`));
    }
    if (navResult['TotalResults'] > 0) {
        let nivotMsg = `Navigation: ${navResult['TotalResults']} Available dates!!`
        nivotMsg += `\n${JSON.stringify(navResult['Results'])}`
        console.log(nivotMsg);
        const postData = await axios.post("https://api.pushover.net/1/messages.json", data = {
            "token":   "ah2acbn5tnc7nhwb5umqgjju1k1m6z",
	        "user":    "u85wt371dhctud6d7e29gkhanudcyu",
            "message": nivotMsg
        })
        console.log(postData.data);
    }

    // axios.post(`https://${process.env.API_KEY}:${process.env.API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/resources/search`, {"expression": "folder=bots/botimzozli"} ,{ headers: {'Access-Control-Allow-Origin' : '*'}})

})

module.exports = app
