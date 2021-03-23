module.exports = (bot) => {
bot.variables({
  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}//
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}//

  clearsong: "✅ Cleared queue. from **{amount} song** to **0**", //Available {amount}//
  shuffle: "Shuffling Queue.",
  errorjoin: "You need to join the voice channel first!",
  leavevc: "i have left the vc.",

  join: "Joined Voice Channel to the {join}.", //Available {join}//
  dc: "Disconnected.",

  //Changing Other//
  clientidsoundcloud: "",
  emoji: "https://cdn.discordapp.com/emojis/729630163750354955.gif?size=4096",
  permission: "11889728",
  userid: "default",
  logmusic: "1",
  247: "1", //0 = off | 1 = on stay 2 minutes | 2 = stay 24/7////Change to your channel id, to send message when the bot restart.// 
  vol: "50", //Default Volume//

  customemoji: "💢", //<- You can change it with your emoji.//
  customemoji1: "https://cdn.discordapp.com/emojis/784505856070385664.gif?size=4096",
  customemoji2: "💫",
  customemoji3: "✅", //<- You can change it with your emoji.//
  ytemoji: "https://cdn.discordapp.com/emojis/815033835330863135.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/820998096912646174.png?size=4096",
 
  userused: "0",
  commanduserused: "0",

  //For playlist//
  1: "null",
  2: "null",
  3: "null",
  4: "null",
  5: "null",
  6: "null",
  7: "null",
  8: "null",
  9: "null",
  10: "null"
});



bot.musicStartCommand({
  channel: "$channelID",
  code: `$author[Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Link;[Invite Me\\]($replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]])
[Thumbnail\\]($replaceText[$songInfo[thumbnail];hq720;maxresdefault]);yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Status;\`$replaceText[$replaceText[$checkCondition[$ping<500];true;$replaceText[$replaceText[$hasPerms[$clientID;managemessages];true;200];false;200 (reaction may not stable)]];false;403]\`;yes]
$addField[Region;\`$serverRegion\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[Ping;\`$pingms\`;yes]
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube\\](https://www.youtube.com/)];false;[Soundcloud\\](https://soundcloud.com/)];yes]
$addField[URL;[Video\\]($songInfo[url]);yes] 
$addField[Volume;\`$volume%\`;yes]
$addField[Duration;\`$replaceText[$songInfo[duration];0 Seconds (00:00:00);LIVE]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]\\]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$platform[$songInfo[userID]];desktop];true;Desktop];false;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;Mobile];false;null]];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$footer[CPU: $truncate[$cpu]%;$getVar[emoji]]
$addTimestamp
$thumbnail[$replaceText[$replaceText[$songInfo[thumbnail];hq720;maxresdefault];hqdefault;maxresdefault]]
$color[$getUserVar[color]]
$onlyIf[$getGlobalUserVar[logmusic;$songInfo[userID]]!=1;]
$volume[$getGlobalUserVar[vol;$songInfo[userID]]]
$setGlobalUserVar[userused;$sum[$getGlobalUserVar[userused;$songInfo[userID]];1];$songInfo[userID]]
$suppressErrors`
});

bot.musicEndCommand({
  channel: "$channelID",
  code: `$title[Nothing song again on queue, to play it.]
$footer[Leaved VC.]
$color[$getUserVar[color]]`
});



bot.awaitedCommand({
name: "clearqueueyes",
code: `$clearSongQueue
$editIn[2ms;{description:$replaceText[$getVar[clearsong];{amount};$queueLength]} {color:$getUserVar[color]} {timestamp}] ⚠️ Clearing...
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$queueLength!=0;Nothing song was playing.]`
});

bot.awaitedCommand({
name: "clearqueueno",
code: `$description[Clearing was cancelled.]
$color[$getUserVar[color]]
$addTimestamp
$deleteIn[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$queueLength!=0;Nothing song was playing.]`
});

bot.command({
  name: "play",
  aliases: ["youtube", "p", "yt"],
  code: `$clearReactions[$channelID;$messageID;$getVar[customemoji]]
$addCmdReactions[$getVar[customemoji];$getVar[customemoji3]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$getGlobalUserVar[logmusic];0;Added to queue: \`$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;2m];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\`];1;]]
$djsEval[message.member.voice.channel.join();]
$botTyping[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]`
});

bot.command({
  name: "playskip",
  aliases: ["ps"],
  code: `$clearReactions[$channelID;$messageID;$getVar[customemoji]]
$skipSong
$addCmdReactions[$getVar[customemoji];$getVar[customemoji3]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$getGlobalUserVar[logmusic];0;Added to queue: \`$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;2m];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\` and $replaceText[$getVar[skip];{song};$songInfo[title]]];1;]]
$botTyping[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$queueLength>=1;Require **1 song** to run it.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "spotify",
  code: `$clearReactions[$channelID;$messageID;$getVar[customemoji]]
$addCmdReactions[$getVar[customemoji];$getVar[customemoji3]]
$replaceText[$replaceText[$checkCondition[$playSpotify[$message;name;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[247];0;1];true;yes];false;no];No result.]==];false;];true;]
$djsEval[message.member.voice.channel.join();]
$botTyping[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$argsCheck[>1;Please put link song that from spotify.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "soundcloud",
  aliases: ["sc"],
  code: `$clearReactions[$channelID;$messageID;$getVar[customemoji]]
$addCmdReactions[$getVar[customemoji];$getVar[customemoji3]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$getGlobalUserVar[logmusic];0;Added to queue: \`$playSoundcloud[$message[1];$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;2m];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\`];1;]]
$djsEval[message.member.voice.channel.join();]
$botTyping[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$argsCheck[>1;Please put link song that from soundcloud.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]`
});



bot.command({
  name: "help-music",
  code: `$title[Command List]
$addField[Slash;
> /nowplaying
> /help
> /pause
> /resume
> /stop;no]
$addField[Aliases;
> join = j, summon
> disconnect = dc, bye, leave
> play = p, youtube, yt
> playskip = ps
> soundcloud = sc
> nowplaying = np
> loop = l
> shuffle = sf
> skip = s
> clearqueue = cq
> shuffleskip = sfs
> remove = r
> qloop = ql
> queue = q
> volume = v;no]
$addField[Developer;> reboot, eval, funcs;no]
$addField[Misc;> ping, uptime, stats, slash, invite, check, user-info, user, user-disable;no]
$addField[Control;> playskip, pause, resume, stop, nowplaying, loop, shuffle, stay, shuffleskip, pruning, skip, clearqueue, queue, qloop, seek, remove, volume, filter, playlist-add, playlist-remove, log-on, log-off;no]
$addField[Music player;> play, spotify, soundcloud, playlist-play;no]
$addField[Main;> join, disconnect, playlist;no]
$addTimestamp
$footer[Ping: $pingms - API: $botpingms]
$thumbnail[$userAvatar[$clientID]]
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]`
});


bot.command({
name: "log-off",
code: `$setGlobalUserVar[logmusic;1]
Log music now **disable**
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[logmusic]!=1;Already disable!]
$suppressErrors[]`
})

bot.command({
name: "log-on",
code: `$setGlobalUserVar[logmusic;0]
Log music now **enable**
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[logmusic]!=0;Already enable!]
$suppressErrors[]`
})

bot.command({
name: "filter",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
) bass, pitch, speed

) 3d, chorus, deep, distorted, echo, earwax, flanger, gate, nightcore, phaser, pulsator, pulsator 2x, space, surround, vibrato, vibrato 2x

) all, clear
\`\`\`]
$footer[Usage: filter (usage) (value optional)]
$color[$getUserVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$message[1]==nightcore]
$songFilter[pitch:1.3;speed:0.8]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==bass]
$songFilter[bass:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Bass | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5] dB} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]<=20;Max. **20**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;5]>=-20;Min. **-20**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==surround]
$songFilter[surround:1]
Applying..
$editIn[300ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==flanger]
$songFilter[flanger:1;phaser:0]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==gate]
$songFilter[gate:1]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==chorus]
$songFilter[flanger:1;phaser:1]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==phaser]
$songFilter[phaser:1;flanger:0]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==earwax]
$songFilter[earwax:1]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==pitch]
$songFilter[pitch:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Pitch | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=1.9;Max. **1.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.4;Min. **0.5**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==speed]
$songFilter[speed:$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Speed | $replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]<=1.9;Max. **1.9**]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]!=];true;$message[2]];false;1.1]>0.4;Min. **0.5**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==echo]
$songFilter[echo:100]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==pulsator]
$songFilter[pulsator:0.5]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==pulsator 2x]
$songFilter[pulsator:2]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==distorted]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==vibrato]
$songFilter[vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==vibrato 2x]
$songFilter[vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==space]
$songFilter[echo:1;phaser:1;flanger:0]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = All} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==deep]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$message[1]==3d]
$songFilter[pulsator:0.125]
Applying..
$editIn[2ms;Applying.. $random[1;30]%;Applying.. $random[31;50]%;Applying.. $random[51;70]%;Applying.. $random[71;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getUserVar[color]}]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$endif
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]`
});

bot.command({
  name: "check-music",
  code: `$title[Check]
$description[\`\`\`
Pause      : $replaceText[$replaceText[$checkCondition[$getVar[pause]!=];true;✅];false;❌]
Resume     : $replaceText[$replaceText[$checkCondition[$getVar[resume]!=];true;✅];false;❌]
Skip       : $replaceText[$replaceText[$checkCondition[$getVar[skip]!=];true;✅];false;❌]
Stop       : $replaceText[$replaceText[$checkCondition[$getVar[stop]!=];true;✅];false;❌]
Shuffle    : $replaceText[$replaceText[$checkCondition[$getVar[shuffle]!=];true;✅];false;❌]
Clearqueue : $replaceText[$replaceText[$checkCondition[$getVar[clearsong]!=];true;✅];false;❌]
Join       : $replaceText[$replaceText[$checkCondition[$getVar[join]!=];true;✅];false;❌]
Disconnect : $replaceText[$replaceText[$checkCondition[$getVar[dc]!=];true;✅];false;❌]
Play       : $replaceText[$replaceText[$checkCondition[$getVar[errorjoin]!=];true;✅];false;❌]
ClientID   : $replaceText[$replaceText[$checkCondition[$getVar[clientidsoundcloud]!=];true;✅];false;❌]
UserID     : $replaceText[$replaceText[$checkCondition[$getServerVar[userid]!=default];true;✅];false;❌]
Log Music  : $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[logmusic]!=1];true;✅];false;❌]

0) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[emoji]!=];true;✅];false;❌]
1) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[customemoji]!=];true;✅];false;❌]
2) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[customemoji1]!=];true;✅];false;❌]
3) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[customemoji2]!=];true;✅];false;❌]
4) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[customemoji3]!=];true;✅];false;❌]
5) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[ytemoji]!=];true;✅];false;❌]
6) Emoji   : $replaceText[$replaceText[$checkCondition[$getVar[scemoji]!=];true;✅];false;❌]

Connect    : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;connect]==true];true;✅];false;❌]
Speak      : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;speak]==true];true;✅];false;❌]
Deafen     : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;deafenmembers]==true];true;✅];false;❌]
Reactions  : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;addreactions]==true];true;✅];false;❌]
Messages   : $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;managemessages]==true];true;✅];false;❌]
Embed Links: $replaceText[$replaceText[$checkCondition[$hasPerms[$clientID;embedlinks]==true];true;✅];false;❌]
\`\`\`]
$color[$getUserVar[color]]
$footer[Latency: $pingms]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]`
});

bot.command({
  name: "user-info",
  code: `$author[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]];$userAvatar[$mentioned[1;yes]]]
$addField[Command Used;\`$numberSeparator[$getGlobalUserVar[commanduserused;$mentioned[1;yes]];.]\`;yes]
$addField[Song Played;\`$numberSeparator[$getGlobalUserVar[userused;$mentioned[1;yes]];.]\`;yes]
$addField[Created At; \`$creationDate[$mentioned[1;yes];date]\`;yes]
$color[$getUserVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;{description:\`❌ Oops.. It's like we cant collect data user.\`} {color:$getUserVar[color]}]`
});

bot.command({
  name: "seek",
  code: `$seekTo[$noMentionMessage]
Seek to **$replaceText[$replaceText[$checkCondition[$parseDate[$multi[$noMentionMessage;1000];time]==];true;0 second];false;$parseDate[$multi[$noMentionMessage;1000];time]].**
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$isNumber[$noMentionMessage]!=false;Must number!]
$argsCheck[>1;Usage: \`seek (number)\`]
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`You are playing LIVE Version 🤔\`]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "stay",
  code: `$if[$message==]
$addField[Status;> $replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;stay off];1;stay on];2;stay 24/7];no]
$addField[Stay;> stay off = Turn off.
> stay on = Turn on.
> stay 24/7 = Stay 24/7 on voice channel.;no]
$color[$getUserVar[color]]
$footer[Leave the bot from voice channel, to make it works]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$message==off]
Off. Now no longer to be stay on voice channel.
$setGlobalUserVar[247;0]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[247]!=0;Already inactive!]
$endelseif
$elseif[$message==on]
On. Will be stay **2 minutes** on voice channel.
$setGlobalUserVar[247;1]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[247]!=1;Already active!]
$endelseif
$elseif[$message==24/7]
On. Will be stay **24/7** on voice channel.
$setGlobalUserVar[247;2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[247]!=2;Already active!]
$endelseif
$endif`
});

bot.command({
  name: "join",
  aliases: ["j", "summon"],
  code: `$replaceText[$getVar[join];{join};$channelName[$voiceID]]
$djsEval[message.member.voice.channel.join();]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$voiceID[$clientID]==;Already joined!]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "disconnect",
  aliases: ["dc", "bye", "leave"],
  code: `$djsEval[message.member.voice.channel.leave();]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$getVar[dc]
$onlyIf[$voiceID[$clientID]!=;Already disconnected!]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "slash",
  code: `$sendMessage[On going..;no]
$createSlashCommand[$guildID;nowplaying;Showing What Playing Now]
$createSlashCommand[$guildID;help;Command List]
$createSlashCommand[$guildID;resume;Resume Song]
$createSlashCommand[$guildID;pause;Pause Song]
$createSlashCommand[$guildID;stop;Stop Song]
$editIn[1s;{title:Successfully Created} {description:You need to re-login / [re-invite\\]($replaceText[$getBotInvite;permissions=8;permissions=3501120]), if wanna see slash command.} {color:$getUserVar[color]} {footer:Status = $replaceText[$replaceText[$checkCondition[$getSlashCommandID[nowplaying]!=];true;Update];false;Create]}] Creating..
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyPerms[manageserver;You didnt have permission **Manage Server**.]
$suppressErrors[missing permission / failure.]`
});

bot.command({
  name: "pause",
  code: `$pauseSong
$getVar[pause]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "resume",
  code: `$resumeSong
$getVar[resume]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "loop",
  aliases: ["l"],
  code: `$replaceText[$replaceText[$checkCondition[$loopSong==true];true;Loop now **on**];false;Loop now **off**]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=queue;You currently active **queue loop.**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "qloop",
  aliases: ["ql"],
  code: `$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Queue Loop now **on**];false;Queue Loop now **off**]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=song;You currently active **song loop.**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});



bot.command({
  name: "pruning",
  code: `$replaceText[$replaceText[$checkCondition[$pruneMusic==true];true;Pruning now **on**];false;Pruning now **off**]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
});

bot.command({
  name: "shuffle",
  aliases: ["sf"],
  code: `$sendMessage[$getVar[shuffle];no]
$title[Queue]
$description[$queue[1;10;\`{number} - {title}\`]]
$addTimestamp
$color[$getUserVar[color]]
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "shuffleskip",
  aliases: ["sfs"],
  code: `$sendMessage[$getVar[shuffle] {edit:20ms:{$getVar[skip] $skipSong}};no]
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
});

bot.command({
  name: "remove",
  aliases: ["r"],
  code: `$moveSong[$replaceText[$replaceText[$message[1];-;];1;2];]
$replaceText[$getVar[remove];{d-amount};$replaceText[$message[1];-;]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$message[1]<=$queueLength;Only have **$queueLength song**.]
$onlyIf[$message[1]>1;You cant remove at first song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[1;Usage: \`remove (numnber song on queue)\`]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "nowplaying",
  aliases: ["np"],
  code: `$author[Now Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Link;[Invite Me\\]($replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]])
[Thumbnail\\]($replaceText[$songInfo[thumbnail];hq720;maxresdefault]);yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Status;\`$replaceText[$replaceText[$checkCondition[$ping<500];true;$replaceText[$replaceText[$hasPerms[$clientID;managemessages];true;200];false;200 (reaction may not stable)]];false;403] - $replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;none];1;OK];2;24/7]\`;yes]
$addField[Region;\`$serverRegion\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[Ping;\`$pingms\`;yes]
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube\\](https://www.youtube.com/)];false;[Soundcloud\\](https://soundcloud.com/)];yes]
$addField[URL;[Video\\]($songInfo[url]);yes] 
$addField[Volume;\`$volume%\`;yes]
$addField[Duration;\`$replaceText[$songInfo[duration];0 Seconds (00:00:00);LIVE]\`
\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$songInfo[current_duration]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]\\]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$platform[$songInfo[userID]];desktop];true;Desktop];false;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;Mobile];false;null]];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$footer[Time Remaining: $replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;LIVE];false;$songInfo[duration_left]];$getVar[emoji]]
$addTimestamp
$thumbnail[$replaceText[$replaceText[$songInfo[thumbnail];hq720;maxresdefault];hqdefault;maxresdefault]]
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[song not load on queue. $error]`
});

bot.command({
  name: "stop",
  code: `$stopSong
$sendMessage[$getVar[leavevc];no]
$sendMessage[$getVar[stop];no]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;Nothing song was playing. $djsEval[message.member.voice.channel.leave();]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
});

bot.command({
  name: "skip",
  aliases: ["s"],
  code: `$skipTo[$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]!=];false;1];true;$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]==$queueLength];true;$sub[$noMentionMessage[1];1]];false;$noMentionMessage[1]]]]
$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]!=];false;$replaceText[$getVar[skip];{song};$songInfo[title]]];true;$replaceText[$getVar[skip];{song};$songInfo[title]] **$noMentionMessage[1]** songs.]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]!=];false;1];true;$noMentionMessage[1];1]<=$queueLength;You only can skip **$queueLength** song.]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "clearqueue",
  aliases: ["cq"],
  code: `$awaitReaction[$authorID;10s;{title:Are you sure you wanna clear?} {footer:✅ Yes | ❌ No} {color:$getUserVar[color]};✅,❌;clearqueueyes,clearqueueno;Confirmation failed.;yes]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$queueLength!=0;Nothing song was playing.]`
});

bot.command({
  name: "queue",
  aliases: ["q"],
  code: `$author[Queue;$getVar[customemoji1]]
$description[$queue[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];10;\`{number} - {title}\`]]
$addField[Now Playing;[$songInfo[title]\\]($songInfo[url])]
$addField[Page;$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage] - $truncate[$sum[$divide[$queueLength;10];0.9]]]
$footer[$queueLength Song - queue (page) for next/back page]
$addTimestamp
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]<=$truncate[$sum[$divide[$queueLength;10];0.9]];]
$onlyIf[$isNumber[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]]!=false;]
$onlyIf[$queueLength!=1;Currently playing **$songInfo[title]** Now!]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[song not load on queue. $error]`
});

bot.command({
name: "playlist",
code: `$author[Playlist $username's;$getVar[customemoji1]]
$description[1) **$getGlobalUserVar[1]**
2) **$getGlobalUserVar[2]**
3) **$getGlobalUserVar[3]**
4) **$getGlobalUserVar[4]**
5) **$getGlobalUserVar[5]**
6) **$getGlobalUserVar[6]**
7) **$getGlobalUserVar[7]**
8) **$getGlobalUserVar[8]**
9) **$getGlobalUserVar[9]**
10) **$getGlobalUserVar[10]**]
$footer[Status: $replaceText[$replaceText[$checkCondition[$queueLength==1];true;Playing];false;$replaceText[$replaceText[$checkCondition[$voiceID!=];true;Idle];false;none]]]
$addTimestamp
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]`
});

bot.command({
name: "playlist-add",
code: `$setGlobalUserVar[$message[1];$message[2]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==null];true;Add];false;Replace]]
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[2];https://youtu.be/;https://m.youtube.com/watch?v=;https://www.youtube.com/watch?v=;https://youtube.com/watch?v=;playlist?;https://soundcloud.com/]!=false;Failed.]
$onlyIf[$message[1]<10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-remove",
code: `$setGlobalUserVar[$message[1];null]
$title[Your song has remove on $message[1]]
$color[$getUserVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[$message[1]]!=null;Already remove!]
$onlyIf[$message[1]<10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[1;Usage: \`playlist-remove (number playlist)\`]
$suppressErrors[something just happened.]`
});

bot.command({
name: "playlist-play",
code: `$clearReactions[$channelID;$messageID;$getVar[customemoji]]
$addCmdReactions[$getVar[customemoji];$getVar[customemoji3]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$getGlobalUserVar[logmusic];0;Added to queue: \`$playSong[$getGlobalUserVar[$message[1]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;2m];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no]]\`];1;]]
$djsEval[message.member.voice.channel.join();]
$botTyping[3s]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$getGlobalUserVar[$message[1]]!=null;Nothing song was added on playlist.]
$onlyIf[$message[1]<10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$argsCheck[1;Usage: \`playlist-play (number playlist)\`]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]!=0;Cant execute this command.
> **Permission need: "members intent" & "presence intent"**]
$suppressErrors[something just happened.]`
});

bot.command({
  name: "volume",
  aliases: ["v"],
  code: `$volume[$message[1]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$setGlobalUserVar[vol;$message[1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getUserVar[color]}]
$onlyIf[$message[1]<=150;Max volume 150%!]
$onlyIf[$charCount[$message[1]]<4;Failed.]
$onlyIf[$isNumber[$message[1]]==true;Must number!]
$onlyIf[$message[1]!=;Volume can change 1 - 150]
$editIn[2ms;Changed to \`$message[1]%\`] Changing...
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
});
};
