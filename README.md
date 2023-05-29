# Medium-Fuser

## To-do
- Improve Post Component so its not injecting divs for each post
- Make Post Components an infinite carousel 
- Host On Website: mediumfuser.site
- Public Release


## Component
<img width="525" alt="image" src="https://github.com/CallumAS/Medium-Fuser/assets/53473235/0a9b9950-52a6-48d1-9e2f-65b2ecc387f4">

Creates a feed from all users scraped look below on how to add a user

# Server
## SET API KEY
modify "/server/.env" and add API_KEY="[YOUR_API_KEY]"
## Server routes 
### ADD USER CONTENT
http://localhost:3003/?name=[NAME]&key=[APIKEY]

Example: https://medium.com/@NatashaMH => http://localhost:3003/?name=NatashaMH&key=1234-1234-1234-1234

ADDS THE USERS CONTENT TO SCRAPE

### VIEW SCRAPED CONTENT

http://localhost:3003/data

DISPLAYS CONTENT FROM ALL USERS CONTENT ADDED SORTED BY TIME
