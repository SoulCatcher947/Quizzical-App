import React from "react"

export default function(props){
    
    const optionElements = props.options.map((option, index) => {
        let styles = 'option'
        if(option.isChecked) {
            if(option.value === props.correctAnswer) {
                styles = 'option correct-option'
            } else styles = 'option incorrect-option'
        }else if(option.value === props.correctAnswer) {
                    styles = 'option correct-option'            
                } else styles = 'option'
            
        return(props.showScore
                ? <button 
                    type='button'
                    key={index} 
                    className={styles}
                    style={{cursor: 'auto'}}
                >{option.value}</button>
                : <button 
                    type='button'
                    key={index} 
                    className={option.isChecked ? 'option clicked-option' : 'option'}
                    onClick={()=>props.toggleChecked(props.id, index)}
                >{option.value}</button>
        )
    })
    
    return(
        <div className='question-wrapper'>
            <label className='question-title'>{props.questions}</label>
            <div className='options-wrapper'>
                {optionElements}
            </div>
        </div>
    )
}