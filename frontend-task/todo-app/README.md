# Frontend Task

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the website, use

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## JSON server
To run the json-server backend, open up a new terminal and run 

```bash
npm install json-server@0.17.4
npx json-server --watch db.json --port 8000
```

## Explanation

### React 

I created a simple todo list with adding, deleting, and position updating capabilities. The design is simple and reponsive. I used some lucide-react icons for a cleaner look, especially when in mobile screen size. 

I added a loading state that is triggered in all of the functions that require a call to the database. This makes the page feel more reponsive even when the response from the database is slow.


### Next.js Routing

To ensure efficient routing, I made sure to use Next.js' Link tag to prevent full reloads. I made a NavHeader component to navigate between pages. Also, I decided to use the main page strictly to redirect to the To-Do List page. This was personal preference, as I find it easier to keep track of the purpose and content of each route.

I kept the About page incredibly simple since the purpose was to demonstrate routing. I did add an animation that I learned about, since I thought it looked pretty cool.

### API Integration

I used json-server as a mock API endpoint, choosing the stable version 0.17.4 to limit bugs and/or crashes. My database endpoint is db.json, which has all CRUD operations (PUT only edits order, not content). I used the uuid package to create unique ids, which is personal preference. 

For each of the CRUD methods in TaskManager, I used a try-catch to handle errors, updated the loading state, and logged the result, which could later be upgraded to a toast or other result confirmation. I used the Fetch API over axios since this is a small project.

### File Storage

The components file contains all the TSX components I created, which are stored in files of the same name with its CSS file. Making each component separately also makes each file smaller and easier to read.

### TypeScript

I prefer to use TypeScript since types help prevents both syntax and user (me!) errors. As a result, I installed a variety of TypeScript specific files into node_modules.

### Conclusion

I tried to keep the project lightweight and focus on the written code over the design of the website. If I spent more time on this project, I would find a pretty template, add React Suspense, better buttons, modals for tasks when clicked, and a full About page.