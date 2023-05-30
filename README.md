# Medium-Fuser
Example: https://mediumfuser.site/
Bypasses paywall & create a custom newsfeed based on your favorite users. 

## To-do
- Make Post Components an infinite carousel 


## Component
![ezgif com-video-to-gif](https://github.com/CallumAS/Medium-Fuser/assets/53473235/d6cb1726-9323-4f4d-93d8-631961bf2374)


Creates a feed from all users scraped look below on how to add a user

# Server
## SET API KEY
modify "/server/.env" and add API_KEY="[YOUR_API_KEY]"
## Server routes 
### ADD USER CONTENT
https://[DOMAIN]/?name=[NAME]&key=[APIKEY]

Example: https://medium.com/@NatashaMH => https://[DOMAIN]/?name=[NAME]&key=[APIKEY]

ADDS THE USERS CONTENT TO SCRAPE

### VIEW SCRAPED CONTENT

https://[DOMAIN]/data

DISPLAYS CONTENT FROM ALL USERS CONTENT ADDED SORTED BY TIME


## Contributors
@Robby6Strings - Big help cleaning and improving functionality <3 

