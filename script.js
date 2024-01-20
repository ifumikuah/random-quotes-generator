const randomNum = Math.floor(Math.random() * 100)
const fetchUrl = `https://picsum.photos/v2/list?page=${randomNum}&limit=1`
const fetchQuoteUrl = `https://api.quotable.io/random`

const colorThief = new ColorThief()

const fetchImg = async(url)=> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`[${res.status}] fetch image failed!!`)
  }
  const data = await res.json()
  return data[0]
}

const fetchQuote = async(url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`[${res.status}] fetch quote failed!!`)
  }
  const data = await res.json()
  return data
}

const imgElement = document.getElementById("js-bg-img");
const cardElement = document.getElementById("js-big-card");
const quoteElement = document.getElementById("js-quotes-text");
const authorElement = document.getElementById("js-quotes-author");

fetchImg(fetchUrl)
  .then(result => {
    imgElement.src = result.download_url
    imgElement.alt = `Author, ${result.author}`
    
    fetchQuote(fetchQuoteUrl)
      .then(result => {
        quoteElement.innerText = result.content
        authorElement.innerText = result.author
      })
      .catch(err => {
        quoteElement.innerText = err
        authorElement.innerText = "Error"
      })

    imgElement.addEventListener("load", ()=>{
      const imgPalette = colorThief.getColor(imgElement)
      const getHue = RGBtoHSL(...imgPalette, "hue");
      standardizeColor(getHue, "dark")

    })

  })
  .catch(err => {
    console.alert(err);
    imgElement.src = "assets/defaultimg.jpg"
    imgElement.alt = `Author, null`
  })

// Convert RGB to HSL

const RGBtoHSL = (r, g, b, string = "raw") => {
  r /= 255
  g /= 255
  b /= 255
  
  let hue, sat, lig;
  // Hue
  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const cdelta = cmax - cmin;
  if (cmax === cmin) {
    hue = 0;
  } 
  else if (cmax === r) {
    hue = ((g - b) / cdelta) % 6
  }
  else if (cmax === g) {
    hue = ((b - r) / cdelta) + 2
  }
  else if (cmax === b) {
    hue = ((r - g) / cdelta) + 4
  }

  hue = Math.round(hue * 60)
  if (hue <= 0) {
    hue += 360
  }

  // Lightness

  lig = (cmax + cmin) / 2

  // Saturation

  sat = lig >= 0.5 ? cdelta / (2 - cmax - cmin) : (cmax - cmin) / (cmax + cmin);

  sat = Math.round(sat*100)
  lig = Math.round(lig*100)

  if (string === "css") {
    return `hsl(${hue} ${sat}% ${lig}%)`
  } else if (string === "hue") {
    return hue
  }
  return [hue, sat, lig];
}

// Make colors more pleasant to eye

const standardizeColor = (hue, mode) => {
  // const overlay = document.querySelector(".overlay");

  if (mode === "dark") {
    const bgCol = `hsl(${hue} 20% 10%)`
    const fgCol = `hsl(${hue} 20% 90%)`

    cardElement.style.backgroundColor = bgCol
    cardElement.style.color = fgCol
  }
  else if (mode === "light") {
    document.body.classList.toggle("light")

    const bgCol = `hsl(${hue} 20% 90%)`
    const fgCol = `hsl(${hue} 15% 10%)`

    cardElement.style.backgroundColor = bgCol
    cardElement.style.color = fgCol
  }
}