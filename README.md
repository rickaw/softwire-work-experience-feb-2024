# Softwire Work Experience Feb 2024

## Week Schedule
We should also have ~0.5h break in the chillout every day - we can play pool, board games, or just chill out.

| Day       | Time   | Activity                                                 |
| --------- | ------ | -------------------------------------------------------- |
| Monday    | 10:00  | Arrival / Tour                                           |
|           | 10:30  | Work experience intro / Feature specification            |
|           | 11:30  | Machine set up                                           |
|           | 12:00  | Presentation: Git / HTML / CSS / JS intro                |
|           | 12:30  | Lunch                                                    |
|           | 13:30  | Coding                                                   |
|           | 15:00  | Guest presentation: Career Switch (Kiran Randhawa Kukar) |
|           | 16:00  | Home time                                                |
| Tuesday   | 10:00  | Standup                                                  |
|           | 10:30  | Discussion: Git / HTML / CSS / JS Questions from Monday  |
|           | 11:00  | Coding                                                   |
|           | 12:30  | Lunch                                                    |
|           | 13:30  | Coding                                                   |
|           | 15:00  | Guest presentation: LNER Security (Sarah Binney)         |
|           | 16:00  | Home time                                                |
| Wednesday | 10:00  | Standup                                                  |
|           | 10:30  | Presentation: DevOps: How is our Tetris site hosted?     |
|           | 11:00  | Coding                                                   |
|           | 11:00  | Guest presentation: Accessibility (Aya Stead)            |
|           | 12:30  | Lunch                                                    |
|           | 13:30  | Coding                                                   |
|           | 16:00  | Home time                                                |
| Thursday  | 10:00  | Standup                                                  |
|           | 10:30  | Presentation: HTTP Requests and Backend Development      |
|           | 11:00  | Coding                                                   |
|           | 12:30  | Lunch                                                    |
|           | 13:30  | Coding                                                   |
|           | 15:00  | Guest presentation: Recruitment (Frances Portaluri)      |
|           | 16:00  | Home time                                                |
| Friday    | 10:00  | Standup                                                  |
|           | 10:30  | Coding                                                   |
|           | 12:00  | Presentation prep                                        |
|           | 12:30  | Lunch                                                    |
|           | 13:30  | Presentation prep                                        |
|           | 14:30? | Presentation                                             |
|           | 15:00  | Retro                                                    |
|           | 16:00  | Home time |

## Set up
### Install required software
- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)

### Create a GitHub account
Go to [GitHub](https://github.com/) and create an account with your email address.

### Join our Trello board
To help us track our tasks and their statuses, I've set up a [Trello board](https://trello.com/b/fnf2Cgz8/softwire-work-experience-feb-2024). I will send you an invite link on the first day and you should be able to see the board.

### Clone the code
We all need to create a local copy of the code before you can make changes to it on your computer. You can do this with the following command
```
git clone https://github.com/rickaw/softwire-work-experience-feb-2024.git
```

### Install dependencies
Dependencies are external pieces of software that our code relies on. These are defined in `package.json`.

Run the following command from this folder to install all our dependencies:
```
npm install
```

You'll need to run this command again whenever a new dependency is added, but not every time when you run the website locally.

## Running locally
To test your changes whilst you are developing, you will need to be able to run the website locally. 
This means that the code is running on your own computer and you can access it in a browser without having to deploy the app publicly over the internet.

- Make sure that all of the dependencies are installed - You would've run `npm install` in the previous section
- Run the app locally
  - You can run the app with `npm start`
  - If you're interested in what `npm start` does, you can look in `package.json` where I've defined it to run `serve src` which uses the `serve` library to run the `src` folder as a website we can visit locally.
- Visit the website
  - After you have run `npm run dev` you should see `Serving! Local: http://localhost:3000`
  - Now, for example, if you visit `http://localhost:3000` you will see the version of the index page that would be generated by your version of the code

### Other useful things to do
- Add the [Trello board](https://trello.com/b/fnf2Cgz8/softwire-work-experience-feb-2024), [Github repository](https://github.com/rickaw/softwire-work-experience-feb-2024) and the [live site](https://softwire-work-experience-feb-2024.vercel.app/) to your bookmarks.
- 

## Technical Overview 
### Frontend vs Backend
For a full Tetris website, we will need two separate components - frontend and backend. The frontend deals with what happens on the browser like how the tetris blocks are displayed and how the game is played. If we want to store any data about users e.g. their scores, we need a database, which can be accessed through the backend. So when the frontend (the browser side) needs any user data, it sends a "request" to the backend, and then the backend communicates with the database, and sends the data back to the frontend. We'll talk more about this on Thursday.

We'll likely only have the time for the frontend development this week.

### Branches
The `main` branch of the repository is set to run on Vercel 
(a cloud platform). I've set this all up for you so you don't need to worry about how this hosting works, but I'll 
be giving a quick overview on Wednesday to make it feel less "magic".

### Frontend
The frontend codebase contains all of the code to control what you see on the screen when you use the website. It is 
written in HTML/CSS/JavaScript.
- HTML provides the basic structure of each page
- CSS is used to control the formatting and layout of the HTML content
- JavaScript is used to control the behaviour of different elements on the page

When running (either on Vercel or locally), the files in the frontend directory are available at `<siteurl>/<filename>`. 
For example, `src/game.html` is available at `https://softwire-work-experience-feb-2024.vercel.app/game` or `http://localhost:3000/game`. The `src/index.html` is special in the sense that it can be accessed through `https://softwire-work-experience-feb-2024.vercel.app` or `http://localhost:3000` without specifying `index`.

Lots of websites use frameworks or libraries rather than "Vanilla JavaScript" to put together the site (you may have 
heard of React, Angular, Vue.js or many more, for example). These provide useful in-build functionality that makes it
easier to build complex applications. In this project, we will not be using any specific library/framework in the 
frontend so that we can focus on writing code that we control rather than integrating with a specific "black box" that 
does things for us.

Larger projects also often use TypeScript (for both frontend and backend) rather than JavaScript. TypeScript is a language that builds on top of JavaScript to add some new features. For simplicity, we will be using JavaScript for this project in both the front-end and back-end code.

## How to Contribute Code

This section will all be covered by a presentation on the first day, so don't worry about this until we've spoken about Git/GitHub! It should be a useful reminder in future though!

Git can be a bit confusing if you're using it for the first time. If you're unsure about any step, feel free to grab me and we can go over it.

### Initial repository set up
- See the _Set up_ section on how to clone the repo.

### Working on a Feature

Try not to make changes on the `main` branch, this branch should always only contain code that has been reviewed. Development work should be done on a feature branch. However, don't worry if you accidentally work on `main`! Just let me know and I'll help you move it over to a feature branch.

- Make sure you are on the `main` branch and that it is up to date:
    - `git checkout main`
    - `git pull`
- Create a branch for your feature:
    - `git checkout -b [your-own-feature-branch-name]`
- Make some code changes
- Add your changes:
    - (if you want to check what changes you have): `git status`
    - `git add [yourFiles.example]`
    - `git commit -m "sensible message here, e.g. add a line piece to the library"`
    - You can (and probably should) do this process multiple times on your branch as you gradually add code to acheive the feature
- Push the changes to GitHub:
    - If it's the first time you have pushed this branch:
        - `git push --set-upstream origin [your-own-feature-branch-name]`
    - If you have pushed this branch before:
        - `git push`

### Requesting a Review

Once you are happy with your code, you can open GitHub in a browser and do the following:
- Navigate to the page for the repository
- Select "Pull requests" in the bar at the top
- Click the "New pull request" button
- Set the branches as follows:
    - base: `main` (this should be the default)
    - compare: `your-own-feature-branch-name`
- Click "Create pull request"
- Add a sensible title and description of your changes, then click "Create pull request"
- I will then review your changes and either make some comments or approve it:
    - If I make comments, you can make the changes on your branch locally and `git push` to update the code in GitHub
    - If I approve it, we can merge it into `main`. Wahey!

## Useful Links

### Project Resources
- [Trello board](https://trello.com/b/fnf2Cgz8/softwire-work-experience-feb-2024) - to keep track of tasks and their statuses
- [Github repository](https://github.com/rickaw/softwire-work-experience-feb-2024) - central location for all of our code
- [Live site](https://softwire-work-experience-feb-2024.vercel.app/)

### Useful HTML/CSS/JavaScript Guides

- [HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [CSS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [CSS flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [JavaScript basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)

### Further reading for backend development
- [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [HTTP response codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)