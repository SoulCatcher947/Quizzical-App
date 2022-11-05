import React from "react"

export default function IntroPage(props) {
    
    return (
        <div className="intro-wrapper">
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-description">Test Your Knowledge</p>
            <button 
            className="start-button" 
            onClick={props.startQuiz}
            >
                Start Quiz
            </button>
            
        </div>
    )
}