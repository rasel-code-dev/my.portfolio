function range(num, withZero=false){
  const temp = []
  
  if(withZero){
    for(let i = 0; i<num; i++){
      temp.push(i)
    }
  } else{
    for(let i = 1 ; i<=num; i++){
      temp.push(i)
    }
  }
 
  return temp
}

export default range