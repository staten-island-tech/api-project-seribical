import '../styles/style.css'
import { DOMSelectors } from './DOMSelectors';

DOMSelectors.box.innerHTML = `

`

async function initial(){
  try{
    let genres= await fetch(`https://api.jikan.moe/v4/genres/anime`);
    let list= await genres.json();
    let reverse = list.data.reverse();
    console.log(reverse.length)
    reverse.forEach((i)=>{
      if (i.name==="Hentai"||i.name==="Erotica"||i.name==="Ecchi"){
        console.log("nuh uh")
      }else{
        DOMSelectors.dropdown.insertAdjacentHTML(
          "afterbegin",
         `
         <p class="dropped" id="${i.mal_id}">
           ${i.name}
         </p>
         `
       )
      }
      
    })
    const dropped = document.querySelectorAll(".dropped")
    dropped.forEach((i)=>i.addEventListener("click",function(event){
      event.preventDefault()
      remove()
      var id = i.getAttribute('id')
      datag(id,1)
    }))
  }
  catch{
    console.log("caught")
  }
}

async function home(){
  try{
    let anime= await fetch(`https://api.jikan.moe/v4/anime?order_by=popularity&status=airing`);
    let list= await anime.json();
    let reverse = list.data.reverse();
    DOMSelectors.box.insertAdjacentHTML(
      "beforeend",
      `<div id="footer">
  
      </div>`
      )
    reverse.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="content">
          <div class="card" id="${i.mal_id}">
          <div id="imageholder">
            <img src="${i.images.webp.image_url}">
          </div>
          <div id="info">
            <div id="head">
              <div id="titles">
                <p>${i.title}</p>
                <p>${i.rating}</p>
              </div>
                <div id="pillbottle">
                <p id="score">${i.score}/10</p>
                </div>
            </div>
            <p>${i.synopsis}</p>
          </div>
          </div>
        </div>
        `)
        i.genres.forEach((j)=>{
          document.querySelector("#pillbottle").insertAdjacentHTML(
            "afterbegin",
            `<div id="pill"><p>${j.name}</p></div>`
          )
        })
      })
      const button = document.querySelectorAll(".card")
      button.forEach((i)=>i.addEventListener("click", function(event){
        event.preventDefault
        remove()
        var id = i.getAttribute('id')
        pageloadh(id)}))
    }
  catch{
    console.log("caught")
  }
}

DOMSelectors.button.addEventListener("click", function(event){
  event.preventDefault();
  if (DOMSelectors.search.value===""){
    console.log('nad id win')
    alert("search something dipshit");
  }
  else{
    remove()
    data(DOMSelectors.search.value, 1);
    DOMSelectors.search.value = "";
  }
})

async function data(name,page){
  try{
    let anime = await fetch(`https://api.jikan.moe/v4/anime?sfw&q=${name}&page=${page}`);
    let list = await anime.json();
    list.data.reverse();
    console.log(list)
    if(list.data.length===0){
      console.log('search better kid')
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <h3 class="content">No results for ${name}</h3>
        <div id="footer">
          </div>
        `
      )
    }else{
    list.data.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="content">
          <div class="card" id="${i.mal_id}">
          <div id="imageholder">
            <img src="${i.images.webp.image_url}">
          </div>
          <div id="info">
            <div id="head">
              <div id="titles">
                <p>${i.title}</p>
                <p>${i.rating}</p>
              </div>
                <div id="pillbottle">
                <p id="score">${i.score}/10</p>
                </div>
            </div>
            <p>${i.synopsis}</p>
          </div>
          </div>
        </div>
        `
        
        )
        i.genres.forEach((j)=>{
          document.querySelector("#pillbottle").insertAdjacentHTML(
            "afterbegin",
            `<div id="pill"><p>${j.name}</p></div>`
          )
        })
      })

      const button = document.querySelectorAll(".card")
      button.forEach((i)=>i.addEventListener("click", function(event){
        event.preventDefault
        remove()
        var id = i.getAttribute('id')
        pageload(id,name,page)
      }))
      if(page===1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }else if(page>1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
            <p>page </p>
            <input type="text" id="page" value="${page}">
            <p> of ${list.pagination.last_visible_page}</p>
          </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }

        function pageselect(){
        const selectors = document.querySelectorAll(".pageselector")
        selectors.forEach((i)=>{i.addEventListener("click",function(event){
          event.preventDefault
          remove()
          if(i.textContent===">"){
            const number = page+1
            data(name,number)
          }
          if(i.textContent==="<"){
            const number = page-1
            data(name,number)
          }

          })
        })}

        
        pageselect();
      }
    }
  catch{
    console.log("caught")
  }
}

async function datag(genre,page){
  try{
    let anime = await fetch(`https://api.jikan.moe/v4/anime?sfw&genres=${genre}&page=${page}`);
    let list = await anime.json();
    list.data.reverse();
    console.log(list)
    if(list.data.length===0){
      console.log('search better kid')
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <p id="content">no results for ${genre}</p>
        <div id="footer">
          </div>
        `
      )
    }else{
    list.data.forEach((i)=>{
      DOMSelectors.box.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="content">
          <div class="card" id="${i.mal_id}">
          <div id="imageholder">
            <img src="${i.images.webp.image_url}">
          </div>
          <div id="info">
            <div id="head">
              <div id="titles">
                <p>${i.title}</p>
                <p>${i.rating}</p>
              </div>
                <div id="pillbottle">
                <p id="score">${i.score}/10</p>
                </div>
            </div>
            <p>${i.synopsis}</p>
          </div>
          </div>
        </div>
        `
        
        )
        i.genres.forEach((j)=>{
          document.querySelector("#pillbottle").insertAdjacentHTML(
            "afterbegin",
            `<div id="pill"><p>${j.name}</p></div>`
          )
        })
      })
      const button = document.querySelectorAll(".card")
      button.forEach((i)=>i.addEventListener("click", function(event){
        event.preventDefault
        remove()
        var id = i.getAttribute('id')
        pageloadg(id,genre,page)
      }))
      if(page===1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
              <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }else if(page>1){
        if(page===list.pagination.last_visible_page){
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
                <p>page </p>
                <input type="text" id="page" value="${page}">
                <p> of ${list.pagination.last_visible_page}</p>
              </div>
            </div>
            `
          )
        }else{
          DOMSelectors.box.insertAdjacentHTML(
            "beforeend",
            `
            <div id="footer">
            <button class="pageselector" id="prev"><</button>
            <div id="pagenum">
            <p>page </p>
            <input type="text" id="page" value="${page}">
            <p> of ${list.pagination.last_visible_page}</p>
          </div>
              <button class="pageselector" id="next">></button>
            </div>
            `)
        }
      }

        function pageselect(){
        const selectors = document.querySelectorAll(".pageselector")
        selectors.forEach((i)=>{i.addEventListener("click",function(event){
          event.preventDefault
          remove()
          if(i.textContent===">"){
            const number = page+1
            datag(genre,number)
          }
          if(i.textContent==="<"){
            const number = page-1
            datag(genre,number)
          }

          })
        })}

        
        pageselect();
      }
    }
  catch{
    console.log("caught")
  }
}

async function pageload(id,oname,opage){
  let anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  let list = await anime.json();
  console.log(list.genres)
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="content">
      
        <button id="back">back to where you came from </button>
        <div id="letsgo">
          <div id="topme">
            <img src="${list.data.images.webp.image_url}">
            <div id="next">
              <p>${list.data.title}</p>
              <p>${list.data.rating}</p>
              <div id="pilled">
              </div>
            </div>
            <div>
              <p>${list.data.synopsis}</p>
              <p>${list.data.background}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer"></div>
      `
      
      )
      list.data.genres.forEach((i)=>{
        document.querySelector("#pilled").insertAdjacentHTML(
          "afterbegin",
          `<div id="pill"><p>${i.name}</p></div>`
        )
      })
      const button=document.querySelector("#back")
      button.addEventListener("click",function(event){
        event.preventDefault
        remove()
        button.remove()
        data(oname,opage)
      })
}

async function pageloadg(id,ogenre,opage){
  let anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  let list = await anime.json();
  console.log(list)
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="content">
      
        <button id="back">back to where you came from </button>
        <div id="letsgo">
          <div id="topme">
            <img src="${list.data.images.webp.image_url}">
            <div id="next">
              <p>${list.data.title}</p>
              <p>${list.data.rating}</p>
              <div id="pilled">
              </div>
            </div>
            <div>
              <p>${list.data.synopsis}</p>
              <p>${list.data.background}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer"></div>
      `
      
      )
      list.data.genres.forEach((i)=>{
        document.querySelector("#pilled").insertAdjacentHTML(
          "afterbegin",
          `<div id="pill"><p>${i.name}</p></div>`
        )
      })
      const button=document.querySelector("#back")
      button.addEventListener("click",function(event){
        event.preventDefault
        remove()
        button.remove()
        datag(ogenre,opage)
      })
}

async function pageloadh(id){
  let anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  let list = await anime.json();
  console.log(list)
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="content">
      
        <button id="back">back to where you came from </button>
        <div id="letsgo">
          <div id="topme">
            <img src="${list.data.images.webp.image_url}">
            <div id="next">
              <p>${list.data.title}</p>
              <p>${list.data.rating}</p>
              <div id="pilled">
              </div>
            </div>
            <div>
              <p>${list.data.synopsis}</p>
              <p>${list.data.background}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer"></div>
      `
      
      )
      list.data.genres.forEach((i)=>{
        document.querySelector("#pilled").insertAdjacentHTML(
          "afterbegin",
          `<div id="pill"><p>${i.name}</p></div>`
        )
      })
      const button=document.querySelector("#back")
      button.addEventListener("click",function(event){
        event.preventDefault
        remove()
        button.remove()
        home()
      })
}

function remove(){
  const info = document.querySelectorAll(".content")
  const footer = document.querySelector("#footer")
  footer.remove()
  info.forEach((i)=>i.remove())
}

DOMSelectors.random.addEventListener("click",function(event){
  event.preventDefault;
  random()
})

async function random(){
  let anime = await fetch(`https://api.jikan.moe/v4/random/anime`);
  let list = await anime.json();
  console.log(list);
  if(list.data.rating=="Rx - Hentai"){
    random()
  }else{
    remove()
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="content">
        <div id="letsgo">
          <div id="topme">
            <img src="${list.data.images.webp.image_url}">
            <div id="next">
              <p>${list.data.title}</p>
              <p>${list.data.rating}</p>
              <div id="pilled">
              </div>
            </div>
            <div>
              <p>${list.data.synopsis}</p>
              <p>${list.data.background}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer"></div>
      `
  )
  list.data.genres.forEach((i)=>{
    document.querySelector("#pilled").insertAdjacentHTML(
      "afterbegin",
      `<div id="pill"><p>${i.name}</p></div>`
    )
  })}
}

DOMSelectors.home.addEventListener("click",function(event){
  event.preventDefault()
  remove()
  home();
})
  
initial();
home();

