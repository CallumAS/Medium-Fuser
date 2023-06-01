# Medium-Fuser

Example: [Medium-Fuser](https://mediumfuser.site/)

Medium-Fuser is a platform that bypasses paywalls and allows you to create a custom newsfeed based on your favorite users. It also provides you with a web component to add a news feed to your own website.

I created this project to gain a better understanding of web components and enhance my TypeScript skills while also contributing an open-source project to my GitHub repositories. If you wish to have this project removed, please contact me via the email provided in my profile's README.

## To-do
- Implement an infinite carousel for Post Components.

## Component
![Medium-Fuser Component](https://github.com/CallumAS/Medium-Fuser/assets/53473235/d6cb1726-9323-4f4d-93d8-631961bf2374)

The component creates a dynamic feed by scraping content from various users. It provides an engaging and personalized experience.

# Server
## API Key Setup
To set up the API key, modify the "/server/.env" file and add your API key using the format: API_KEY="[YOUR_API_KEY]".

## Server Routes
### Add User Content
You can add user content to be scraped by using the following route: [https://[DOMAIN]/?name=[NAME]&key=[APIKEY]](https://[DOMAIN]/?name=[NAME]&key=[APIKEY])

Example: [https://medium.com/@[NAME]](https://medium.com/@[NAME]) => [https://[DOMAIN]/?name=[NAME]&key=[APIKEY]](https://[DOMAIN]/?name=[NAME]&key=[APIKEY])

This route adds the user's content to be scraped and included in the feed.

### View Scraped Content
To view the scraped content from all users, use the following route: [https://[DOMAIN]/data](https://[DOMAIN]/data)

This route displays content from all users, sorted by time.

## Contributors
Special thanks to:
- @Robby6Strings for helping refactor and improving the functionality. ❤️

## DISCLAIMER

The project described herein, including any associated software, websites, or services, is provided for informational purposes only. The creators and contributors of this project make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the project or its content.

The use of this project is at your own risk. The creators and contributors shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of this project, whether based on contract, tort, strict liability, or other legal theory. This includes but is not limited to damages for loss of profits, data, business, or goodwill.

The project may include third-party content, links, or references. The creators and contributors do not endorse or assume any responsibility for any third-party content, websites, or services mentioned or linked within the project.

The project does not provide any legal, financial, or professional advice. Any actions taken based on the information provided in this project are solely at your own discretion and risk. It is always recommended to consult with appropriate professionals for advice specific to your situation.

The creators and contributors of this project reserve the right to modify, update, or discontinue the project at any time without prior notice.

By using or participating in this project, you agree to release, indemnify, and hold harmless the creators and contributors from any claims, liabilities, losses, damages, costs, or expenses, including legal fees, arising out of or related to your use or participation in the project.

The project is not affiliated with or endorsed by any third-party platforms, services, or organizations mentioned within the project.

Please note that laws and regulations may vary by jurisdiction. It is your responsibility to ensure compliance with applicable laws and regulations.

