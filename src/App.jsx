import React from 'react'
import IntroPage from './IntroPage'
import Quiz from './Quiz'
import BlueBlob from './images/blue-blob.png'
import YellowBlob from "./images/yellow-blob.png" 

export default function App() {
  
const [start, setStart] = React.useState(false)
const [questions, setQuestions] = React.useState([])

const API_URL = "https://opentdb.com/api.php?amount=5&encode=base64"

React.useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => setQuestions(data.results))
    .then(() => {
          setQuestions(prevQuestions => prevQuestions.map(question => {
                const decodedIncorrectAnswers = question.incorrect_answers.map(answer => atob(answer))
                return({
                    ...question,
                    category: atob(question.category),
                    type: atob(question.type),
                    difficulty: atob(question.difficulty),
                    question: atob(question.question),
                    correct_answer: atob(question.correct_answer),
                    incorrect_answers: decodedIncorrectAnswers,
                })
            }))
        })  
    .then(() => {
            setQuestions(prevQuestions => {
                return(prevQuestions.map(question => {
                    let options = question.incorrect_answers.map(option => option)
                    options.push(question.correct_answer)
                    question.type == 'boolean' 
                        ? (options = ['True', 'False']) 
                        : options.sort(() => (0.5 - Math.random()))
                    const optionsObjects = options.map(option => ({
                        value: option,
                        isChecked: false
                    }))
                    return({
                        ...question,
                        options: optionsObjects
                    })
                }))
            })
        })
}, [])



function toggleChecked(questionIndex, optionIndex){
        setQuestions(prevQuestions => prevQuestions.map((question, index) => {
            const newOptions = question.options.map((option, index) => {
                const updatedOption = {
                    ...option,
                    isChecked: !option.isChecked
                }
                const defaultOption = {
                    ...option,
                    isChecked: false
                }
                return(index === optionIndex ? updatedOption: defaultOption)
            })
            const newObject = {...question, options: newOptions}
            return(index === questionIndex ? newObject : question)
        }))

    }

function startQuiz() {
  setStart(prevStart => !prevStart)
}


return (
  <div>
    {
      start && questions != [] 
      ? <Quiz questions={questions} toggleChecked={toggleChecked}/> 
      : <IntroPage startQuiz={startQuiz}/> 
    }
    <img 
        src={BlueBlob} 
        className={start ? "blue-blob-small" : "blue-blob"}/>
    <img 
        src={YellowBlob}
        className={start ? "yellow-blob-small" : "yellow-blob"}/>
  </div>

  )
}
