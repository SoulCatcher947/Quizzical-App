import React from "react"
import Questions from './Questions'

export default function Quiz(props) {
    
    const [showScore, setShowScore] = React.useState(false)
    
    const questionElements = props.questions.map((question, index) => <Questions 
        key={index} 
        id={index}
        questions={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        options={question.options}
        toggleChecked={props.toggleChecked}
        showScore={showScore}
        />) 
        
    function checkAnswers(){
        const isQuestionAnswered = props.questions.map(question => {
            return(!question.options.every(option => !option.isChecked))
        })
        const isAllAnswered = isQuestionAnswered.every(question => question)
        isAllAnswered ? setShowScore(true) : console.log('Please answer all the questions')
    }
    
    function getScore(){
        let counter = 0
        const questions = props.questions.map(question => {
            return question.options.map(option => {
                if(option.isChecked){
                    if(option.value == question.correct_answer) counter++
                }
                return option
            })
        })
        return counter
    }
    
    
    return (
        <form>
            <div className="quiz-wrapper">
                {questionElements}
                <div className="check-answers">
                    {showScore && <label className="score">You scored {getScore()} / 5 correct answers</label>}
                    {showScore 
                    ? <button 
                    className="answer-btn"
                    >
                    Play Again
                    </button>
                    : <input 
                        type='button'
                        className='answer-btn'
                        onClick={checkAnswers}
                        value='Check Answers'
                      />
                    }
                </div>
            </div>
        </form>
        
    )
} 