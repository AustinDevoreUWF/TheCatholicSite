async function getRandomSaint(){
const response = await fetch('data/Saints.json');
const saints = await response.json();
const index = saints[Math.floor(Math.random() * saints.length)];
return saints[index].name;
}
async function getFromWiki(saintName){
const url = 
}