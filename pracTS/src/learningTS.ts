const a : number = 5;
console.log(a)

-------------------------------------------------------------------------------------------------------

INTERFACE

interface User { 
    username : string,
    Id : number,
    email ?: string //optional field
}

const user1 : User = {
    username : "shubh",
    Id : 3232
}

const user2 : User = {
    username : "Shubham",
    Id : 2323,
    email : "skdsk@sdsj"
}

console.log(user1.username)
console.log(user2.email)


-------------------------------------------------------------------------------------------------------


function callingAnother(fn : (c:number)=>void , c : number){
    setTimeout(()=>{
        fn(c)
    },2000)
}

function callThis(c : number){
    console.log(c+1)
}

callingAnother(callThis , 2)


-------------------------------------------------------------------------------------------------------


CLASS IMPLEMENTING INTERFACE


you can create a class which implements interface


greet : (phrase : string) => void --> this means greet is a variable which has a function that takes a string named "phrase" and returns nothing
greet(phrase:string) : void --> this means that greet is a function which takes a string named "phrase" and returns nothing

interface Person{
    name : string,
    age : number,
    greet(phrase : string) : void
}

class Employees implements Person {
    name : string
    age : number

    constructor(n : string , a : number){
        this.name = n;
        this.age = a
    }

    greet(phrase: string):void{
        console.log(`${phrase} ${this.name}`)
    }
}

const e = new Employees("Shubham" ,24)
e.greet("hi")


-------------------------------------------------------------------------------------------------------


EXTENDS


interface can extend another interfaces , types can not use extends

interface User{
    userName: string,
    phone: number
}

interface Student{
    id: number,
    name: string
}

interface Person extends User , Student {
    title : string
}

const student1 : Person = {
    userName : "Sh7bham",
    phone : 8776867,
    id : 7,
    name : "Shubham",
    title : "snjcskc" 
}

here , person will have all the properties of user and student , additionally it can have its properties also




-------------------------------------------------------------------------------------------------------



only interface can be used to implemement classes not types


TYPES

types let you do few xtra things
Union Intersection



UNION


function greet(id:number){
    return id
}

greet(1) --> you can do this
but not greet("hey")

what if you want id as a string or a number

function greet(id : number | string){
    return id
}

or you can do as 
type GreetArg = number | string | boolean

function greet( id : GreetArg){
    return id
}


INERSECTION


type Employee = {
    name : string;
    startDate : Date;
};

interface Manager {
    name : string,
    department : string
}

type TeamLead = Employee & Manager;
TeamLead has all three properties , name startDate , department


whenever you have to do & or | of types , you have to use type
whenever you want to create a class which implements a type , you have to use interface


const teamLead : TeamLead = {
    name : "Shubham",
    department : "IT",
    startDate : 
}



-------------------------------------------------------------------------------------------------------

ARRAYS

just put [] after number 
like -> number[]

creating a fn which returns max element

function maxValue(arr : number[]) : number {
    let max = 0;
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i] > max) max = arr[i]
    }

    return max
}

console.log(maxValue([2,5,6,2,8,10]))

you can also do this:

type NumberArr = number[]

function maxValue(arr : NumberArr) : number {
        let max = 0;
        for(let i = 0 ; i < arr.length ; i++){
            if(arr[i] > max) max = arr[i]
        }
    
        return max
    }

you can not do
interface NumberArr number[]


can be used as :
interface User{
    username : string,
    id : number,
    email : string
}

type UserArr = User[]


-------------------------------------------------------------------------------------------------------

RANDOM

function doSomething(cb:(str : string , num : number) => string) : string {
    const x = cb("hi" , 2)
    return "hey"
}

function doSomething() : string {} 
it takes cb as arg which is a function that takes two arg , one string and one number and returns a string
cb: (str : string , num : number ) : string


-------------------------------------------------------------------------------------------------------


ENUMS   

lets say you have a fn that accepts keys strokes up,down,left,right

function pressedKey(str : string) : void{
    console.log(str)
}

pressedKey("down")
pressedKey("up")
pressedKey("dssdscs")

the problem is , anything can be passed as arg inside the fn call , there must be a way of telling ts
that accept only up,down,left,right as arg

for that we can do as

type keyInput = "up" | "down" | "left" | "right" 

function pressedKey(str : keyInput) : void{
    console.log(str)
}

pressedKey("sbjdcsjc") ---> this gives error now
pressedKey("down") --> no error


Much cleaner way is to use ENUM

Enum : Enums (short for enumerations) in ts is a feature that allows you to define set of named constants

enum Direction {
    up, 0
    down, 1
    left, 2
    right 3
}

function pressedKey(str : Direction) : void{
        console.log(str)
}

pressedKey(Direction.down) --> will print 1
pressedKey(Direction.up) --> will print 0

enum is a ts thing , in js file it gets compiled and assigned number accordingly

var Direction;
(function (Direction) {
    Direction[Direction["down"] = 0] = "down";
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction || (Direction = {}));

function pressedKey(str) {
    console.log(str);
}
pressedKey(Direction.down);
pressedKey(Direction.up);


if you want to set that only certain words prints out and not 0,1,2,3 , you can do

enum Direction {
    up = "UP", 
    down = "DOWN", 
    left = "LEFT", 
    right = "RIGHT" 
}

function pressedKey(str : Direction) : void{
        console.log(str)
}

pressedKey(Direction.down) --> will now print DOWN
pressedKey(Direction.up) --> will now print UP

if you want to change the numbering , you can do

enum Direction {
    up = 1, 
    down,  
    left, 
    right
}

down , left , right will automatically get assigned 2,3,4 or you can assign them any value of your wish

function pressedKey(str : Direction) : void{
        console.log(str)
}

pressedKey(Direction.down) --> will now print 2
pressedKey(Direction.up) --> will now print 1

UseCase of ENUM in express

enum ResponseStatus {
    Success = 200,
    notFound = 404,
    Error = 500
}

app.get('/',(req,res)=>{
    if(!req.query.userId){
        res.sendStatus(ResponseStatus.notFound).json({})
    }

    res.json({})
})


-------------------------------------------------------------------------------------------------------


GENERICS

lets write a function that returns the first element of the array of type either number or string 

type Input = number | string

function firstElement(arr : Input[]) : Input {
    return arr[0]
}

let arr = ["shubham" , "singh"]

console.log(firstElement(arr).toUpperCase()) --> toUpperCase gives error , saying you can't use this 
fn on Input type although toUpperCase is applicable in strings , here it cant use it since fn returning
type is Input which is either a number or string for it , it can be either a number or string it doesnt
know for sure

also you dont want someone to give an array which have both string and number , like

type Input = number | string

function firstElement(arr : Input[]) : Input {
    return arr[0]
}

 firstElement(["shubham" , "singh" ,1 ,2]) --> gives no error

you can do this for such problem :

type Input = number | string

function firstElement( arr : number[] | string[]) : Input {
    return arr[0]
}

firstElement(["shubham" , "singh"])
firstElement([1 , 2])

Much cleaner way is to use GENERICS 

GENERICS : Generic enables you to create component that work with any data type while still providing 
 compile time type safety

function identity<T>(arg : T){
    return arg
}

let output1 = identity<string>("Hi")
let output2 = identity<number>(2)


function firstElement(arr : Input[]) : Input {
    return arr[0]
}

 firstElement(["shubham" , "singh" ,1 ,2]) --> gives no error

for this you can use generic as :

function firstElement<T>(arr : T[]) : T{
    return arr[0]
}

firstElement<string>(["hii" , "hey"]) --> no error
firstElement<string>([1 , "hey"]) --> gives error for passing a number for string array


firstElement<(string | number)>([2,"hey","shubham",5]) --> can do this as well


can also do for interface

interface User{
    name : string
}

firstElement<User>([{name : "Shubham"} , {name : "Singh"}])



-------------------------------------------------------------------------------------------------------


EXPORTING AND IMPORTING MODULES

-------------------------------------------------------------------------------------------------------

ADVANCE TS

PICK

Pick allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type)

interface User {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
}

lets say you have to create a fn which takes three arg id , name and email same as User's , one way is to
create a new interface or type and giving it to the args , like :

interface argTypes {
    id: string,
    name: string,
    email: string
}

function someFns(args : argTypes){}

but this way has some issues , What if User's id type changes from string to number , we have to change 
the type of interface of args also , we dont want that
we want a way in which args somehow picks the type defined in the User's , for that we can use PICK :

type argTypes = Pick<User , 'name'|'id'|'email'>

function someFns( args : argTypes){}


-------------------------------------------------------------------------------------------------------


PARTIALS


Partial makes all properties of a type optional , creating a type with the same properties , but each 
marked as optional

interface User{
    name ?: string,
    email ?: string,
    image ?: string
}

you can also use this while using PICK 

interface User {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
}

type argTypes = Pick<User, 'name'|'email'|'id'>

type optionalArgTypes = Partial<argTypes>

function someFns(agrs : optionalArgTypes){} --> this fns accepts args name email and id but they are not
necessary to proceed , they are optional



-------------------------------------------------------------------------------------------------------


 READ-ONLY

When you have a configuration object that should not be altered after initialization , making it Readonly
ensures its properties cannot be changed

const User = {
    userName: "xyz",
    email: "adsa"
}

User.userName = "dncdc" --> can be changed , but what if we dont want it to be changed anyhow

we can do : 

type User = { 
    readonly username: string,
    readonly id: number
}

const user : User = {
    username: "xys",
    id: 21
}

user.username = "dsdc" --> gives error
user.id = 22 --> gives error

can also be done as : 

type User = { 
        username: string,
        id: number
    }
    
const user : Readonly<User> = {
    username: "xys",
    id: 21
}

user.id = 22 --> gives error


-------------------------------------------------------------------------------------------------------


RECORDS AND MAPS

cleaner ways to deal with objects 

type userInfo = {
    username : string,
    id : number
}

type User = {
    [key : string] : userInfo
}

const user : User = {
    "sasas" : {username : "dsc" , id : 21},
    "sdcsc" : {username : "sdc" , id : 22}
}

one way of defining types of user is this , to create to new types then proceeding , other and more cleaner
way is to use RECORD

type userInfo = {
    username : string,
    id : number
}

type User = Record<string , userInfo>

const user : User = {
    "sasas" : {username : "dsc" , id : 21},
    "sdcsc" : {username : "sdc" , id : 22}
}


MAPS

you can set , get , delete , key-value pairs using maps

const user = new Map()
user.set("saxx-e" , { msg : "i want seggs"})
user.set("saxx-y" , { msg : "we want seggs"})

const one = user.get("saxx-y")
user.delete("saxx-e")

you can also tell MAP , the types of key and values

type User = {
    userName: string,
    id: number
}

const allUsers = new Map<String , User>()

allUsers.set("sdigc" , {    
    userName : "abc",         
    id: 22                    
})                          --> gives error

allUsers.set(22 , {
    userName : "axx" , 
    id : 22
})


-------------------------------------------------------------------------------------------------------


EXCLUDES

In a function that can accept several types of inputs but you want to exclude specific types from being
passed to it


type EventType = 'click' | 'scroll' | 'mousemove'
type ExcludeEvent = Exclude<EventType , 'scroll'> // 'click' | 'mousemove'

const handleEvent = (event : ExcludeEvent) => {
    console.log(`Handling event : ${event}`);
}

handleEvent('click') --> no error
handleEvent('scroll') --> gives error


-------------------------------------------------------------------------------------------------------


TYPE INFERENCE IN ZOD