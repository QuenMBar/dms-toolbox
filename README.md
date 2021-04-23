# Dungeon Master's Toolbox

### Table of Contents
1. [Purpose](#purpose)
2. [Demo](#demo)
3. [Features](#features)
   1. [Sign-In](#sign-in)
   1. [DM Page](#dm)
   1. [Campain Page](#campaign)
    1. [Note Bar](#notes)
    1. [Monster Search](#monsters)
    1. [NPC Builder](#npc)
    1. [Character Sheets](#character)

2. [The Struggle is Real](#struggle)

4. [Planning vs Production](#planning)
5. [Our Favorite Sections of Code](#favorites)


## Purpose <a name="purpose"></a>
Online tools for DM’s are pretty bloated and typically difficult to navigate. With our Dungeon Master’s ToolKit you can easily run through and keep track of vital notes, check character or monster statistics, or make an npc on the fly. 

## Demo <a name="demo"></a>

As a user I can: 
* Sign in, or Sign-up for an account.
* I can see my existing campaigns or create a new campaign. 
* I can edit, save or delete campaigns. 
* I can explore the campaign to show details. 
* In the individual campaign I can make notes on the campaign itself, on specific quests, or on characters. 
* I can generate a new npc with random qualities on the fly.
* I can check the stats of any monster.
* I can keep track of the characters in my game. 
* I can edit, save or delete any of these.

![campaign page](/the-dms-toolbox/img/campaign.png)

## Features <a name="features"></a>

### Sign-In  <a name="sign-in"></a>

Dynamic login or sign-up page. Will check for unique users, will persist in database. 

![sign-in](/the-dms-toolbox/img/login-sign-up.png)

### DM Page <a name="dm"></a>

Displays a list of campaigns that the user/current DM is managing. 

* Can see my existing campaigns or create a new campaign. 
* Can edit, save or delete campaigns. 
* Can explore the campaign to show details. 

![](/the-dms-toolbox/img/campaign-edit.png)

### Campaign Page <a name="campaign"></a>

Displays a list of campaigns that the user/current DM is managing. 

*In the individual campaign I can make notes on the campaign itself, on specific quests, or on characters. 
* Can keep track of the characters in my game. 
* Can generate a new npc with random qualities on the fly
* Can check the stats of any monster
* Can edit, save or delete any of these


![Campaign Page](/the-dms-toolbox/img/campaign.png)

#### Note Bar <a name="notes"></a>

The user is able to take notes on the campaign, or the individual quest. 

![Campaign Page](/the-dms-toolbox/img/note-edit-gif.gif)

#### Monster Search <a name="monsters"></a>

Dynamically search monsters, or refresh to get a new random 20.

![Campaign Page](/the-dms-toolbox/img/monsters.gif)

#### NPC Builder <a name="npc"></a>

Instantally generates an NPC with characteristics and with items that you can use in your campaign on the fly. 

![Campaign Page](/the-dms-toolbox/img/npc.gif)

#### Character Sheets <a name="character"></a>

Can keep track of the characters in your campaign, or also build a more indepth NPC quickly. 

* **Large** Selection of editable fields, statistics and items. 
* **Custom** Items
* **Dynamic** Notes that persist on each character. 


![Campaign Page](/the-dms-toolbox/img/char-edit.gif)


## Struggles

**Q :**

The character sheets are a mystery to even me now.  If they ever break, they’re broken!

 Getting css to line everything up.

 **R :** 

 Jumping back into React after diving into Ruby was a difficulty. I wanted to practice with React hooks and with React Router but I also wanted to make an awesome project. So finding a middle ground, where I have to use techniques that I know because there is a large workload but balancing trying to do new techniques. Which takes longer because there is a learning curve. 

 The login mechanics with React Router. How it works, no one will ever know, but looking forward to working with a tool that solves that for us. 

 CORS- just always hitting those issues, and with React the errors are not very verbose so pattern recognition will grow eventually but frustrating on a deadline. 

 ## Favorites

 Favorite parts of code that we wrote.

**Q :**

 Monsters looking as good as they do, plus reading in the data
 
 Getting css to line everything up!

 **R :** 
 
Creating controllers to deal with the requests 

Learning more about hooks. 

Creating dynamic fetch functions.  
