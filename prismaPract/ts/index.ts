import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function insertUser(email : string , password : string , firstname : string , lastname : string) {
    const res = await prisma.user.create({
        data: {
            email,
            password,
            firstname,
            lastname
        },
        select: {
            id : true,
            email : true
        }
    })

    console.log(res)
}

interface UpdateParams {
    firstname : string,
    lastname : string
}

async function updateUser(email : string , {
    firstname,
    lastname
} : UpdateParams){
    const res = await prisma.user.update({
        where : { email },
        data : {
            firstname,
            lastname
        },
        select : {
            firstname : true,
            lastname : true
        }
    })

    console.log(res)
}

async function findUser(email:string){
    const res = await prisma.user.findMany({
        where : { email },
        select : {
            id : true,
            firstname : true,
            lastname : true
        }
    })

    console.log(res)
}

async function insertTodo( title : string , done : boolean , userId : number) {
    const res = await prisma.todo.create({
        data: {
            title,
            done,
            userId
        },
        select: {
            id : true,
            title : true
        }
    })

    console.log(res)
}

async function updateInTodo(id : number , description : string){
    const res = await prisma.todo.update({
        where : {id},
        data : {
            description
        }

    })

    console.log(res)
}


// insertUser("hey3@gmail.com" , "dscsc" , "Shubham" , "Singh")
// updateUser("hey3@gmail.com" , {firstname : "prakhand" , lastname : "patel"})
// findUser("hey3@gmail.com")
// insertTodo("Win UCL" , false , 1);
// updateInTodo(4 , "Soon")

// Relationships in Prisma

// types of relationships :
// 1. One to One
// 2. One to Many
// 3. Many to One
// 4. Many to Many

// for the todo app , there is one to many relationship
// one user_id can have many todos associated with it

async function deleteUser(id:number) {
    await prisma.user.delete({
        where : {id}
    })
}

async function deleteTodo(id:number) {
    await prisma.todo.delete({
        where : {id}
    })
}

// deleteUser(1)
// deleteTodo(1)
// deleteTodo(2)
// deleteTodo(3)
// deleteTodo(4)

// deleteUser(1)