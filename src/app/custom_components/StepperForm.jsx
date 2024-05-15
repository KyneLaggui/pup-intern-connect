"use client"
import React, {useEffect, useState, useRef} from 'react'

const StepperForm = ({steps, currentStep}) => {
  
  const [newStep, setNewStep] = useState([])
  const stepRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps]
    let count = 0
    while(count < newStep.length) {
      if(count === stepNumber ) {
        newSteps[count] = {
          ...newSteps[count],
          highlight: true,
          selected: true,
          completed: true,
        }
        count++;
      }
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlight: false,
          selected: true,
          completed: true,
        }
        count++;
      }
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlight: false,
          selected: false,
          completed: false,
        }
        count++;
      }
    }
    return newSteps;
  }

  useEffect(()=>{
    const stepsState = steps.map((step,index)=>
    Object.assign({}, {
      description: step,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    })
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep -1, stepRef.current)
    setNewStep(current)
  },[steps, currentStep])

  
  const displaySteps = newStep.map((step, index) => {
    console.log(step.description)
    return (
      <div key={index} className={index !== newStep.length - 1 ? 'w-full flex items-center' : 'flex items-center'}>
        <div className='relative flex flex-col items-center'>
          <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${step.selected ? "bg-primary text-white font-bold" : "" }`}>
              {step.completed ? (
                <span className='text-white font-bold text-xl'>&#10003;</span>
              ):(index + 1)}   
          </div>
          <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}>
            {step.description}
            
          </div>
        </div>
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? 'border-primary': 'border-gray-300' }`}></div>
      </div>
    );
  });
  

  return (
    <div className='mx-4 px-4 flex justify-between items-center'>
      {displaySteps}
    </div>
  )
}

export default StepperForm
