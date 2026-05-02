---
title: "关于更换光猫的一些事"
Date: 2026-05-01T15:30:31.000Z
pubDatetime: 2026-05-01T15:30:31.000Z
published: 2026-05-01T15:30:31.000Z
description: "替换到联通宽带FTTR自带的光猫"
image: ""
author: "stardust"
tags: ["Hardware","Software","Net"]
category: "Default"
slug: "2026-05-01-guanyu-genghuan-guangmao-de-yixieshi"
draft: false
---

关于更换光猫的一些事

## 前言 
去年大概这个时候办理了联通的宽带，手机套餐19元每月的易联卡，加了59A低消有了500Mbps的宽带，加了实际消费30元每月的FTTR包，提速宽带到1000Mbps，再加了10元每月的OTT电视，合计59元每月刚好满足低消。本来30元的FTTR包有包含95G每月的省内流量的，但因为易联卡是无限流量套餐的原因无法加包，虽然用不上这些流量，但还是有点亏的感觉。联通提供了ZTE G7615v2的主路由和G1612的从设备，这套设备的后台联通定制界面和配套的联通智家软件管理全是巨慢又乱，用起来感觉非常的差劲，前面一小段时间忍了，结果出现几次莫名其妙断线，于是就决定不用这一套东西，改桥接用自己的路由器。因为安装时候宽带师傅就给了超密，所以顺利改为桥接，撤掉了G1612从设备，G7615v2关闭了无线，充当了个纯粹的光猫，配合自己的ZTE晴天5100Pro+的路由器，安安静静的用了这一年的时间。

## 改动

最近几天又折腾起了网络，想改动些什么，因为FTTR带的两个设备假如退订的话需要归还给联通，想着找个光猫把联通的G7615v2给替换掉，网络信息整理了一堆，选中了ZTE的G7015TV3这个纯粹的光猫，体积几乎只有G7615v2的四分之一，同前面换宽带闲置下来的F657GV9一样的尺寸，于是就在多多上订了G7015TV3，等待收货。

### ZTE F657GV9
这个光猫是目前为止换了很多次宽带自己觉得最精致的一个光猫了，体积小巧，四个千兆网口。可惜它是GPON规格的设备，最大只能支持千兆，假如用它的话，实际最快速度大概只有950Mbps左右的速率，同实际宽带1300Mbps的速率比有点浪费了，所以只能更换为支持更高速率的光猫了，但是在G7015TV3到货前，可以先拿它过一遍配置，熟悉一下更改配置的过程。
虽然广东联通的光宽带注册目前大概只校验LOID，并没有绑定光猫SN或者MAC地址之类的，但是想着替换就是能改什么就改什么，尽量做到改到所有参数尽量一致。
拿F657GV9练手，第一步就是开光猫的Telnet，重置后超级用户名和密码都为CUAdmin，这步没问题，但是用网上最新的 **[zteOnu](https://github.com/Septrum101/zteOnu/)**  工具始终出错，提示用户名密码错误，但是实际用户名和超密都是正确的，甚是奇怪，大概原因是这个光猫软件有点旧了，得不到zteOnu的支持。
后面又看到了factorymode_crack-v2 的开Telnet的方法，需要在Windows系统下使用，试了下居然一次成功，顺利开启了这个光猫的Telnet，使用过程如下：
```
连上光猫局域网后，打开cmd，输入：
factorymode_crack.exe -l xxx open -i 192.168.1.1
或者
factorymode_crack.exe -l xxx open -i 192.168.1.1 -p 8080
(有的光猫使用的是8080端口，IP地址默认是192.168.1.1如果你的光猫已经修改请指定自己的地址，另外-l参数已经无效，但仍然需要指定，随便填即可)
如果打开成功会出现：
Enter192.168.1.1
FactoryModeSuccess:FactoryModeAuth.gch?user=l0Fo18jP&pass=7N518I28
user=的值是telnet的用户名，pass=后面的是telnet的密码

得到临时密码后请立即关闭转发，立即telnet登陆，立即设置永久telnet，5分钟超时。命令如下：
sendcmd 1 DB p TelnetCfg
sendcmd 1 DB set TelnetCfg 0 Lan_Enable 1
sendcmd 1 DB set TelnetCfg 0 TS_UName root
sendcmd 1 DB set TelnetCfg 0 TSLan_UName root
sendcmd 1 DB set TelnetCfg 0 TS_UPwd Zte521
sendcmd 1 DB set TelnetCfg 0 TSLan_UPwd Zte521
sendcmd 1 DB set TelnetCfg 0 Max_Con_Num 99
sendcmd 1 DB set TelnetCfg 0 ExitTime 999999
sendcmd 1 DB set TelnetCfg 0 InitSecLvl 3
sendcmd 1 DB set TelnetCfg 0 CloseServerTime 9999999
sendcmd 1 DB set TelnetCfg 0 Lan_EnableAfterOlt 1
sendcmd 1 DB save
killall telnetd
```
经过上述步骤，开通了光猫的Telnet，就可以依照原光猫的参数修改这个光猫了。
首先可以修改光猫的超级用户账号和密码：
```
修改超级帐号：sendcmd 1 DB set DevAuthInfo 0 User XXXXXX
修改超级密码：sendcmd 1 DB set DevAuthInfo 0 Pass XXXXXX
```
通过  `setmac show2` 可以查看光猫的一些配置信息。然后找到对应项进行修改。下面是这个旧的光猫里默认信息，也不需要打码处理了。
```
/ #                                                                                                                                                                              
> setmac show2                                                                                                                                                                   
                                                                                                                                                                                 
setmac show2                                                                                                                                                                     
===============Current Status of TagParam===============                                                                                                                         
    PONMAC[ID: 32769] is not set                                                                                                                                                 
   PONLOID[ID:  2180] is not set                                                                                                                                       
 PONPASSWD[ID:  2181] is set to ******                                                                                                                                           
    EPONSN[ID:  2182] is not set                                                                                                                                                 
  VENDORID[ID:  2176] is set to ZTEG                                                                                                                                             
    GPONSN[ID:  2177] is set to D059F550                                                                                                                                         
   GPONPWD[ID:  2178] is set to GD059F550                                                                                                                                        
       OUI[ID:   768] is set to E86E44                                                                                                                                           
        SN[ID:   512] is set to 01FFFFFFFF011FFF23ZTEGD059F550FF                                                                                                                 
      MAC1[ID:   256] is set to e8:6e:44:61:d1:48                                                                                                                                
      MAC2[ID:   257] is set to e8:6e:44:61:d1:49                                                                                                                                
      MAC3[ID:   258] is set to e8:6e:44:61:d1:4a                                                                                                                                
      MAC4[ID:   259] is set to e8:6e:44:61:d1:4b                                                                                                                                
      MAC5[ID:   260] is set to e8:6e:44:61:d1:4c                                                                                                                                
      MAC6[ID:   261] is set to e8:6e:44:61:d1:4d                                                                                                                                
      MAC7[ID:   262] is set to e8:6e:44:61:d1:4e                                                                                                                                
      MAC8[ID:   263] is set to e8:6e:44:61:d1:4f                                                                                                                                
     SSID1[ID:  1024] is not set                                                                                                                                                 
     SSID2[ID:  1025] is not set                                                                                                                                                 
     SSID3[ID:  1026] is not set                                                                                                                                                 
     SSID4[ID:  1027] is not set                                                                                                                                                 
     SSID5[ID:  1028] is not set                                                                                                                                                 
     SSID6[ID:  1029] is not set                                                                                                                                                 
     SSID7[ID:  1030] is not set                                                                                                                                                 
     SSID8[ID:  1031] is not set                                                                                                                                                 
WLAN0WEPKEY1[ID:  1280] is not set                                                                                                                                               
WLAN0WEPKEY2[ID:  1281] is not set                                                                                                                                               
WLAN0WEPKEY3[ID:  1282] is not set                                                                                                                                               
WLAN0WEPKEY4[ID:  1283] is not set                                                                                                                                               
WLAN1WEPKEY1[ID:  1284] is not set                                                                                                                                               
WLAN1WEPKEY2[ID:  1285] is not set                                                                                                                                               
WLAN1WEPKEY3[ID:  1286] is not set                                                                                                                                               
WLAN1WEPKEY4[ID:  1287] is not set                                                                                                                                               
WLAN2WEPKEY1[ID:  1288] is not set                                                                                                                                               
WLAN2WEPKEY2[ID:  1289] is not set                                                                                                                                               
WLAN2WEPKEY3[ID:  1290] is not set                                                                                                                                               
WLAN2WEPKEY4[ID:  1291] is not set                                                                                                                                               
WLAN3WEPKEY1[ID:  1292] is not set                                                                                                                                               
WLAN3WEPKEY2[ID:  1293] is not set                                                                                                                                               
WLAN3WEPKEY3[ID:  1294] is not set                                                                                                                                               
WLAN3WEPKEY4[ID:  1295] is not set                                                                                                                                               
   PSKKEY1[ID:  1296] is not set                                                                                                                                                 
   PSKKEY2[ID:  1297] is not set                                                                                                                                                 
   PSKKEY3[ID:  1298] is not set                                                                                                                                                 
   PSKKEY4[ID:  1299] is not set                                                                                                                                                 
WLAN4WEPKEY1[ID:  1312] is not set                                                                                                                                               
WLAN4WEPKEY2[ID:  1313] is not set                                                                                                                                               
WLAN4WEPKEY3[ID:  1314] is not set                                                                                                                                               
WLAN4WEPKEY4[ID:  1315] is not set                                                                                                                                               
WLAN5WEPKEY1[ID:  1316] is not set                                                                                                                                               
WLAN5WEPKEY2[ID:  1317] is not set                                                                                                                                               
WLAN5WEPKEY3[ID:  1318] is not set                                                                                                                                               
WLAN5WEPKEY4[ID:  1319] is not set                                                                                                                                               
WLAN6WEPKEY1[ID:  1320] is not set                                                                                                                                               
WLAN6WEPKEY2[ID:  1321] is not set                                                                                                                                               
WLAN6WEPKEY3[ID:  1322] is not set                                                                                                                                               
WLAN6WEPKEY4[ID:  1323] is not set                                                                                                                                               
WLAN7WEPKEY1[ID:  1324] is not set                                                                                                                                               
WLAN7WEPKEY2[ID:  1325] is not set                                                                                                                                               
WLAN7WEPKEY3[ID:  1326] is not set                                                                                                                                               
WLAN7WEPKEY4[ID:  1327] is not set                                                                                                                                               
   PSKKEY5[ID:  1328] is not set                                                                                                                                                 
   PSKKEY6[ID:  1329] is not set                                                                                                                                                 
   PSKKEY7[ID:  1330] is not set                                                                                                                                                 
   PSKKEY8[ID:  1331] is not set                                                                                                                                                 
  USERNAME[ID:  1537] is set to user                                                                                                                                             
USERPASSWD[ID:  1793] is set to kc6x7t7s                                                                                                                                         
VERSIONMODE[ID: 32770] is not set                                                                                                                                                
   HLTMODE[ID:  2193] is not set                                                                                                                                                 
VoIPProtocolType[ID:  2054] is set to 1                                                                                                                                          
   SOFTVER[ID: 36864] is set to V1.2.0P1N12                                                                                                                                      
 ProductSn[ID:  2197] is not set                                                                                                                                                 
CollusionVerFlag[ID:  2199] is set to 1                                                                                                                                          
REGIONCODE[ID:  2208] is not set                                                                                                                                                 
    rreset[ID:  2185] is set to 1                                                                                                                                                
   WANTYPE[ID: 40960] is not set                                                                                                                                                 
   KeyNorm[ID:  2195] is not set                                                                                                                                                 
 FRAMSTART[ID: 32771] is not set                                                                                                                                                 
  BOOT_NUM[ID:  3072] is set to V1.0.0P1N1                                                                                                                                       
===============Current Status of TagParam===============                                                                                                                         
```
通过 `setmac 1 ID value`  可以把相应的值更改为在用的值。比如修改光猫的MAC地址：
```
setmac 1 32769 11:22:33:44:55:66  （MAC地址自行修改）
setmac 1 256 11:22:33:44:55:66
setmac 1 257 11:22:33:44:55:6a
setmac 1 258 11:22:33:44:55:6b
setmac 1 259 11:22:33:44:55:6c
setmac 1 260 11:22:33:44:55:6d
setmac 1 261 11:22:33:44:55:6e
setmac 1 262 11:22:33:44:55:6f
setmac 1 263 11:22:33:44:55:67
sendcmd 1 DB save

依照在用光猫的信息，把相应的值都改为在用猫的值。

VENDORID[ID:  2176] is set to ZTEG                                                                                                                                             
  GPONSN[ID:  2177] is set to D059F550                                                                                                                                         
 GPONPWD[ID:  2178] is set to GD059F550                                                                                                                                        
     OUI[ID:   768] is set to E86E44                                                                                                                                           
      SN[ID:   512] is set to 01FFFFFFFF011FFF23ZTEGD059F550FF   
```
还可以继续把光猫原有的TR069相关信息进行修改或者删除，防止后期运营商下发新信息，比如设备超密被修改。
```
关闭TR069与定时上报（不懂的用户慎操作）：
sendcmd 1 DB p MgtServer #查看一下当前的电信远程控制
sendcmd 1 DB set MgtServer 0 URL http://127.0.0.1   #把服务器 URL 改掉
sendcmd 1 DB set MgtServer 0 Tr069Enable 0
sendcmd 1 DB set MgtServer 0 PeriodicInformEnable 0
sendcmd 1 DB save
 
劫持ITMS注册（不懂的用户慎操作）：
sendcmd 1 DB set PDTCTUSERINFO 0 Status 0
sendcmd 1 DB set PDTCTUSERINFO 0 Result 1
sendcmd 1 DB save
 
恢复TR069与定时上报功能（以广东电信为例，每个省份的上报服务器应该不一样）
sendcmd 1 DB p MgtServer #查看一下当前的电信远程控制
sendcmd 1 DB set MgtServer 0 URL http://devacs.edatahome.com:9090/ACS-server/ACS 
sendcmd 1 DB set MgtServer 0 Tr069Enable 1
sendcmd 1 DB set MgtServer 0 PeriodicInformEnable 1
sendcmd 1 DB save
 
删除原有网络设备
sendcmd 1 DB p WANC
sendcmd 1 DB delr WANC 0   #有几个删几个，修改`WANC`后的数字即可（可以删掉默认tr069）
sendcmd 1 DB save
```
到目前为止，这F657GV9克隆了G7615v2的序列号、MAC地址等各种参数，也禁用了TR069运营商后台管理的网络，基本可以无缝切换光猫了。

### ZTE G7015TV3
今天下午，这个光猫终于被放在了快递柜，让小溪帮忙拿了上来。
外观和尺寸是自己喜欢的样子，直接上电查看，发现已经被开了Telnet，省掉了自己去开通的步骤。因为是电信版（没有发现联通有用过这个硬件的光猫），进入后台是那种远古电信的界面风格，好在信息显示还算清晰。通过Telnet依照前面探的路轻松修改信息。唯一的差别是在示例如 `SN[ID:512] is set to 01FFFFFFFF011FFF23ZTEGD059F550FF`  这一项设置时候提示超过最大位数，于是只保留了类似`ZTEGD059F550` 这一段，这也导致后台看到的这一项同G7615v2里显示的不同，特意仔细对比了旧猫参数，位数确实是如此，但就是在G7015TV3里不可设置，有些奇怪，但好在联通也不验证这一项，修改后连上光纤顺利注册成功，网络一切正常。