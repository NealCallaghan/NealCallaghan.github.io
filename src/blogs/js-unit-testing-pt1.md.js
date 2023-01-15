import image from '../Images/majestic1.png';
console.log(image);
const jsUnitTesting1 = "\n\
# Javascript unit testing for .net developers Part 1 Environment Setup and Tooling\n\
\n\
## Introduction\n\
This is a guide to unit testing for developers who are familiar with unit testing already and are familiar with using tools in a .NET environment.\n\
\n\
There are quite a few differences in how Javascript behaves which can present many “gotchas” along the way to creating testable code. What I want to do in this guide is present to you a series of similarities that can be translated to what you are already familiar with.\n\
\n\
What we are going to cover in this guide are:\n\
\n\
Environment, tooling, and setup.\n\
Testing and mocking with Jest\n\
Testing React components\n\
Testing async methods and Sagas along with the Redux store.\n\
What I won’t be covering in this guide are things which I assume you are already familiar with. These are the triple ‘A’ pattern or arrange, act, assert. Design patterns and SOLID principles. I also won’t be covering how to setup React and Redux, both of these I assume you already have some familiarity with. With React-Intl I cover in another post on how to get that se tup.\n\
\n\
## Environment setup and tooling\n\
The code editor that we will be using will be VSCode. It’s a wonderful editor and provides virtually all functionality that we need. It has some great extensions and some really excellent ones recently for unit testing in particular.\n\
\n\
Along with VSCode, we will be using Jest which will act as both our test runner, mocking, and unit testing framework. Enzyme will be used for testing React components and Majestic which is used as a testing UI and makes those familiar with Visual Studio testing tools breath a sigh of relief.\n\
\n\
## Setup Jest\n\
Jest ideally should be setup globally which you can do this by going to your command line and typing npm install -g jest.\n\
\n\
## Setup Enzyme\n\
Enzyme is an important tool, it allows us to mock react components in memory and query the React virtual dom or convert the React virtual dom into an HTML dom and query that.\n\
\n\
It’s able to do this because underneath the covers Enzyme is a combination of two other powerful Javascript technologies. One is JSDOM (https://github.com/jsdom/jsdom) which can be thought of as an in memory headless browser and the other is Cheerio (https://github.com/cheeriojs/cheerio) which parses, selects and manipulates the Dom. Cheerio selects items in the JSDOM using CSS style selectors.\n\
\n\
To install Enzyme, go to your application directory and run the command npm i --save-dev enzyme. Along with Enzyme you also need to install the adapter which allows Enzyme to use React, at time of writing React was at version 16. Run the command npm i --save-dev enzyme enzyme-adapter-react-16\n\
\n\
## Setup Majestic\n\
Jest in itself is a great tool however at the moment you will only be able to run tests on the command line, this is ok for some but if you have a great many tests failing it can be overwhelming to see so many failing unit tests within the command window and try to figure out the problem.\n\
" +
`![image](${image})\n` +
"\n\
A great tool which gives you a similar experience to a Visual Studio test explorer is Majestic (https://github.com/Raathigesh/majestic).\n\
\n\
Majestic allows you to view your tests in a sequential visual way, it can run all the tests in your solution or just selected ones and allows you to navigate to the failed test. It also takes the information on why the unit test failed and presents it in a much more human friendly way. I recommend it’s use.\n\
\n\
To install Majestic you need to install it globally, run `npm install -g majestic.`\n\
\n\
## Setup Chrome Debugging\n\
The Chrome extension for VSCode should be installed, this extension can attach itself to the Chome dev tools debugger and allow you to debug within VSCode. If you haven’t already done so install this extension.\n\
\n\
To be able to debug your application while running you need to modify the launch.json file contained within the “vscode” folder within your solution directory. It can also be found by going to “Debug” (Ctrl+Shift+D) within VSCode and selecting the settings cog which will open the launch.json file. There you must ensure within the configurations property that the following json is there.\n\
\n\
```\n\
\"configurations\": [\"\n\
    {\n\
      \"type\": \"chrome\",\"\n\
      \"request\": \"launch\",\"\n\
      \"name\": \"Launch Chrome against localhost\",\"\n\
      \"url\": \"http://localhost:3000\",\"\n\
      \"webRoot\": \"${workspaceFolder}\"\"\n\
    },\n\
    {\n\
      \"name\": \"Debug CRA Tests\",\"\n\
      \"type\": \"node\",\"\n\
      \"request\": \"launch\",\"\n\
      \"runtimeExecutable\": \"${workspaceRoot}/node_modules/.bin/react-scripts\",\"\n\
      \"args\": [\"test\", \"--runInBand\", \"--no-cache\", \"--no-watch\"],\"\n\
      \"cwd\": \"${workspaceRoot}\",\"\n\
      \"protocol\": \"inspector\",\"\n\
      \"console\": \"integratedTerminal\",\"\n\
      \"internalConsoleOptions\": \"neverOpen\"\"\n\
    }\n\
  ]\n\
```\n\
\n\
The first section in the array is telling VSCode that when debugging you are launching your application on localhost on the port 3000 (change as required). The second section is what is needed when you want to debug your unit tests.\n\
\n\
## Handy VSCode extensions\n\
As well as some of the extensions above some others that may come in handy along the way are:\n\
\n\
Bracket Pair Colorizer — a visual aid to using many brackets in code.\n\
GitLens — gives you a similar experience to code lens in Visual Studio and shows you within the code who was the last author.\n\
Code Spell Checker — spell checking\n\
Material Icon Theme — aesthetically pleasing and gives you nice icons.\n\
\n\
## Summary\n\
So far we have installed a few tools and extensions to VSCode. We have talked about what these tools give you in terms of a similar unit testing and debugging experience to Visual Studio.\n\
\n\
In the next episode, we are going to really get our feet wet and start unit testing and mocking (yes I did say mocking for JavaScript) with Jest.\n\
\n\
";

export default jsUnitTesting1;