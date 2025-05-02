import { Client } from "pg";

const client = new Client({
//  connectionString : "postgresql://userrname:password@host/dbName"
    connectionString : "postgresql://neondb_owner:npg_MdrGIZ1DgmJ0@ep-jolly-scene-a1z8tit7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

// or you can do this also:

// const client = new Client({
//     host : 'ep-jolly-scene-a1z8tit7-pooler.ap-southeast-1.aws.neon.tech',
//     port : 5334,
//     database : 'neondb',
//     user : 'neondb_owner',
//     password : 'npg_MdrGIZ1DgmJ0'
// })



async function connectDB(){
    await client.connect()
}


async function createUserTable(){
    const result = await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY ,
        username VARCHAR(255) UNIQUE NOT NULL ,
        email VARCHAR(255) NOT NULL ,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)

    console.log(result)
}

async function InsertDb(username : string , email : string , password : string){
    const insertQuery = "INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3)"
    const values = [username , email , password]
    const res = await client.query(insertQuery , values)
    console.log(res)
}

async function showDB(){
    const showQuery = "SELECT * FROM users"
    const res = await client.query(showQuery)
    console.log(res)
}

connectDB();
showDB()
// createUserTable();
// InsertDb("Shubham" , "abc@gmail.com" , "hey")