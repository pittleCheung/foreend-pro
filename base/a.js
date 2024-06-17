var a = [[1,2,3,4,[5,6,7,8,[9,10,11]]],12]


function flat(a){
  let newA = []
  for (let i = 0; i < a.length; i++) {
    console.log("i====>",i)
    if (Array.isArray(a[i])) {
      a = [...a[i], newA.slice(i + 1)]
    }else{
      newA.push(a[i])
    }
  }
  return newA
}


console.log(flat(a))