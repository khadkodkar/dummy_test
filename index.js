
const express = require( 'express' );
const app    = express();
const { Readable }  = require('stream');
const fs =require('fs');

app.get('/test',(req,res)=>{
   res.send() ;
})

// -----------------------------------------------------------------------
//Question 1:
const readTest = fs.createReadStream('text_dummy_file.txt',  { encoding: 'base64' });
readTest.on('data',function(textData){
  // console.log(textData);
})

// ---------------------------------------------------------------------
// Question : 2
const { rateLimit } = require ('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, //Each IPAddress limit 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})
app.use(limiter)

// ---------------------------------------------------------------------
//Question 3:

//using async/await function 
async function noblockedAsync(a){
  let b = 10; 
  return await noblockedAwait(a,b); 
}
async function noblockedAwait(a,b){    
  return a+b;
}
noblockedAsync()
// using Promise function
const usingPromises =(a)=>{
return new Promise((resolve,reject)=>{
    if(a==10){
        resolve('Validate');
    }else{
    reject('Invalid');
   }
})
}
console.log(usingPromises(10))
//callbacks
function test(sum){
   console.log(sum);
}
function myCallback(x,y, myCallback){
   let sum = x+y;
   test(sum) 
}
myCallback(10,20,test)

// ---------------------------------------------------------------------
// Question : 4
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Invalid file type');
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }

    cb(null, true);
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});

// -----------------------------------------------------------------------
// Question: 5
var pool = new Pool()
pool.connect().then(client => {
  client.query('select * from user', ['pg-pool']).then(res => {
    client.release()
    console.log('hello from', res.rows[0].name)
  })
  .catch(e => {
    client.release()
    console.error('query error', e.message, e.stack)
  })
})

// -----------------------------------------------------------------------
// Question: 6


// -----------------------------------------------------------------------
// Question: 7
let jwt = require('jsonwebtoken');

let token = jwt.sign({ data: { name: "dev", email: "dev@gmail.com" } }, 'secret', { expiresIn: '1h' });
let decoded = jwt.verify(token, 'secret');
console.log(decoded.data); 

app.listen(3000,console.log("Connection"));