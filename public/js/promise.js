
document.addEventListener("DOMContentLoaded",()=>{
  // helloWorld('farah')
  // .then(res => {return res})
  // .then(codepolitan => {
  //     console.log(addCodepolitan(codepolitan))
  // })
  // .catch(err=>console.log(err))
  promiseAll.then(result=>console.log(result))
  //result array:
  // 0: "Hello World, Farah"
  // 1: "Hello World, Luthfi"
  // 2: "Hello World, Oktarina from Semarang"

})

const helloWorld = (name) =>{
  return new Promise((resolve, reject)=>{
      if(name === "" || name === undefined || name === null){
        reject('You have to provide the name!')
      }else{
        let message = "Hello World, "+name
        resolve(message)
      }
  })
}

const addCodepolitan = (message) =>{
    return message + " from Semarang"
}

// Promise All 
const promiseAll = Promise.all([
    helloWorld('Farah'),
    helloWorld('Luthfi'),
    helloWorld('Oktarina').then(res => {
        return res
    }).then(codepolitan => {
        return addCodepolitan(codepolitan)
    })
])