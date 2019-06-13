document.addEventListener("DOMContentLoaded", function(){
  // Activate Sidebar Nav
  const element = document.querySelectorAll(".sidenav")
  M.Sidenav.init(element)
  loadNav()

  // Load page content
  let page = window.location.hash.substr(1)
  if(page == "") {
    page = "home"
  }
  loadPage(page)
})

const loadNav = ()=>{
  return new Promise((resolve, reject)=>{
    const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange=function(){
          if(this.readyState == 4) {
            if(this.status != 200){
              reject(xhttp.response)
            }
            // Load Menu List
            document.querySelectorAll(".topnav,.sidenav").forEach((elm)=>{
                elm.innerHTML = xhttp.responseText
            })

            // Registry event listener for every menu link
            document.querySelectorAll(".topnav a, .sidenav a").forEach((elm)=>{
                elm.addEventListener("click", (event) =>{
                    // Close sidenav
                    const sidenav = document.querySelector(".sidenav")
                    M.Sidenav.getInstance(sidenav).close()
    
                    // Calling Menu
                    const page = event.target.getAttribute("href").substr(1)
                    loadPage(page)
                })
            })
          }
      }
      xhttp.open("GET","nav.html", true)
      xhttp.send() 
  }) 
}

const loadPage = (page) =>{
    return new Promise((resolve, reject)=>{
        const xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
          if(this.readyState == 4){
            const content = document.querySelector("#body-content")
            if(this.status == 200){
              content.innerHTML = xhttp.responseText
            }else if(this.status === 404){
              content.innerHTML = "<p>Page not Found!</p>"
            }else{
              content.innerHTML = "<p>Upss! Page can't access</p>"
            }
          }
        }
        xhttp.open("GET","pages/"+page+".html", true)
        xhttp.send()
    })
}