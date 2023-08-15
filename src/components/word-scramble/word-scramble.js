import React, {useState, useEffect}from 'react'
import "./word-scramble.sass";

const WORDS = [
  'Code',
  'React',
  'Typescript',
  'Dream job',
  'Developer',
  'Website',
  'Engineer',
]

const WordScramble = () => {
const [inputValue, setInputValue]= useState("");
const [isPlayOn, setIsPlayOn] = useState(false);
const [message, setMessage] = useState("");
const [correctWord, setCorrectWord] = useState("");
const [scrambledWord, setScrambledWord] = useState("");

const handleInputChange = (event) =>{

setInputValue(event.target.value.toUpperCase());
}
const selectWord = () => {
const randomIndex = Math.floor(Math.random() * WORDS.length);
const tempWord = WORDS [randomIndex];
return tempWord;
};
const handleButtonClick = () =>{
  
  if(inputValue !==""){
    if (correctWord ===inputValue){
      setMessage('Correct Answer smart-you');
    }else{
      setMessage('Wrong Answer think-again')
    }

  }
  
};

const handleStartGame = () =>{
  setIsPlayOn(true);
  setInputValue("");
  setMessage("")

  const word = selectWord()
  setCorrectWord(word.toUpperCase())
  setScrambledWord(constructScrambledWord(word));


};
const constructScrambledWord = (word)=>{
const shuffledArray = word.split("");
for(let i = shuffledArray.length  -1; i > 0; i--){
  const j = Math.floor(Math.random()* (i + 1));
  [shuffledArray[i], shuffledArray[j]]=[
    shuffledArray[j],
    shuffledArray[i],
  ]
}
return shuffledArray.join("")
};
 

useEffect(() => {
  let clearMessage;
  if (message === 'Wrong Answer think-again'){
    const clearMessage = setTimeout(() => setMessage(""), 800)  
  }
  return () =>{
    if(clearMessage){
      clearTimeout(clearMessage);
    }
  }
}, [message])
  return (
    <div className='word_scramble'>
      {!!message && ( <div className='message'>
        <p>{message}</p>
        </div>)}

      
      <h1>Word Scramble</h1>
      <div className='content'>
        
        {isPlayOn ?(
<>
<div className='board'>
  {correctWord.split('').map((el, i)=>(
  <span key={`${el}_${i}`}className='square_bg'>
    {inputValue[i]}
  </span>
  ))}

</div>

<p className='scrambled_word'>{scrambledWord}</p>

          <div className='fields'>
          <input type='text' onChange={handleInputChange} value={inputValue} />
          <button type='button' onClick={handleButtonClick} > 
          Enter
          </button>
        </div>
        </>

        ): (
          <button className='start_game'  onClick={handleStartGame} type='button'>
          Start Game
          </button>

        )}

        {isPlayOn  &&(
          <button className='start_game new' onClick={handleStartGame} type='button'>
          New Game
          </button>

        )}
        
        
      </div>
    </div>
  )
}

export default WordScramble;
