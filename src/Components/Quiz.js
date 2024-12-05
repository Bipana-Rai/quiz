import React, { useEffect, useState } from 'react'
function Quiz() {
  const [question, setQuestion] = useState([])
  const [questionindex, setquestionindex] = useState(0)
  const [incorrrectoption, setincorrectoption] = useState([])
  const [corrrectoption, setcorrectoption] = useState()
  const [selectedvalue, setSelectedvalue] = useState("")
  const [score, setscore] = useState(0)
  const [hasSelect, sethasSelect] = useState(false)
  const [visible, setViseble] = useState(false)
  const nextquetion = () => {
    if (questionindex < question.length - 1) {
      setquestionindex(questionindex + 1);
    } else {
      alert("No more questions!");
    }
  }
  useEffect(() => {
    const fetchquestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=40&category=27")
        if (!response.ok) {
          throw new Error("Http error")

        }
        const data = await response.json()
        setQuestion(data.results)
      }
      catch (err) {
        console.log(err)
      }
    }
    const delayfetch = setTimeout(() => {
      fetchquestions();
    }, 1000)
    return () => clearTimeout(delayfetch);

  }, [])
  useEffect(() => {
    if (question[questionindex]) {
      setincorrectoption(question[questionindex].incorrect_answers);
      setcorrectoption(question[questionindex].correct_answer);
    }
  }, [questionindex, question]);
  const checked = (e) => {
    setSelectedvalue(e.target.value)
    sethasSelect(true)
  }
  const checkanswer = () => {
   if(hasSelect){
    setViseble(true)
   }
    if (selectedvalue === corrrectoption) {
      setscore(score + 1)
    }
    setTimeout(() => {
      if (hasSelect) {
        nextquetion()
        sethasSelect(false)
        setViseble(false)
        
      }
      else {
        alert("please select an option")

      }
    }, 1500)
   
  }
  return (
    <>
      <div className="container">
        <h1 className='h1'>Quiz Game</h1>
        <div className='score'>
          <h4 style={{ color: "green" }} >score:{score}</h4>
        </div>
        <div className='foropt'>
          {
            question[questionindex] && (
              <div>
                <h3>{`Q.`} {question[questionindex].question}</h3>
                <div className='opt'>
                  <input type="radio" checked={selectedvalue === corrrectoption} onChange={checked} value={corrrectoption} />
                  {corrrectoption}
                </div>

                {
                  incorrrectoption.map((e) => (
                    <div className='opt'>
                      <input type="radio" checked={selectedvalue === e} onChange={checked} value={e} />{e}
                    </div>

                  ))
                }

              </div>
            )
          }


          <span>
            <button className='btn' onClick={checkanswer}>Submit</button>
            <button className='btn btn1 ' onClick={nextquetion}>{`Next->`}</button>
          </span>
          {visible && <center><h3 className='mt-3'>The right answer was {corrrectoption}</h3></center>}
        </div>
      </div>
    </>
  )
}

export default Quiz