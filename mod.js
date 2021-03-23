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
      })
      
      bot.command({
        name: "warn",
        code: `$senddm[$finduser[$message[1]]; {title: Warn} {description: You were warned for a reason of **$replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]** } {color:$getUserVar[color]}  {field:warn id: $getUserVar[warnid;$finduser[$message[1]]]} {timestamp:ms} {author:$userTag[$clientID]:$useravatar[$clientID]}]
        $deletecommand
        $setuserVar[warninfo; $getUservar[warninfo;$finduser[$message[1]]] 
       ** ID: $getUserVar[warnid$getUserVar[warns;$finduser[$message[1]]];$finduser[$message[1]]]| Moderator: ||$username|| **
      for reason of $replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]
    today at $sub[$hour;4]:$minute EST usa]
      $sendMEssage[**$userTag[$findUser[$message[1]]]** has been warned for a reason of **$replaceText[$replacetext[$checkcondition[$message[2]$messageslice[2;50]!=];true;$message[2] $messageslice[2;50]];false;Undenified]**;no]
      $setUserVar[warnid;$getUserVar[warns;$findUser[$message[1]]]] 
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
}

