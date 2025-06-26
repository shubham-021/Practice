import { Client } from "pg";

const client = new Client({
//  connectionString : "postgresql://userrname:password@host/dbName"
    connectionString : "postgresql://newsCollector_owner:npg_MqsbxmVw70XF@ep-lingering-fog-a1r274g0-pooler.ap-southeast-1.aws.neon.tech/newsCollector?sslmode=require&channel_binding=require"
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


// async function createUserTable(){
//     const result = await client.query(`
//         CREATE TABLE users (
//         id SERIAL PRIMARY KEY ,
//         username VARCHAR(255) UNIQUE NOT NULL ,
//         email VARCHAR(255) NOT NULL ,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `)

//     console.log(result)
// }

// async function InsertDb(username : string , email : string , password : string){
//     const insertQuery = "INSERT INTO users (username , email , password) VALUES ($1 , $2 , $3)"
//     const values = [username , email , password]
//     const res = await client.query(insertQuery , values)
//     console.log(res)
// }

async function showDB(){
    const showQuery = "SELECT * FROM headlines WHERE id=34"
    const res = await client.query(showQuery)
    console.log(res)
}


// res :
 
// Result {
//   command: 'SELECT',
//   rowCount: 1,
//   oid: null,
//   rows: [
//     {
//       id: 34,
//       title: 'U.S.-China tariff talks to continue on May 11, as Trump touts ’great progress made’',
//       category: 'World Affairs',
//       link: 'https://www.thehindu.com/news/international/us-china-tariff-talks-to-continue-on-may-11-as-trump-touts-great-progress-made/article69563306.ece',
//       date: 2025-05-10T21:11:00.000Z,
//       description: 'Donald Trump says “great progress” was being made in ongoing U.S.-China talks over tariffs menacing the global economy'
//     }
//   ],
//   fields: [
//     Field {
//       name: 'id',
//       tableID: 24590,
//       columnID: 1,
//       dataTypeID: 23,
//       dataTypeSize: 4,
//       dataTypeModifier: -1,
//       format: 'text'
//     },
//     Field {
//       name: 'title',
//       tableID: 24590,
//       columnID: 2,
//       dataTypeID: 25,
//       dataTypeSize: -1,
//       dataTypeModifier: -1,
//       format: 'text'
//     },
//     Field {
//       name: 'category',
//       tableID: 24590,
//       columnID: 3,
//       dataTypeID: 25,
//       dataTypeSize: -1,
//       dataTypeModifier: -1,
//       format: 'text'
//     },
//     Field {
//       name: 'link',
//       tableID: 24590,
//       columnID: 4,
//       dataTypeID: 25,
//       dataTypeSize: -1,
//       dataTypeModifier: -1,
//       format: 'text'
//     },
//     Field {
//       name: 'date',
//       tableID: 24590,
//       columnID: 5,
//       dataTypeID: 1114,
//       dataTypeSize: 8,
//       dataTypeModifier: 3,
//       format: 'text'
//     },
//     Field {
//       name: 'description',
//       tableID: 24590,
//       columnID: 6,
//       dataTypeID: 25,
//       dataTypeSize: -1,
//       dataTypeModifier: -1,
//       format: 'text'
//     }
//   ],
//   _parsers: [
//     [Function: parseInteger],
//     [Function: noParse],
//     [Function: noParse],
//     [Function: noParse],
//     [Function: parseDate],
//     [Function: noParse]
//   ],
//   _types: TypeOverrides {
//     _types: {
//       getTypeParser: [Function: getTypeParser],
//       setTypeParser: [Function: setTypeParser],
//       arrayParser: [Object],
//       builtins: [Object]
//     },
//     text: {},
//     binary: {}
//   },
//   RowCtor: null,
//   rowAsArray: false,
//   _prebuiltEmptyResultObject: {
//     id: null,
//     title: null,
//     category: null,
//     link: null,
//     date: null,
//     description: null
//   }
// }

connectDB();
showDB()
// createUserTable();
// InsertDb("Shubham" , "abc@gmail.com" , "hey")