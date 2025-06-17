import path from 'node:path'
import fs from 'node:fs'
import { ChildProcess, exec as execb } from 'node:child_process'
import { promisify } from 'util';

const fileName = 'some.txt';
const full_FileName = path.resolve(fileName); // whole filename with direc : /Users/shubham007/Desktop/allProjects/pracNodejs/some.txt
const dirName = path.dirname(full_FileName); // dir name : /Users/shubham007/Desktop/allProjects/pracNodejs
const baseName = path.basename(full_FileName); // fileName : some.txt
const extension = path.extname(full_FileName); // only extension : txt
const fileName_from_full_FileName = path.basename(full_FileName , extension) // will get only filename wthout ext : some

console.log(`${full_FileName}\n${dirName}\n${baseName}\n${extension}\n${fileName_from_full_FileName}`); 

const reading = fs.readFile('some.txt' , 'utf-8', (err,data) => {
    if(err){
        console.log("Some error occured while reading file : " , err);
    }
    console.log("Read Data : " , data);
})

const content = "\nHi !! My name is Shubham Singh and I am web developer and AI engineer";
fs.appendFile(fileName , content , { flag : 'a'} , err => {
    if(err){
        console.log("Some error ocurred while writing in file");
    }
    console.log("Written successfully");
})


const execute = promisify(execb);

async function runCommand() {
  try {
    const { stdout, stderr } = await execute('rm some.txt');
    console.log("Deleted");
    if (stderr) console.error('Stderr:', stderr);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

runCommand();
