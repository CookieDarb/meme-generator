import React from "react"

export default function Main() {

  const [memeInfo,setMemeInfo]=React.useState({topText:"One does not simply",bottomText:"walk into a mordor",imageUrl:"http://i.imgflip.com/1bij.jpg"})
  const [memeArray,setMemeArray]=React.useState([]) 

  function handleChange(event){
    const {value, name}=event.currentTarget
    setMemeInfo(prev=>({...prev, [name]:value}))
  }

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data.memes)
            setMemeArray(data.data.memes)
        })
  },[])

  function handleClick(){
    setMemeInfo(prev=>{
        return {...prev, imageUrl:memeArray[Math.floor(Math.random()*memeArray.length)].url}
    })
  }

  return (
      <main>
          <div className="form">
              <label>Top Text
                  <input
                      type="text"
                      placeholder="One does not simply"
                      name="topText"
                      onChange={handleChange}
                  />
              </label>

              <label>Bottom Text
                  <input
                      type="text"
                      placeholder="Walk into Mordor"
                      name="bottomText"
                      onChange={handleChange}
                  />
              </label>
              <button onClick={handleClick}>Get a new meme image 🖼</button>
          </div>
          <div className="meme">
              <img src={memeInfo.imageUrl}/>
              <span className="top">{memeInfo.topText}</span>
              <span className="bottom">{memeInfo.bottomText}</span>
          </div>
      </main>
  )
}