const express = require('express');
const config =  require('./config')
const app = express();
const url = "base url";

// app.get('/', (req, res) => {
// res.json({ status: 200 });
// })
// app.listen(config.port, () => {
//     console.dir('Server up at ' + config.port + ' and bot stats running');
// });
// this is bot btw not api nethir site
const dbd = require('dbd.js')
const bot = new dbd.Bot({
token: config.token, 
prefix: config.prefix,
fetchinvites: true,
})
bot.onMessage();
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
bot.command({
    name: "check-perm",
    code: `
    Connect    : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;connect]==true];true;✅];false;❌]
    Speak      : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;speak]==true];true;✅];false;❌]
    Deafen     : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;deafenmembers]==true];true;✅];false;❌]
    Reactions  : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;addreactions]==true];true;✅];false;❌]
    Messages   : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;managemessages]==true];true;✅];false;❌]
    Embed Links: $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;embedlinks]==true];true;✅];false;❌]
    admin : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;admin==true];true;✅];false;❌]`
})
require('./mod')(bot);
bot.command({
    name: "funcs",
    code: `$author[$jsonRequest[https://dbdjs.leref.ga/functions/$noMentionMessage;description;{author:Failed rendering.}]$jsonRequest[https://dbdjs.leref.ga/functions/$noMentionMessage;message]]
  $title[$jsonRequest[https://dbdjs.leref.ga/functions/$noMentionMessage;usage;{title:Failed rendering.}]]
  $color[$getUserVar[color]]
  $addTimestamp
  $argsCheck[>1;Functions?]
  $onlyif[$getVar[owids];$authorID]==true;]`
  });

  
bot.command({
    name: "reboot",
    code: `$reboot //<- Change this, if was different//
  $wait[500ms]
  $sendMessage[Rebooting.. {edit:200ms:{Turning off..}};no]
  $onlyif[$getVar[owids];$authorID]==true;]`
  });
  
  bot.command({
    name: "eval",
    code: `$eval[$message]
    $onlyif[$getVar[owids];$authorID==true;]`
  });
  bot.variables({
    prem: "false",
    adlink: "discord.gg/somecode",
    adname: "Made by bots/sites",
    owids: "",
    color: "RANDOM",
  })
require('./music.js')(bot);
