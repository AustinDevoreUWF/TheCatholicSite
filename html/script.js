async function getRandomSaint() {//async function means the function will take time to wait for everything
    const response = await fetch('data/Saints.json');// response is the file
    const saints = await response.json();// saints is an array of objects we get the objects by using .json() on the file
    const index = Math.floor(Math.random() * saints.length);//index is a random number that we get from random and we round it down to the nearest whole number
    //we then use * saints.length to get a number in range
    return saints[index].name;//here we return the saints array and get the name.
  }
  async function getInfoFromWiki(saintName){
    const url =`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(saintName)}`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error('Failed to fetch saint info from Wikipedia');
    }return await response.json();
  }
  async function getSaintInfo() {
    const saintName = await getRandomSaint();
    const saintData = await getInfoFromWiki(saintName);
    return saintData;
  }

  async function displaySaint() {
    try {
      const saintData = await getSaintInfo();
  
      document.getElementById("saint").textContent = saintData.title;
      document.getElementById("sint-description").textContent = saintData.extract;
  
      const img = document.getElementById("saint-img");
      if (saintData.thumbnail?.source) {
        img.src = saintData.thumbnail.source;
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
  
    } catch (error) {
      console.error("Error fetching saint data:", error);
    }
  }