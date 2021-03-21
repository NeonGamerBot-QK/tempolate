const express = require('express');
const config =  require('./config')
const app = express();
const url = "base url";

app.get('/', (req, res) => {
res.json({ status: 200 });
})
app.listen(config.port, () => {
    console.dir('Server up at ' + config.port + ' and bot stats running');
});
// this is bot btw not api nethir site
const dbd = require('dbd.js')
const bot = new dbd.Bot({
token: config.token, 
prefix: config.prefix ,
fetchinvites: true,
})
bot.command({
    name: "help",
    code: `$title[Help list]
    $addfield[Music;\`${config.prefix}help-music\`;yes]
    $addfield[Moderation;\`${config.prefix}help-mod\`;yes]
    $footer[If it does not respond this means that module is DISABLED]
    $cooldown[3s;]`
})
bot.command({
    name: "ping",
    code: `***__Pong__!*** \`$pingms\` api: $botpingms`
})
