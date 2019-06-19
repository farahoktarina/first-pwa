document.addEventListener('DOMContentLoaded',()=>{
  // requestApiXMLHttpRequest()
  // requestApiFetch()
  requestFetchChainAPI()
})

// XMLHttpRequest
const requestApiXMLHttpRequest = () =>{
    const request = new XMLHttpRequest()
    request.onload = function() {
        const data = JSON.parse(this.responseText)
    }

    request.onerror = function() {
        console.log('Error : -S', error)
    } 

    request.open('GET','https://readerapi.codepolitan.com/articles', true)
    request.send()
}

// Fetch API
const requestApiFetch = () =>{
    fetch('https://readerapi.codepolitan.com/articles')
    .then(res => {
        if(res.status !==200){
          console.log('Error : '+res.status)
          return
        }
        res.json().then(data=>{
            console.log(data)
        })
    }).catch(err=>{
        console.log('Error : '+err)
    })
}

// Fetch API with Chaining Promise : menautkan promise dengan promise lain
const requestFetchChainAPI = ()=>{
    fetch('https://readerapi.codepolitan.com/articles')
    .then(statusFunction)
    .then(jsonFunction)
    .then(data=>{
        // object/array masuk ke data
    })
    .catch(err => {
      console.log('Error :'+err)
    })
}

const statusFunction = (res) =>{
  if(res.status !== 200){
    console.log('Error : '+res.status)
    //method reject untuk membuat block catch terpanggil
      return Promise.reject(new Error(res.statusText))
  }else{
    return Promise.resolve(res)
  }
}

const jsonFunction = (res) =>{
    // Mengembalikan Promise menjadi object/array javascript ke json
    // masih berupa promise pending
    return res.json()
}

const error = (err)=>{
  console.log('Error :'+err)
}