import '../styles/style.css'
import { DOMSelectors } from './DOMSelectors';

DOMSelectors.box.innerHTML = `

`

async function data(){
  try{
    let anime= await fetch('https://api.jikan.moe/v4/anime?q=quintessential');
    let list=await anime.json();
    console.log(list)
    list.data.forEach((i)=>{
    DOMSelectors.box.insertAdjacentHTML(
      "afterbegin",
      `<p>${i.title_english}</p>`)
    })}
    catch{
      console.log("check your gogddman code")
    }}

data();