GoBridge Training Notes
Speaker: Bill Kennedy
Hosted by: GoBridge Framingham

Home place:
https://github.com/ardanlabs/gotraining/tree/master/topics/courses/go
Topics covered 4/22 - 4/23
Language Mechanics: Everything except functions
Design
Concurrency
Profiling/Debugging


Language Mechanics
Gobridge Training
https://github.com/ardanlabs/gotraining/tree/master/topics/go/language

Homebase here:
https://github.com/ardanlabs/gotraining/blob/master/topics/courses/go/language/README.md


COST VS BENEFIT
Every decision comes with a cost. Do not make a decision until you understand the cost. This is what it means to be a software engineer. 

NUMA - non-uniform memory access

Go chose low latency over performance.

Follow idioms and have mechanical sympathy - your performance will improve.

Go is about running on a smaller footprint on a smaller machine.

Go runtime and schedule takes advantage of multicore software. You have to learn how to write multi-threaded software. 

A debugger does not allow you to create a mental model of the software. Debuggers are evil. You got to have a mental model of your code. ~Bill Kennedy

What is the cleanest, most solvable way to solve the problem. Keeping it simple and readable will help with its productivity.

After you have a solution, you then clean it and profile it. Optimize for speed that is fast enough.

If you do not understand the data you do not understand the problem. 

Use the debugger to gain a mental model of the software.

Refactoring has to be a part of the software life cycle. Every 6 weeks should involve refactoring.

What matters in software
People need to be able to read your code and have a mental model of how it works.
You must refactor for simplicity.

Performance is affected by: algorithm efficiency, data types, and pressure you put in GC 
Integrity: Every line of code is accurate and efficient. Every read or write has to be accurate, or else you need to take it down. Error handling need to be part of the main code - the code has to be reliable and work when the shit hits the fan.

A developer  writes a bug for every 20 lines of code.
Error handling is verbose, and seems inconvenient. But your code will have integrity.

Readability - be able to read the code without mental exhaustion. Your avgerage developer needs to be able to read the code without mental exhaustion.

Write code that does not hide the impact of the choices you make.


==

Bill Kennedy

https://github.com/ardanlabs/gotraining/

When working with Go you must design with thought. This class is about leveraging the language go and it’s essence under the go philosophy - consistent, reliable, applications. It all comes together on integrity.

portant corollary for Go: programming using concrete types and static dispatch allows the compiler to optimize more!

Key = what data structures you use and how you use them will determine where it goes to memory (heap vs stack). Each have its advantages - use them wisely to meet your objectives and be constiant with types 

 Each have its advantages - use them wisely to meet your objectives and be constiant with types (are you using values or pointers? Concrete or method interfaces?) The data type you are using generally boils down to the location (address) where the data is stored in the harward. It is faster to get data from the stack because its likely on the same page. It has built in garbage collection. On the heap go langs garbage collection is in play, but keep it mind that gc uses 25% of the cpus resources. 

When you write code, keep these things in mind.

====

Take this cost for this benefit
Go - chose a performance hit to take off latency
Go haves you thinking about the real machine. Others (C#, java) have you thinking about virtual machine
Goal of class: teach you the trade offs with your code design

Code design philosophy:
Things we value
Integrity: it drives reliability. Will it always work. All your code allocates memory, then read and writes memory. All code does 3 things. 
1 bug every 20 lines of code 
Go is all about less code

When the code base is too large, you hack because you can’t make good architectural-based decisions in your code design

Code readability - Optimize for correctness and not for performance
What is simple code: Write code that does not hide cost of what it’s doing. You should know how its going to perform and behave on the machine

Go does not operator overloading or constructors - because it hides the cost

Simplicity - about hiding cost and complexity
Readability - not hiding complexity

Go - complexity does not emerge in the language definition

Performance - works around readability and integrity
Use profiling tools

Integrity, readability, simplicity (comes from runtime), and performance

Data oriented design - all problems are data transformation problems
Go pushes toward mechanical simplicity
Follow idioms and language constructs

Go integrity = hardware most important

Data Types
Gives you amount of memory you are reading and writing
What to do with that memory - you know what it represents
An int is based on the word size for the architecture we are building against
Word - generic size of the machine
Defines the granualirity of data
Smallest size in computer is 1 byte - 8 bits
We look at pointer size of architecture - how large addresses are
Eg 64 bit machine - word size is 64 bit 
(typical)
Exception
Amd64p - is a 64 bit envir except pointers, which is 32 bit. Word size is 4 bytes, integrer is 4 bytes
P = playground
Single core, single threaded - 32 bit environment
32 bit addresses, words , integer
On your machines everything is 64

Know the bytes of memory used by your data types (int, bool, char, etc)

We create values in Go. Not objects.
Each data structure is 4-8 bytes of memory

Zero value
We create values in go. We don’t create objects. 
Everytime we create a value in go, those values get initialized for their zero value. There is a cost to this intialization

Wart: there are too many ways in go to declare variables and create values
Solution: follow the guidelines given by his team

Just be consitant. Consitancy is key to everything

Var: denotes zero value declaration. Var is the only way in go to get zero value
Literals 9/10 give you zero vals

Strings
A string is two words. Has two bins, first is nil and second is 0 (has its length)

:= to declare data type and initialize at same time
Go uses Conversion instead of Casting

Allows you say to the compiler to change the allocation.
We know its a 3 byte integer, can we allocate as a 4 byte integer
We now have a potential set up for memory issues
Go doesn’t have casting. It has conversion

Why conversion
We’re being explicit  - we have this value, make it to this. COnversion can cause a new memory allocation. This is better for integrity

Think of memory allocation as a word boundry

8 byte value should always fall on a 8 byte alightment
Rule: whatever the size of the value has to fall on the alignment

You use more memory than youre expecting because of the padding bytes

2. Algorithm efficiency
3. How much pressure we put on a garbage collector 

Go is about minimizing resources. Not the ony thing running on this thing of harware.

Padding must be accounted for in data structs because it affects size and representation. This affects resources

A literal allows us to perform a construciton and specify the value for the field
Empty literals = doesnt guarentee zero values. Don’t use emptry literals, use vars

Alignment keeps integrity. Look into alignment.
Working with structs and types
Key here is that go treats anonymous and named structs differently. See this example
https://play.golang.org/p/9Nq9uMklWm

Pointer mechanics - Pointers are for sharing
Pointers allow us to read and write data in different frames (across the program boundary)
Pointers are for sharing: https://play.golang.org/p/iDJIu0QZiw
https://github.com/ardanlabs/gotraining/tree/master/topics/go/language/pointers

Java, Ruby, Python - everything is pass by reference. Everything is value semantics.

C, C++, go - they have pass value. There are value semantics and pointer semantics

Pointers are for sharing values across boundires

Go routine … path of execution to install all the harware

Running on a thread that gets scheuled on the core so that these instrucitons get executed

Every go routine get its own block of memory called the stack

A function in go goes in the stack because the size of its frame is calculated at compile time. Frames are boxes of memory in stack. 
FRAME = BOX
& : address of

Stacks in go

Stack space cannot be shared in every go routing
To share it you need it on the heap

To keep it private you got to keep in on the stack

Go routine stacks start at 2 k

Everytime you call the a function,  stack, you call out a piece of memory from the stack
The size of frame is calculated at compile time

A function call is a cross over program boundry

Returning from a function returns the stack pointer

Run main
Which calls func incr

When you return a value inc

You go back to main

You scuffle through the stack using a stack pointer

Everytime you make a function call you frame out a piece of the stack

Using zero values, we clean memory on the way down


Stacks are great because
Preallocated
Self-cleaning when make a function call

Leverage the stack to cost less in memory

Stacks are self clearning

Garbage collection plays in the head


Pointer variables store addresses
Their names start with *
It has to have a name  and type
*int
This is so that we can read/write to it. 

PASS BY ADDRESS - &

*inc++ the value that the pointer points to. This is an incrementor

https://play.golang.org/p/BU--ow5n-r

Escape analysis - will this go on stack or heap

https://play.golang.org/p/9PLu3Kmr9r

-m will tell you whats happening based on escape analysis

If the compiler does not know the size of something in the call stack, will will not be in the call stack frame. Go says i dont know how much memory to allocate on the stack frame.

No go routines stack can be shared with any other stack

What happens if you make a function call,and you don’t have any more memory in stack

Stakcs are for storing values of functoins and are preallocated

Pointers are for sharing

If you share a value that goes up the call stack
Escape integrity analysis will put that value in heap

Leverahge use of & to share

When a go routine uses less tha 25% of stack space, the garbage collector  takes memory back
Growing stacks means copying the original stack and moves it somewhere else, and adds to it.

Stack - good because localized memories increase performance

Heap
Pacing algorithm - its job is to gather statistics about your running program, and determines the time it to take the hit for garbage collection
The pacing alogrithm determines how garbage colleciton is done

Performance hit is 25%
It’s taking 25% of your cpu capacity to run

This is what makes it a concurrent garbage collector

When the live heap hits a threshold, thats when we reallocate

You dont want to cause the live heap to constantly hit the goal - we want to minimize the pressure on the heap -- avoid putting pressure on gc (garbage collector). Otherwise, you have performance issues


Allocating more memory in heap initially actually is slower, because gc does more work checking everything. Its actually faster to have smaller allocation, recheck, then reallocate when at some threshold

With more cores (to CPU) it distributes the go routine to other cores


<<

When we prorgam we think about where we will keep the data, stack or heap.

Anyhting that requires heap requires gc
This involves the pacing algorithm

Otherwise (on heap) it is self cleaning, which is NOT garbage collection

You need to share things
This requres putting data on heap


We need to know when is it ok to share something(heap) vs when is it ok to put ok on stack?

Short lifespan - stack
Long lifespan -heap


>>
Factory function
A function that creates and intializes a value in go

Unmarshall
Gives you a pointer to your pointer


If and for statements come with another level of scope

Dont declare variables like 

Var var_name

This is like C. use := to declare and assign value

The farther a point a variable is being declared, the longer the name has to be (ie long_var_name)
If you create a variable, and use it immediately, the name can be short (like u, err)

Short var names = limited scope

No error handling in go. There is happy path and negative path

Error Handling : Happy path vs negative path

https://play.golang.org/p/rJMtATFqPi

A function can have as many empty point, you dont need else

Anything in the “if” is the negative path

Data structures
*optimize for correctness

Stucts: a type with different field. 

Not many

No linked lists

They use arrays and slicing
Which is faster, traversing a linked list or traversing a matrix?

To solve, create a file with _test in name and have a function with the word benchmark

Link list traversal: 1000
Column traversal: 500
Row traversal: 2000

These are the same data strcutures! But we are traversing the same structure in different ways. Why does this happen?

Create predictable way to access memory
Allocating contiguous memory and predictable access patterns allow us to optimize performance this can be done with Arrays.

Why does it matter?
The OS is what manages the physical memory of machine and the virtual memory. The OS manages physical memory through multiple pages (each is a 4K page). Keep data in one page is good for performance. 

How you lay your data and access it is crucial for performance.

Operate data within the cache. Remember Scott’s talk.

What is the mechanics for this?
Main memory is slow

CPU/cache - fast memory (level 1 cache)
Scott myers

Small is the same as fast
Total amount of memory you have is total cache memory -- if you care about performance

https://github.com/ardanlabs/gotraining/blob/master/topics/language/arrays/README.md

Every processor has its own local main memory
Costs you 100 clock cycles
Numa - does local vs non local (L3 cache)
This is bad on a large scale.

Memory inside caches is designed for higher speed
Cache system tries to hide latency. There are prefetchers that do this. 

We want to create predictable access pattern (and stride) of memory

By accessing memory in a predictable way, we hide latency costs. We do this by leveraging cache lines. - prefecthers pick up on that 

2 ways:
Allocated a contiguous block of memory, and traverse it to access it. Arrays - this is important for hardware
Slices - this is important for go

TLB - keeps a small table of virtual memory addresses to physical memory addresses. Each block is 4k and is called a page. There are many pages in a TLB
The OS system is managing that - it knows where all pages are

If we try to access memory from a page that does not have the address in TLB, we then have to talk to the OS, which takes time

We want to access memory from same page to avoid this

This is why predictable access patterns are important.

It takes more memory to work with bigger arrays because that will involve using more pages, and this takes more time.

Explaining results

Row traversal - prob same or nearby page (traverse each element in row until you reach the end
Linked list - prob same page
Column traversal - prob different pages! We have to the os every time! (this is because the data is written column by column)

Go only has array, slices, and maps

Slices access arrays

This is to make access to hardware predictable, which makes the code faster.

Object oriented patterns make linked lists

Object oriented patterns make objects that link to each other - linked list

In go we can use object oriented patterns, but it won’t be as fast.

If data changes, the algorithms would no longer work

Think about the data. What does the input data look like. What kind of output do you want.

Data Oriented Design - Design Philosophy
Data oriented design is understanding the data you ware working with first, and building your code around that.

Writing anything for tomorrow outside of design is a waste of time. Don’t do it. Write code you only need for today.

Design the code so that you can change and refactor, but only write for what you need today. No extra functions.

Steps to work

Get something to work. Solve problems in the concrete first - prototype.
Learn
Benchmark
Run again.
Then decouple. Expand the code to be able to work for other changes.

Functions are great, because you see the input. This makes the input and output clear. Do not hide that, ever.

With methods, the state changes and its not clear what the input is.

Value semantics - you are working on copied values. You are not working on the actual values. Your intent is what happens.

Pointer semantics - you are working on shared values. You work on data with capability (data that have methods in it ie an object). You work with pointers. 

Values -> you make copies, this data goes on stack, performance
Pointer semantics -> you work at the same thing, you have efficiency

When should data have capability (ie have state). Data that has a capability.
When data has a capability, you can use polymorphism.

You choose pointer semantics or value semantics. This is done for data integrity in an API. We want to know where all our data goes. 

You cannot have both. At the time you declare the type, you must know if you will use value or pointer semantics. The only time this is allowed is for an unmarshall call.

All we have is state and behavior.
Go separates state and behavior. Struct bill has no capability.


Use value semantics if the outcome is a new thing (eg time, if you add 5 seconds, time is something else)

Use pointer semantics if the outcome is refering to same thing (eg changing the username of a person, the person is the same).


The size of an array is part of its type. You cannot just give a variable array

https://play.golang.org/p/-ZwNVnjXRQ

fmt.Printf - can print data structures we create

Println - only print go data structures

Reference Types
A whole other section. I need to fill this in.
Make, Map, Channels - important functions in this world
Arrays
https://github.com/ardanlabs/gotraining/blob/master/topics/go/language/arrays/README.md
Strings are magic because we know the size ahead of time, thus we store it in the stack.

Backing Array: A string array that is stored on the stack.
We know the size of a string at compile time (8 bytes on playground, 16 locally). You make an array of strings. This array is stored on stack. When we work in go, we access the address, which allows to get data from stack and NOT HEAP. Copies are fast, and accessing copies are fast.

A size of a cache line is 64 bytes. Anything between 1 and 64 bytes is you getting it at the same cost.
Slices
Reference Type -  the fact that the zero value is nil

https://play.golang.org/p/TkJxbZKFRl

The zero value for a string is empty
Slices
Maps
Channels
Interface values
Function values

Use make to create slices
Slice := make([]string, 5)

Length: total number of elements you can read and write from the backing array and pointer position
Capacity: total number of elements that exist in that backing array at that position. Does not mean read and write access

Slices allow you to create a dynamic data structure AND have contiguous amounts of memory

How to use slices

Reading data and storing it in memory - a slice of values (from apis, datavase). A slice with pointers is basically a linked list. We want to keep our memory as contiguous as possible.

Empty Slice : A slice with empty values (zero value)
Var data []string
If it has nothing, it returns null

Nil Slice: Creates an empty slice (nil values)
Data := []string{}
This is preallocated to be 24 bytes

If it has noting, it returns empty slice []

Use the built-in function append to add to the slice.

Empty Struct
Var e struct{}
A special data structure in go. It has a pointer. What is it pointing to? An empty string.
Why? This is used to discern if we have no results (empty slice / list) or it wasn’t initialized.

		
old slice header = append(old slice header)
		
/memory leaks in go happen when you lose the reference to the pointer. this is why you must replace the old slice header

Append - value semantics : we pass data, and we get its own copy of slice value. 
Be careful how you append data. You avoid memory links by NOT handing on to a reference you shouldn’t be handing on to it. A leak is a reference that is not going away.

How does append work? Go compares the size and capacity of backing array. If the backing array is at capacity, and you append,  and double the intial capacity. (ie 1 -> 2, 2 -> 4, 4 -> 8)

Append will double the size of capacity the backing array for the first 1000 elements.
After that it will be 20%
This is even if you are appending 1 value
But the length is only added 1 at a time

If you already know the size, then preallocate the capacity

If you don’t know the initial size of slice, the backing array will be stored in heap

If you do know, then you CAN preallocate and store it to the stack...this can be done in make

Slicing in go is like python
Include the starting value but not the ending index
[a:b)

Slice2 := slice1[2:4]



The length is 2

The CAPACITY is the number of elements remaining after that pointer position

When you slice an array, and so things to that slice…. If you append or assign….BAD because you change the value in the backing array!!!

https://play.golang.org/p/P-FFBQONiz
https://play.golang.org/p/FfphPV9IHv
https://play.golang.org/p/PnwM8Qogve


Mechanics of code

Methods, interfaces, and embedding

Make your code easy to add. If you optmize for performance people will hack away at your code

Go is an object oriented programming language
-has encapsulate
-take existing types and resuse them
-has code that is polymophic

Focus on code that is data-oriented design

A function in go is called a method. It can impliment a a method with a value reciever

this and self are recievers. you can name them yourself in go. Keep the name short

You have method recievers and pointer recievers

How to choose?

User value: if you change your name, do you just change name or create a whole new person? You simply change the name - you return a new value

Factory function: creates a value, intializes it to use, and returns the value

This is how we intialize values for use

Sharing is safer than making copies. Not every value can be copy 

The API must respect the nature of the type.

You must undertstand the nature of your type.

IS THIS A VALUE? Value reciever: copy of values
IS THIS TO BE SHARED? Pointer reciever : shared access

Important semantics

https://play.golang.org/p/UP7qzHN-Au
	
value reciever when you work on copy
pointer reciever when you are sharing
implimentation does not define which reciever to use, its the nature of the data (should it be a copy or should it be mutable)

https://play.golang.org/p/EU1MvrEks9

Packages and Architecture
Every folder is a self contained unit of code. A static library.
Think of every folder in your tree as a micro service. This is the highest level of decoupling.

Concrete types: strcut types. They have methods
Interface type: does not have method

INterfaces store values of pointers. It is a relationship a storage

The main difference between concrete and interface type is storage

Concrete : memory allocation for heap - better for performance

iTable is a matrix of functions that points to functions we want to call


How to group code
Anything related to concrete type
Group like this
{{
Type 
Factor
Function 
Methods
}}

Every API should accept data on its own terms.
You should not have a model library. Do not have an API to define types. NO commons, helpers, utils…. This is to prevent cascading changes. If you make a change *up on the top* you will make cascading changes.

If there is an exception, that is fine. Just comment it.

https://play.golang.org/p/x4scHYS0J5

Method sets
how we create polymorphic behavior in go
Rules are there for integrity

Working with value
Working with pointer
Pointer recievers can only accept pointers, and store pointers in the interface.

Value recievers can accept either.

https://play.golang.org/p/4R3_QVKNli



You are thinking about if your APIs will use value semantics or pointer semantics, and then follow it that way in the API. Are you using value semantics or pointers semantics?

Code is readability when there is consistency in how things are done.

You got to listen to the words you are using when talking about your code - one way convo should be consistant with your code

Embedding

Use it to share state or behavior between types.


Method sets you set rules to how data is declared and functions implemented 
Using Embedding allows you to do exceptions?

How this is done is through values vs pointers 

In API design we focus on behavior of data


=====
Package oriented design - packages on the same level should not depend on each other. 

Reorganize your packages to show import relationships
Import down….don’t ever import up.

https://www.goinggo.net/2017/02/design-philosophy-on-packaging.html


https://github.com/ardanlabs/gotraining/blob/master/topics/go/design/packaging/README.md

Kit                     Application

├── CONTRIBUTORS        ├── cmd/
├── LICENSE             ├── internal/
├── README.md           │   └── platform/
├── cfg/                └── vendor/
├── examples/
├── log/
├── pool/
├── tcp/
├── timezone/
├── udp/
└── web/
Platform - internal tools that apply only to this application.
Internal - code for the API only. Outside APIs do not need it.

Is this an internal package or a platform package

Why do we need this package?
What does it provide?
And where does it live?

Now we can validate the dependency
Do not import another package for its types

To packages at the same import level cannot import each other.
Everything is go is built as a std library. 

Use the source code tree to determine that

Cmd - it is the app. It is the part of the application that makes the decisions.
Dependencies == Opinions

Keep this mentality : every package on the same level is written in a different language.

Embedding

In go you have inner and outer types.

Similar to OOP, you have can different methods for inner and outer types
https://play.golang.org/p/hrlVvoogkK

Encapsulation

When the compiler goes thru each folder, it compiles each folder as its own static library. This is what packaging means.

Every folder represents a packet, and every should provide something. Should contain things like types. Packages like types, helpers, etc

The package name counts as mainspace. No underscores, or anything like that.

If first letter of package is lowercase = not exported
If first letter of package is uppercase = yes exported

There is no public, private, etc


API Design Philosophy
IN that 3rd time, think about boilerplating something

“Programming smells”: bad habits that show up in code

Use of common states : too restructive. Find something in common to create small groups and large groups. Group things by common behavior, not by DNA (what they fundamentally are)
Group by what they do, not by what they are.


OOP design: state and not behavior is key
Bad: grouping cats and dogs under animal
The animal is an abstraction layer -  its not used

This is what it means to have data-oriented design

Interface - describes what they do. This is the common behavior they exhibit.
INterfacing is critical for data-oriented design

Group cat and dog by what the speak.

Ask: What is the common behavior when building an API

Guidelines

*declare types that are something new or unique
*validate that a value of any type is created or used on its own
*emded types to reuse existing behaviors you need to satisfy
*question types that are an alias or abstraction for an existing type
*question types whose sole purpose is to share common state


*emded types in other types because of the behaviors you must satisfy

Prototyping and proof of concepts
(which one is the most important?) work in the concrete. Find a working implimentation. Once you impliment in concrete, then you are going. 
Solve one problem at a time, then refactor. 

When is a product done.

You need to have test coverage. 100% code coverage on the happy path (when everything is right). 80% is everything else.
What has to change in your code? Decouple the change from that code (refactor, decouple). Do that.

Initializing everything in the concrete. You solve one problem at a time. THen build on that.

Layer your apis from the beginning
(upper level - for devs who dont care about control)
(lower level - for devs who want control)


https://github.com/ardanlabs/gotraining/tree/master/topics/api/composition

Functions - you have to put in all inputs
Methods - you just pass values

Functions are most useful for apis - they give you better readaibility for apis because you have to explicitly pass values

For methods that’s not necessary

Copy is still coupled to the concrete

Ask for the behavior you need, and only what you need.

How to make code that is only dirven for purpose?
Pull and store method - you break up the actions to be specific, as defined by the flow of data.
Leverage interafaces to group by what it does.

You need to think about data structures in a language when transforming data
Composition in go. Only in main nitialization will change

Decoupling from change is what Go awesome.

Phase I: define goals for prototype. Define a concrete problem
Phase II: solve the concrete problem, directly
Phase III: decouple, refactor
Design

https://github.com/ardanlabs/gotraining/tree/master/topics/courses/go/design
Interface and Composition Design
Group by behavior in go not by state.

Do not group people by whom they are. Group people by what they do.

The dog vs cat example. Don’t group them because they are animals. Group them by what they do.

It’s not about the state. It is about behavior.

See the same thing with coding in go.
https://play.golang.org/p/yOj1zJCRlj

Code is done with you have 80% overall, and 100% happy path.
Doesn’t mean you need to go back and find edge cases.
Code from bottom up. Work from the concrete up.
You need to refactor code to decouple it from change in the architecture.
You solve one problem at a time. You solve enough problems you get to go home.
When you are done and code is in production, ask yourself...what can change.
In this example, the systems can change (pil and Xenia).
https://play.golang.org/p/p3jYRdklTC

After you are done here, and code is in production, then we ask...how can this change? Then we put it in production. Then ask yourself, “what can change”? Then you can work on decoupling.

https://play.golang.org/p/_bRSBQ8G6U
Key is to use the embedding and composition to decouple, and adapt to change in future,

INterface pollution is what happens when you start with interface pollution. Interfaces only need the behavior that is needed for implementation.
https://play.golang.org/p/wHDLvxe8hC
Always start from bottom up.

// Here are some guidelines around interface pollution:
// * Use an interface:
//      * When users of the API need to provide an implementation detail.
//      * When API’s have multiple implementations that need to be maintained.
//      * When parts of the API that can change have been identified and require decoupling.
// * Question an interface:
//      * When its only purpose is for writing testable API’s (write usable API’s first).
//      * When it’s not providing support for the API to decouple from change.
//      * When it's not clear how the interface makes the code better.

(making a testable API makes it more complex than it needs to be)

Error Handling
Error is meant to provide context, so that the developer will know how to proceed.
Here’s what you can do:

 Shut it down
How to shut down go application

Shutdown

os.exit()

2. Display an error, proceed.

Panic
If you need a stack trace, you use this to figure out what’s going on.

Error handling in go is an interface.

Pointer semantics are used to implement errors from concrete type

Keep error handling decoupled. Don’t attribute type to errors

4 core behaviors of errors

Temporary
Timeout
Not Found

Use pointer semantics when implementing your own error types.

Interface values are valueless
Use pointer semantics, and make sure things are being done at address level.

Team needs to be consistent in logging and error handling.

What does it mean to handle an error?
Don’t need to do anything: It means logging it, put up the stack, and pass it to log.Means nothing else to do.
Shut it down: Log it, and shut down if there is an integrity issue

This is actionable. We’re going to look at it.

We had an actionable error, where did it all start from? The error needs context:
The stack
The data input

Be honest about what logs are for:
Debugging and tracing

Only write to stdout when there is an actual error

Concurrency
The job of the scheduler is to run within a certain amount of time.
Context switches take up resources
You need to understand the workload you are doing 

Three states of threads
Executing
Runnable state
Sleep

Process is a container of resources for your application

You have to understand how the OS does multi-threaded software
If you have more threads, than cores, then it will slow things down.
You need to understand how the hardware works

Kernal moder - this software can do anything it wants. Eg drivers run in kernal mode, and thats why the can crash the machine

User mode- this is not allowed to do anything it wants. And if it does somthing bad, it stops the app to protect the machine.

The go scheduler is running at user mode. THe runtime scheduling is doing the coorperation.
There have to be events in your software to give the scheduler an opportunity to switch context
https://github.com/ardanlabs/gotraining/blob/master/topics/courses/go/concurrency/README.md

We don’t write loops that don’t make function calls.

The key is to give the scheduler opportunities to make switches.
But context switches have overhead.

A context switch in Go does not mean the system goes to sleep.

Hyper Threading - doing more in one thread.
Minimizing load and focusing on one thread
It is critical that you know when a go routine shuts down

Data race: When you have something reading a writing to shared memory at the same time.
If you have concurrent memory access to same memory location it must be synchronized.
Do not use channels, they are too slow. Use mutex and atomic instructions for synchronized access to shared state. Channels should only be for coordination and orchestration.

We need concurrency for deadlines and cancellation.
Splitting work to run in parallel, is not useful. 
Read the data race section.
https://github.com/ardanlabs/gotraining/blob/master/topics/go/concurrency/data_race/README.md

Channels
https://github.com/ardanlabs/gotraining/blob/master/topics/go/concurrency/channels/README.md

Channels == signal. Signal another people to do something with data or w/o it
Unbuffered channels allow you signal with data and get a guarantee that the signal has been received. It does the receive first.
Cost is latency, but it is worth for the guarantee of receiving it.

Buffers are there for us to understand if signal has been received.

Your code is about everything that is failing. What happens

Buffer too big -- gonna wait to long before we see number
Buffer too small -- false positives
It’s all about signaling
Closing a channel does not clean up resources
Closing a channel is a state change
Do your code in the pattern of signaling data and receiving data

Rate limiting and timeouts for load handling if you are not using a load handler

Stack Trace
Not hiding information is helpful for stack traces

Use GC trace to identify memory leaks

See number of go routines

Go trace tool helps you see every event
Traces can show you events, and what is not running … ie issues
Bill said that you can get detailed stack trace information here
https://making.pusher.com/go-tool-trace/


Go Profiling
To profile your code allows you to see its performance, and to see how many processes are running.
https://github.com/ardanlabs/gotraining/blob/master/topics/go/profiling/README.md

localhost:5000/debug/pprop

Profiling allows you see what exactly is happening - remember how to.Lower ate up 12 GB of memory

Memory profile

Profiling is a request, so remember to have your time out greater than the time required from profiling (eg profile sec 30s, your timeout should be set to 60s)
To learn about packages, write a program that uses it.

In your weak areas… see if you can identify a better algorithm

The profile tells us what is allocating

What kind of profiles we do?
Memory Profile
CPU profile
Block profiling

Go has call graphs, which can be helpful to find bottle necks



