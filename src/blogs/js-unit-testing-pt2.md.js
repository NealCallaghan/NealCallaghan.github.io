// import image1 from '../Images/jsunittesting1.png';
// import image2 from '../Images/jsunittesting2.png';
import image3 from '../Images/jsunittesting3.png';

const image = require('../Images/jsunittesting3.png');

console.log(image);

const jsUnitTesting2 = "\n\
# JavaScript Unit Testing for .NET Developers — Part 2 Testing and Mocking with Jest\n\
\n\
## Introduction\n\
In the first part, we outlined what the aims for the series were as well as getting our tooling setup. In the second part, we are going to start talking about unit testing JavaScript in ES6 using Jest and where the similarity starts and ends with what you may already be familiar with in Visual Studio and testing classical OOP languages like C#.\n\
\n\
In this part we are going to cover:\n\
\n\
* Public and private in JavaScript\n\
* Dependencies and making testing easier on yourself\n\
* JavaScript mocks with Jest and creating them\n\
* Testing functions and side effects\n\
\n\
## Public and private in JavaScript\n\
One of the first things that we want to know about when coming in brand new to JavaScript from a .Net language is encapsulation. From a unit testing perspective, by making something public and something else private you are establishing a contract on the class that “these are the things it can do” and by extension the public things are your way into testing the system under test. The private things are implementation details, things known only to the class, you and the next developer to see how the public things are implemented.\n\
\n\
Without stating the obvious, there are no public and private keywords in JavaScript. What we do have with JavaScript is scope and what is available and visible within other scopes.\n\
\n\
To demonstrate this let’s look at how this was achieved before ES6.\n\
\n\
```\n\
var Foo = function() {\n\
  //This body is essentially the constructor\n\
  \n\
  // A private variable available inside the constructor and other functions here\n\
  var privateWord = 'hey I am a private variable';\n\
  \n\
  // A private function available inside the constructor and other functions here\n\
  function privateFunc(word) {\n\
    console.log(word);\n\
  }\n\
  \n\
  // A public property\n\
  this.publicWord = 'hey I am a public variable';\n\
  \n\
  // A public function\n\
  this.publicFunc = function(word){\n\
    var usedWord = word || privateWord;\n\
    privateFunc(usedWord);\n\
  }\n\
}\n\
\n\
var newFoo = new Foo();\n\
\n\
//print private variable\n\
newFoo.publicFunc();\n\
// \"hey I am a private variable\".\"\n\
\n\
//access and print public property\n\
newFoo.publicFunc(newFoo.publicWord);\n\
// \"hey I am a public variable\"\"\n\
```\n\
\n\
Here we created what is the equivalent to a class. We created a private variable and function and public property and function. We created a new Foo object and accessed the public method twice, once giving it the string from the public property and another forcing it to use the private string variable.\n\
\n\
Now, let's look at how we achieve the same behavior using ES6.\n\
\n\
```\n\
const privateWord = 'hey I am a private variable';\n\
const privateFunc = (word) => console.log(word);\n\
\n\
class Foo {\n\
  \n\
  constructor() {\n\
    const privateW  = \"I'm private\";\"\n\
    this.publicWord = \"I'm public\";\"\n\
  }\n\
  \n\
  publicMethod(word){\n\
    const wordToUse = word || privateWord;\n\
    privateFunc(wordToUse);\n\
  }\n\
}\n\
\n\
export Foo;\n\
\n\
```\n\
\n\
The class above can be used in the same way as the ES5 version. But look what happened to our private variable and function, they are no longer declared within the body of the class. Surely this would make the private variable and function available to everything?\n\
\n\
Well no, ES6 code is dependant on what you import and similarly export from a JavaScript file. To use the Foo class, you would then need another JavaScript file that looked something like this:\n\
\n\
```\n\
Import { Foo } from ‘Foo.js’;\n\
\n\
const newFoo = new Foo();\n\
////etc\n\
```\n\
\n\
Getting to grips with the export keyword and understanding what is and how to use what is being exported from a JavaScript file is an important concept in testing and development for JavaScript. In ES5 we concerned ourselves with scope alone, although this works it can become unwieldy in large application development. In ES6 things are more modular, we still have scope and the const and let words allow us to create variables that work in the same way as we would expect in .Net but export is a bit different.\n\
\n\
You can look at a JavaScript file as a class, you can create private variables and functions within it and only export the class you wanted as seen above. Export is flexible and will allow you to export anything, if you wanted to develop in a functional style you could just treat a JavaScript file as a library of functions without any classes and just export the functions. You can also just export variables allowing you to create shareable constants values.\n\
\n\
Fundamentally what you export from a JavaScript file is public. However, the user of the file has the choice of being able to import everything or selectively choose what they want which is different from using a class or interface in .Net. See https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export\n\
\n\
## Dependencies and making testing easier on yourself.\n\
So now that we have established what is at least equivalent to public and private in the .Net world let’s talk about dependencies.\n\
\n\
We established that with public (or export) we are saying this is the stuff that my class will do, this is the behavior and the data available, all good stuff so far.\n\
\n\
Unfortunately, from a testing perspective this isn’t very good. The reason why this isn’t very good is that because the import you are now using for your own class or function is equivalent to a using in C# where you can just new up a class from the namespace. You may have heard the expression “where there is new, there’s glue”. That is to say, you have just coupled and hard bound your code to what you have just imported.\n\
\n\
In solid the Dependency Inversion principle states:\n\
\n\
High-level modules should not depend on low-level modules. Both should depend on abstractions.\n\
Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions\n\
These two sentences can essentially be summed up by saying “you shouldn’t depend on and new up classes which contain the implementation details, instead you should depend and use an interface or an abstract class which your classes implement and can be replaced with using polymorphism”.\n\
\n\
By not depending upon abstractions your code becomes coupled. Imagine for a moment you are writing an API and as part of that API, you have a controller which has a service class which is essentially a wrapper for components within the system like persistence and saving data to a database. Your classes and dependencies would look like this:\n\
\n" +
`![image](${image})\n` +
"\n\
If you decided to test either the controller or service classes, you would have no choice but to call this an integration test. You cannot independently test a singular component without the lower level components. Instead what the DI principles teach us and what we usually do in .Net is to have something that looks more like this:\n\
\n" +
`![image](${image3})\n` +
"\n\
Here we have inverted the flow of control. Sure we have more things but in testing the controller I can test it independently from the service class by creating a stub or mock `IService`. I also get more control over my expected outputs given the fake object I create and use when testing the controller.\n\
\n\
That is great for what we’re used to, but we are in JavaScript land now and JavaScript doesn’t have interfaces. Does this mean that we’re stuck in depending on out low-level details?\n\
\n\
No not at all. Jest has built-in ways of getting the same functionality as using Moq in .Net, it just does it in a way you wouldn’t first expect which we will talk about next. But before we do, I hope I have got across that by importing and directly using something that was exported you are coupling yourself to it without using some tricks from Jest.\n\
\n\
As mentioned JavaScript doesn’t have interfaces. What it does have is duck typing, meaning that if you have one object that has a method on it called doStuff and you have another object which also has a method called doStuff these objects and methods are interchangeable and JavaScript won’t complain about them being of a different class. For example:\n\
\n\
```\n\
class Logger {\n\
  log(message){\n\
    console.log(message);\n\
  }\n\
}\n\
\n\
class OtherLogger {\n\
  log(message){\n\
    alert(message)\n\
  }\n\
}\n\
\n\
class MyImportantClass {\n\
  constructor(logger) {\n\
    this.logger = logger;\n\
  }\n\
  \n\
  doImportantStuff() {\n\
    this.logger.log('very important');\n\
  }\n\
}\n\
```\n\
\n\
In the snippet above, both the loggers are interchangeable and `MyImportantClass` doesn’t care which class it gets, just that it’s going to use something that has the log method on it. This is dependency injection for JavaScript.\n\
\n\
It is far better to inject a dependency into a class than it is to import and use a component in your JavaScript file. These dependencies of course need to be imported somewhere and they somehow need to get into the class that is going to use them. If you are using React you are already thinking in a modular way and should be thinking about separating and componentizing your components. To that end you should be thinking about non-visual container components vs your visual components.\n\
\n\
Your container components are essentially your composite root. These are the components that import all the dependencies and inject them into your visual components. I highly recommend you read https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0. If you are using React and Redux together you can use methods such as `mapStateToProps` and `mapDispatchToProps` which allow you to inject the dependencies into the component’s props.\n\
\n\
It is important to realize that the more you import and use the more mocking with Jest you will need to do later. This isn’t necessarily a bad thing after all Jest can easily inject these dependencies for you, but in my view, it is easier to use duck typing and hand-roll your own mocks injecting them as dependencies rather than use Jest alone. You must remain pragmatic it is just good to have an awareness of this coupling that comes from importing.\n\
\n\
## JavaScript mocks with Jest and creating them\n\
\n\
Before we get into mocks with Jest lets have a quick look at a test suite and a unit test.\n\
\n\
```\n\
describe('A test suite', () => {\n\
  \n\
  it('A single test', () => {\n\
    expect(true).toBe(true);\n\
  });\n\
});\n\
```\n\
\n\
Above we have a single test suite with a single test, this is the minimum you need to set up a test with Jest. You get the same setup and tear down methods that you would expect from something like NUnit so beforeEach, afterEach, etc (see https://jestjs.io/docs/en/setup-teardown.html also for assertions with expect https://jestjs.io/docs/en/expect)\n\
\n\
Now for an example of using mocks lets look at a practical example.\n\
\n\
```\n\
import defaultLocaleProvider from 'services/defaultLocaleProvider';\n\
import * as localeActionTypes from 'actions/locale/localeActionTypes';\n\
\n\
const initialState = {\n\
  locale: defaultLocaleProvider(navigator),\n\
};\n\
\n\
export default (state = initialState, action = {}) => {\n\
  switch (action.type) {\n\
    case localeActionTypes.CHANGE_LOCALE_LANGUAGE_SUCCESS:\n\
      return { ...state,\n\
        locale: action.locale };\n\
\n\
    default:\n\
      return state;\n\
  }\n\
};\n\
```\n\
\n\
Above is an example of a redux reducer used in changing the locale in a Redux application but that’s not important. What is important is that we have two dependencies in our file, one for the `defaultLocalProvider` and another for the `localActionTypes`. I’m not too concerned about the `localeActionTypes` but I am more concerned about the `defaultLocaleProvider`. It has implementation details which are dependent on getting the browser's locale and parsing it to a format that can later be used in identifying the correct localization file. Not of any concern to our reducer here.\n\
\n\
What we want is a mock implementation of our `defaultLocaleProvider` to return something we can test against, something dependable something we can expect in a test.\n\
\n\
What we need to do is to tell jest to look for a mock implementation of the `defaultLocaleProvider` when it runs the test:\n\
\n\
```\n\
import locReducer from 'reducers/localeReducer';\n\
\n\
jest.mock('services/defaultLocaleProvider');\n\
\n\
describe('Tests whether the locale reducer contains pure functions', () => {\n\
\n\
  it('locale reducer returns state with default mocked locale', () => {\n\
    const newState = locReducer();\n\
    expect(newState.locale).toBe('fakeLocale');\n\
  });\n\
});\n\
```\n\
\n\
Above we have imported the `localeReducer`, this is our system under test.  But beneath that we have a new line `jest.mock`, this instructs jest to look for the mock implementation of the `defaultLocaleProvider` (which the `localeReducer` imports in it’s own file) when `defaultLocaleProvider` is a dependency on our system under test.\n\
The mock for `defaultLocaleProvider` looks like this:\n\
\n\
```\n\
export default () => 'fakeLocale';\n\
```\n\
\n\
As you can see it is a simple function that simply returns the “fakeLocale” string.  When our reducer runs for the first time in our test it’s going to get its initial state (the locale) from this function, setting the locale to be “fakeLocale” and so we can test for this in our test.\n\
In order to get this to work though, we need a new folder where our `defaultLocaleProvider` lives in our solution called “__mocks__” and inside of that we must have another file named the same as the file we are mocking like so:\n\
\n" +
`![image](${image3})\n` +
"\n\
This mocks folder is a special folder that jest looks into when it’s looking for mock implementations. Generally, you perform this type of mocking when mocking a module.\n\
Jest.mock has an advantage as it automatically sets all exports of a module to the Mock Function later allowing you to overwrite them.\n\
Lets look at an alternative to `jest.mock` in `jest.SpyOn`\n\
We are going to try and test this simple bit of code:\n\
\n\
```\n\
export default () => (navigator.languages && navigator.languages[0])\n\
    || navigator.language\n\
    || navigator.userLanguage\n\
    || 'en';\n\
```\n\
\n\
Here we can see that there are no dependencies as such rather just a function with the navigator object, it then attempts to retrieve a language from the navigator else if nothing is found it will return “en”.\n\
In using Jest.SpyOn we don’t need a mock implementation in the same directory, instead we can do something like this:\n\
\n\
```\n\
import navigatorLocale from './navigatorLocale';\n\
\n\
describe('The Locale Provider', () => {\n\
\n\
  let languagesMock;\n\
\n\
  beforeAll(() => {\n\
    languagesMock = jest.spyOn(navigator, 'languages', 'get');\n\
  });\n\
\n\
  beforeEach(() => {\n\
    languagesMock.mockReturnValue(null);\n\
  });\n\
\n\
  it('should return default locale', () => {\n\
    const result = navigatorLocale();\n\
    expect(result).toBe('en');\n\
  });\n\
\n\
  it('should return first value from navigator.languages array', () => {\n\
    languagesMock.mockReturnValue(['ja', 'zh', 'en']);\n\
\n\
    const result = navigatorLocale();\n\
    expect(result).toBe('ja');\n\
  });\n\
});\n\
```\n\
\n\
Here we have imported the system under test which is `navigatorLocale`, we are taking advantage of `beforeAll` which is setting up the `langaugesMock` to be a mock, then `beforeEach` is resetting the return value to be null.\n\
In the first test we have no mocks and we are testing the default value is returned (“en”).  In the second we are setting up the return value to be an array then as we know from the code the first element from the languages array should be returned which in our case in “ja”.\n\
If there was a rule of thumb for jest.mock vs jest.spyon I would probably suggest that jest.mock be used when a required mock was needed across multiple files (mocking modules) and jest.spyon when it was needed in a single case.\n\
\n\
## Testing functions and side effects\n\
It could be that the above jest.mock and jest.spyon are too heavy weight for what you need or they may not exactly fit in that you would like to test for side effects, things that the function used or mutated that you may or may not have access to.  \n\
Imagine for a moment that you are writing a React component which encapsulates a Html button like this:\n\
\n\
```\n\
export const MyComponentButton = ({ onClick }) => (\n\
  <button\n\
    type=\"button\"\"\n\
    onClick={onClick}\n\
  >\n\
  </button>\n\
);\n\
```\n\
\n\
In this simple example, you want to make sure that the `onClick` function was called when the button was clicked.  This is a side effect of the event happening.\n\
You can do this with both jest.SpyOn and Jest.fn.  Jest.SpyOn has another use which is that you don’t have to replace the implementation details of the function being called, rather just ask Jest to watch the function so that you can later test for it having been called.\n\
Jest.fn doesn’t allow for restoring the original details of a mocked function but it is good to be aware of since Jest.SpyOn is syntactic sugar which uses Jest.fn. \n\
Going back to our example above, we can test this component like so:\n\
\n\
```\n\
import React from 'react';\n\
import ReactDOM from 'react-dom';\n\
import { mount } from 'enzyme';\n\
import { Button } from './Button';\n\
\n\
describe('Tests for the Button component', () => {\n\
\n\
  it('Button component clicked registers function.', () => {\n\
    \n\
    const mockOnClick = jest.fn();\n\
    const wrapper = mount(<Button {onClick=mockOnClick} />);\n\
    const button = wrapper.find('button');\n\
    button.simulate('click');\n\
\n\
    expect(mockOnClick).toBeCalled();\n\
  });\n\
});\n\
```\n\
\n\
Here we are using methods specific to testing React components, but the most important thing to note here is that we injected in a mock function called `mockOnClick`, we then simulated the click on the component and finally we expected the `mockOnClick` function to have been called. I could also have tested the amount of times this function was called.\n\
To add a mock implementation to Jest.SpyOn you must use the `mockImplementation` property like this:\n\
\n\
```\n\
const spyFunc = jest.SpyOn();\n\
spyFunc.mockImplementation(() => console.log(‘I am a mock’));\n\
```\n\
\n\
Adding your function as the parameter to the function but with jest.fn when you create the function you can add it as the first parameter when created:\n\
\n\
```\n\
const fnFunc = jest.fn(() => console.log(‘I am also a mock’));\n\
```\n\
\n\
Which to use will be up to you and the circumstances of the test.\n\
\n\
## Conclusion\n\
\n\
In this second part we covered encapsulation with JavaScript and why it is important, we also talked about the dependency inversion principle and how we typically implement it in .Net and the difficulties of doing the same with JavaScript and ES6 gaining an awareness of our dependencies.\n\
Finally, we talked about creating the three types of Jest mocks and when you would use each type and how to test for them.\n\
In the next part we are going to talk about testing react components.\n\
\n\
";

export default jsUnitTesting2;