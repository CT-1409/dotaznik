import { useState } from 'react';
import parfumesData from "../data/parfumes.json";

function useMultiStepForm({ steps = [] } = {}) {
    const [currentStepindex, setcurrentStepindex] = useState(0);
    const [answers, setAnswers] = useState({});

    function nextStep() {
        setcurrentStepindex(currentStep => {
            if (currentStep >= steps.length - 1) {
                return currentStep;
            }

            // setting the current index, starting from 0
            return (currentStep+1)
        });
    }

    function prevStep() {
        if (currentStepindex === 0) return;

        // Results appear when every question has an answer.
        // if isComplete = true => user clicks on back, last answear gets deleted but the index stays since we are on the last page. If this wasnt here, the index would decrease too and the user would be taken to the 3rd question
        const isComplete = Object.keys(answers).length === steps.length;
        
        // Get the key of the current step, where steps is array like ["season", "daytime"] 
        const keyToClear = steps[currentStepindex];

        setAnswers(previous => {
            const updated = { ...previous }; // create a copy of the previous answers into an object called updated
            // Remove this step's answer so its question is shown again.
            delete updated[keyToClear];
            return updated;
        });

        // From results, stay on the last question; otherwise go back one question.
        if (!isComplete) {
            setcurrentStepindex(index => index - 1);
        }
    }

    function goToStep(stepIndex) {
        setcurrentStepindex(stepIndex);
    }

    function selectAnswerAndNext(value, currentKey) {
        setAnswers(previous => ({
            ...previous, // spread operator to keep previous answers
            [currentKey]: value,
        }));

        nextStep();
    }

    const scoredPerfumes = parfumesData.perfumes.map(perfume => {
        // Calculate the score for each perfume based on the users answers
        // Object.entries(answers) = makes object into array of key-value pairs, e.g. {season: "summer", daytime: "day"} => [["season", "summer"], ["daytime", "day"]]
        // reduce() = iterates over the array and adds a value (1), something like doing += 1 in python I guess
        const score = Object.entries(answers).reduce(
          (total, [key, answer]) =>
            total + (perfume[key]?.includes(answer) ? 1 : 0), 0
        );

        return { ...perfume, score };
      });

    function getTopScoringPerfumes() {
        if (Object.keys(answers).length === 0) {
            return [];
        }

        //maxScore = hughest number of matches, if there are multiple perfumes with the same score, return all of them
        const maxScore = Math.max(
          ...scoredPerfumes.map(perfume => perfume.score)
        );

        if (maxScore === 0) {
            return [];
        }

        // topParfumes = parfumes with the highest score, if there are multiple perfumes with the same score, return all of them
        const topPerfumes = scoredPerfumes.filter(
        perfume => perfume.score === maxScore
        );

        return topPerfumes;
    }

    function clearAnswers() {
        setAnswers({});
        setcurrentStepindex(0);
    }

    return {
        currentStepIndex: currentStepindex,
        step: steps[currentStepindex], // specific step/index
        steps,// full array of steps
        answers,
        isFirstStep: currentStepindex === 0,
        isLastStep: currentStepindex === steps.length - 1,
        topPerfumes: getTopScoringPerfumes(),
        next: nextStep,
        prev: prevStep,
        goTo: goToStep,
        answerNext: selectAnswerAndNext,
        clearAnswers: clearAnswers,
    };
}

export default useMultiStepForm;
