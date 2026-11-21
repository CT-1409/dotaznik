import { useState } from 'react';

// steps is an array
function useMultiStepForm({ steps }) {
    const [currentStepindex, setcurrentStepindex] = useState(0);

    function nextStep() {
        setcurrentStepindex(currentStep => {
            if (currentStep >= steps.length - 1) {
                return currentStep;
            }

            return (currentStep+1)
        });
    }

    function prevStep() {
        setcurrentStepindex(currentStep => {
            if (currentStep <= 0) {
                return currentStep;
            }
            return (currentStep-1)
        });
    }

    function goToStep(stepIndex) {
        setcurrentStepindex(stepIndex);
    }


    return {
        currentStepIndex: currentStepindex,
        step: steps[currentStepindex], // specific step/index
        steps,// full array of steps
        isFirstStep: currentStepindex === 0,
        next: nextStep,
        prev: prevStep,
        goTo: goToStep,
    };
}

export default useMultiStepForm;
