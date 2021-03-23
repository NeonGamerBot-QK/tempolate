module.exports = (bot) => {
  bot.command({
      name: "ban",
      aliases: ['b'],
      code: `
      $deletecommand
      $sendMEssage[**$userTag[$findUser[$message[1]]]** has been banned for a reason of **$replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]**;no]
      $onlyIf[$findUser[$message[1]]!=$clientID; you cant ban me using me!]
      $onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌You can't ban someone with higher or the same roles as you]
      $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌I can't ban someone with higher or the same roles as me]
      $onlyIf[$isBanned[$findUser[$message[1]]]!=true; this user is already banned!]
      $onlyIf[$findUser[$message[1];no]!=$ownerID; you cant ban the owner!]
      $onlyIf[$finduser[$message[1];no]!=$authorID; you cant ban your self!]
      $onlyIf[$findUser[$message[1];no]!=;i could not find that user!]
      $onlyBotPerms[ban; i **Need __BAN__ ** perms!!]
      $onlyPerms[ban; you need __Ban__ perms!]`
    })

    bot.variables({
      warns: 0,
      warninfo: "",
      modrole: "none",
      ainvite: "false",
      abadwords: "false",
      alink: "false",
      aracial: "false",
      aowping: "false",
      warnid0: "",
      warnid: "",
      warnid1: "",
      warnid2: "",
      warnid3: "",
      warnid4: "",
      warnid5: "",
      warnid6: "",
      warnid7: "",
      warnid8: "",
      warnid9: "",
      warnid10: "",
      warnid11: "",
      warnid12: "",
      warnid13: "",
    })
    
    bot.command({
      name: "warn",
      code: `$senddm[$finduser[$message[1]]; {title: Warn} {description: You were warned for a reason of **$replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]** } {color:$getUserVar[color]}  {field:warn id:$getUserVar[warnid$getUserVar[warns;$findUser[$message[1]]];$finduser[$message[1]]]:no} {timestamp:ms} {author:$userTag[$clientID]:$useravatar[$clientID]}]
      $deletecommand
      $setuserVar[warninfo;$getUservar[warninfo;$finduser[$message[1]]] 
     ** ID: $getUserVar[warnid$getUserVar[warns;$finduser[$message[1]]];$finduser[$message[1]]]| Moderator: ||$username|| **
    for reason of $replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]
  today at $sub[$hour;4]:$minute EST usa
  ;$findUser[$message[1]]]
    $sendMEssage[**$userTag[$findUser[$message[1]]]** has been warned for a reason of **$replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]**;no]
    $setUserVar[warnid$getUserVar[warns;$findUser[$message[1]]];$randomString[8];$finduser[$message[1]]] 
    $setUserVar[warns;$sum[$getUserVar[warns;$findUser[$message[1]]];1];$findUser[$message[1]]]  
      $onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌You can't warn someone with higher or the same roles as you]
      $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌I can't warn someone with higher or the same roles as me]
      $onlyIf[$isBanned[$findUser[$message[1]]]!=true; this user is already banned!]
      $onlyIf[$findUser[$message[1];no]!=$ownerID; you cant warn the owner!]
      $onlyIf[$findUser[$message[1]]!=$clientID; you cant warn me using me!]
      $onlyIf[$finduser[$message[1];no]!=$authorID; you cant warn your self!]
      $onlyIf[$findUser[$message[1];no]!=;i could not find that user!]
      $onlyPerms[kick; you need __kick__ perms!]`
    })
    const config = require('./config')
    bot.command({
        name: "warns",
        aliases: ['warnings', 'hate'],
        code: `$if[$hasperms[$authorID;kick]==true]
        $title[Warns]
        $description[$getUserVar[warninfo;$finduser[$message[1]]]]
        $color[$getUservar[color]]
        $footer[By bots/sites]
        $addtimestamp
        $onlyIf[$getuservar[warns;$finduser[$message[1]]]!=0; $usertag is **__SQUEAKY__** clean*!*]
        $else
        $title[Warns]
        $description[$getUserVar[warninfo] 
        You have in total **$getUserVar[warns]**]
        $color[$getUservar[color]]
        $footer[by bots/sites]
        $addtimestamp
        $onlyIf[$getuservar[warns]!=0; $usertag you are **__SQUEAKY__** clean*!*]
        $endif`
    })
    
     
}

