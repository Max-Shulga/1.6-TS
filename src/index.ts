// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

// 2.
interface User {
    name: string,
    surname: string
}

interface UserNamings {
    fullname: string,
    initials: string
}

function getUserNamings(a: User): UserNamings {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3.
interface Product {
    name: string
}

interface Catalog {
    products: Product[]
}

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: Catalog) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
interface Person {
    name: () => string,
    cuteness?: number,
    coolness?: number
}

function hey1(a: Person) {
    return "hey! i'm " + a.name();
}

hey1({name: () => "roman", cuteness: 100})
hey1({name: () => "vasyl", coolness: 100})

// 4.2
interface AbstractPet {
    name: () => string
}

class Cat implements AbstractPet {
    constructor(private _name: string, private _canClimb: boolean) {
    }

    name(): string {
        return this._name;
    }
}

class Dog implements AbstractPet {
    constructor(private _name: string, private coolness: number) {
    }

    name(): string {
        return this._name
    }
}

function hey2(abstractPet: AbstractPet): string {
    return "hey! i'm " + abstractPet.name();
}

let a = new Cat("snizhok", true)
let b = new Dog("sirko", 333)
hey2(a)
hey2(b)

// 4.3


type CatOrDog = {
    name: () => string,
    type: "cat", cuteness: number
} | {
    name: () => string,
    type: "dog",
    coolness: number
};

function hey(a: CatOrDog) {
    return "hey! i'm " + a.name() +
        (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}

hey({name: () => "snizhok", type: "cat", cuteness: 100});
hey({name: () => "sirko", type: "dog", coolness: 100});

// 5.
type StringEntries = string[] | Record<string, string>

// google for Record type
function stringEntries(a: StringEntries) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a:number):Promise<string> {
    return "*".repeat(a)
}

const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))