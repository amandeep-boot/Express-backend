const express = require('express');
const bodyParser=require("body-parser");
const app = express()
const port = 3000

function calculateSum(n){
  let sum=0
  for(let i =0;i<n;i++){
    sum+=i
  }
  return sum
}

app.get("/",(req,res)=>{
  const n=req.query.n
  const sum =calculateSum(n)
  res.send(sum.toString());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})