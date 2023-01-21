const iterators = "\n\
# Exploring Iterators, Generators and Enumerables in JavaScript and .NET: A Guide to Building Your Own Enumerable.Range\n\
\n\
## Introduction\n\
JavaScript is a fun language and I’ve noticed that there are some similarities in the new features of JavaScript and C#.\n\
\n\
JavaScript doesn’t come with a built in `Enumerable.Range` and sometimes it can be handy either within LinqPad (RoslynPad) or even with code to just generate a set of numbers that we can then start applying LINQ statements to.\n\
\n\
You may already have a solution to this but in this blog we’re going to have a little play with some potentially unknown or underused features that came with ES6 and see how they can be applied to replicate Enumerable.Range.\n\
\n\
Some pre-requisites that we will cover are as follows:\n\
\n\
- prototype\n\
\n\
- Symbols and Symbol.iterator\n\
\n\
- generator functions\n\
\n\
If you already know what these are then please feel free to skip ahead to creating the range function.\n\
\n\
## Pre-requisites \n\
### Prototype\n\
In JavaScript, the \"prototype\" is an object that is used as a template for creating new objects, this is where JavaScripts prototypal inheritance model is implemented.\"\n\
\n\
Every object in JavaScript has a prototype, and the prototype can have its own properties and methods. When an object is created, it inherits all of the properties and methods from its prototype. This allows developers to create new objects that have the same properties and methods as existing objects, without having to re-create those properties and methods each time. The prototype can also be modified to add or change properties and methods on all objects that inherit from it, making it a powerful tool for managing object inheritance in JavaScript.\n\
\n\
### Symbols and Symbol.iterator\n\
In JavaScript, a Symbol is a new data type introduced in ES6 that represents a unique, non-string identifier. Unlike strings, symbols are guaranteed to be unique, making them useful for creating object properties that should not be enumerable or modifiable by other code. Symbols are created using the `Symbol()` constructor or the `Symbol.for()` method, which allows for the creation of a global symbol that can be retrieved using `Symbol.for()` with the same key. Symbols can be used as object property keys and can also be used as the key for a Map or Set (.net equivalent is Dictionary and HashSet).\n\
\n\
In JavaScript, the Symbol.iterator property is a built-in symbol that is used to create an iterator (think .net Enumerator) for an object. It is commonly used with arrays and other iterable objects to create a custom iteration behavior. When an object has a `Symbol.iterator` method defined, it is considered to be iterable. This method should return an iterator object, which has a `next()` method that returns the next item in the iteration. The use of `Symbol.iterator` enables the use of language features such as `for-of` loop and spread operator.\n\
\n\
### Generator functions and Similarities in .net\n\
The `Symbol.iterator` function in JavaScript is similar to the `GetEnumerator()` method in C# in that they both return an iterator object that can be used to iterate over the elements of a collection. In C#, the `IEnumerable<T>` interface defines the `GetEnumerator()` method, which returns an `IEnumerator<T>` object that can be used to iterate over the elements of a collection. The `IEnumerator<T>` interface defines the `MoveNext()` and Current properties, which are used to iterate over the elements of a collection.\n\
\n\
In JavaScript, the `Symbol.iterator` function returns an iterator object that has a `next()` function, which when called returns an object with two properties: `value` and `done`. The `value` property contains the current element in the iteration, and the done property is a boolean that indicates whether the iteration has completed.\n\
\n\
Consider the following code snippet which defines a generator:\n\
\n\
```\n\
var foo = function* getStuff() {\n\
    yield 1;\n\
}\n\
var iterator = foo();\n\
iterator.next() // {value: 1, done: false}\n\
iterator.next() // {value: undefined, done: true}\n\
```\n\
\n\
> A generator is a special kind of iterator that is defined using a function with the `*` syntax. It uses the `yield` keyword to return a value and pause the execution of the function, allowing the caller to resume the function later. A generator can be used to create an iterator that can produce a sequence of values over time, such as an infinite sequence or a sequence that is computed on-the-fly lazily.\n\
>In short, an iterator is an object that implements the Iterator interface and allows you to iterate over a collection of data, while a generator is a special type of iterator that allows you to generate a sequence of values over time using a function.\n\
\n\
When the done property is true, it means that the iteration has reached the end of the collection and there are no more items to iterate over. When the done property is false, it means that there are more items in the collection to be iterated over.\n\
\n\
Iterator functions are commonly used in JavaScript when working with iterable objects, such as arrays, to create a custom iteration behavior. The `Symbol.iterato`r property is used to define an iterator function for an object, and when an object has a `[Symbol.iterator]()` function defined, it is considered to be iterable. The `for-of` loop and the spread operator can be used with iterable objects, and they use the `next()` function of the iterator object to iterate over the elements of the collection.\n\
\n\
Both `Symbol.iterator` and `GetEnumerator` have the same goal, which is to provide an easy way to iterate over the elements of a collection, but the implementation and the way to use it is a bit different.\n\
\n\
Here's an example of how to implement the `IEnumerable<T>` interface and the `GetEnumerator()` method in C# to create a custom iterator for a collection:\n\
\n\
```\n\
class MyCollection<T> : IEnumerable<T>\n\
{\n\
    private T[] _items;\n\
\n\
    public MyCollection(T[] items)\n\
    {\n\
        _items = items;\n\
    }\n\
\n\
    public IEnumerator<T> GetEnumerator()\n\
    {\n\
        for (int i = 0; i < _items.Length; i++)\n\
        {\n\
            yield return _items[i];\n\
        }\n\
    }\n\
\n\
    IEnumerator IEnumerable.GetEnumerator()\n\
    {\n\
        return GetEnumerator();\n\
    }\n\
}\n\
```\n\
This example defines a `MyCollection<T>` class that implements the `IEnumerable<T>` interface. The class has a private array of items, and a constructor that takes an array of items as a parameter. The `GetEnumerator()` method returns an `IEnumerator<T>` object by using the `yield return` statement to return each item in the collection. The class also implements the non-generic `IEnumerable.GetEnumerator()` method, which simply calls the generic `GetEnumerator()` method.\n\
\n\
Once you've implemented the `IEnumerable<T>` interface, you can use the collection with the foreach loop:\n\
\n\
```\n\
var myCollection = new MyCollection<int>(new int[] { 1, 2, 3 });\n\
foreach (var item in myCollection)\n\
{\n\
    Console.WriteLine(item);\n\
}\n\
```\n\
This will print 1, 2, 3 in the console.\n\
\n\
In this example, the foreach loop calls the `GetEnumerator()` method on the myCollection object, which returns an `IEnumerator<int>` object. The foreach loop then uses the `MoveNext()` and Current properties of the `IEnumerator<int>` object to iterate over the elements of the collection.\n\
\n\
Here's an example of how to define a custom iterator in JavaScript using the `Symbol.iterator` property:\n\
\n\
```\n\
class MyCollection {\n\
    constructor(items) {\n\
        this._items = items;\n\
    }\n\
\n\
    *[Symbol.iterator]() {\n\
        for (let i = 0; i < this._items.length; i++) {\n\
            yield this._items[i];\n\
        }\n\
    }\n\
}\n\
```\n\
In this version, the `MyCollection` class defines the `Symbol.iterator` function as a generator function using the `*` symbol. This function uses the `yield` statement to return each item in the collection. The `for-of` loop can then use this generator function to iterate over the elements of the collection.\n\
\n\
You can also use it with the spread operator just like before:\n\
\n\
Once you've defined the class, you can use the collection with the `for-of` loop:\n\
\n\
```\n\
const myCollection = new MyCollection([1, 2, 3]);\n\
for (const item of myCollection) {\n\
    console.log(item);\n\
}\n\
```\n\
This will also print 1, 2, 3 in the console.\n\
\n\
In this example, the `for-of` loop calls the `Symbol.iterator` method on the myCollection object, which returns an iterator object. The `for-of` loop then uses the `next()` method of the iterator object to iterate over the elements of the collection.\n\
\n\
You can also use the `...` spread operator to convert the collection to an array:\n\
\n\
```\n\
const myCollection = new MyCollection([1, 2, 3]);\n\
const myArray = [...myCollection];\n\
console.log(myArray) // [1,2,3]\n\
```\n\
It will return an array containing the elements of the collection, just like the `IEnumerable<T>` in C#.\n\
\n\
## Creating our Range function\n\
Armed with the knowledge above how can we use this to create our functionality?\n\
\n\
One way to do this would be to extend the Number object by extending its prototype.\n\
\n\
> It should be noted that this isn’t best practice and probably should not be used in production code.\n\
\n\
We can then create an iterator function and attach this to the Number objects `Symbol.iterator` like so:\n\
```\n\
Number.prototype[Symbol.iterator] = function*() {}\n\
```\n\
> Remember the `*` indicates the function is a generator\n\
\n\
This function won’t do anything, so we should return something. You can access the number of the Number object by using `this`. We can create a `for` loop using this and a starting number, say 0.\n\
\n\
```\n\
Number.prototype[Symbol.iterator] = function*() {\n\
    for(let i = 0; i <= this; i++)\n\
        yield i;\n\
}\n\
```\n\
This can then be used with the `for of` loop like this:\n\
\n\
```\n\
const num = 5;\n\
for (const i of num) {\n\
    console.log(i); //will write out 0 to 5\n\
}\n\
```\n\
Or with the spread operator:\n\
\n\
```\n\
const num = 5;\n\
const numArray = [...num];\n\
console.log(numArray) // [0,1,2,3,4,5]\n\
```\n\
### Iterator with parameters\n\
This is nice but it doesn’t really do what `Enumerable.Range` does. `Enumerable.Range` takes an int (possibly a negative) and then yields an incremented value for the amount of times in the second parameter.\n\
\n\
To do this we need to provide a parameter to iterator function:\n\
\n\
```\n\
Number.prototype[Symbol.iterator] = function*(count) {\n\
    for(let i = 0; i < count; i++)\n\
        yield this+i;\n\
}\n\
```\n\
Unfortunately, the only way (I know of) in being able to set the parameter is accessing the function directory using syntax which is rather ugly:\n\
\n\
```\n\
[...9[Symbol.iterator](10)] // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]\n\
```\n\
However, we can wrap this in code in something that looks a bit more familiar.\n\
\n\
>For the sake of experimentation I am going to attach our function to the Array object (not it’s instances on the prototype).\n\
I am also not going to include any validation on the start and count parameters.\n\
\n\
We can do this:\n\
\n\
```\n\
Array.Range = function(start, count) = {\n\
    return [...start[Symbol.iterator](count)];\n\
}\n\
```\n\
Which allows us to use the `Array.Range` method in the same way we would with `Enumerable.Range` (forgiving us for the moment that an array is not the same as an Enumerable).\n\
\n\
```\n\
Array.Range(1, 10); //(10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\
```\n\
# Conclusion\n\
In this guide we have taken a look at what iterators and generators are and how that compares to `GetEnumerator` and `Enumerable<T>` in .net.\n\
\n\
Next we looked at what `Symbol.iterator` is used for natively, then we took a look at creating our own generator function and attaching this to the prototype of an existing object and how this can be extended and used in experimentation to create a sudo Enumerable.Range method and attaching it to the Array object.\n\
";

export default iterators;