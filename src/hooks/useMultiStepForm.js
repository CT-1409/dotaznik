import { useState } from 'react';
import parfumesData from "../data/parfumes.json";

function useMultiStepForm({ steps }) {
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

        const keyToClear = steps[currentStepindex];

        setAnswers(previous => {
            const updated = { ...previous };
            delete updated[keyToClear];
            return updated;
        });

        setcurrentStepindex(index => index - 1);
    }

    function goToStep(stepIndex) {
        setcurrentStepindex(stepIndex);
    }

    function selectAnswerAndNext(value, currentKey) {
        setAnswers(previous => ({
            ...previous,
            [currentKey]: value,
        }));

        nextStep();
    }

    const scoredPerfumes = parfumesData.perfumes.map(perfume => {
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

        const maxScore = Math.max(
          ...scoredPerfumes.map(perfume => perfume.score)
        );

        if (maxScore === 0) {
            return [];
        }

        const topPerfumes = scoredPerfumes.filter(
        perfume => perfume.score === maxScore
        );
        return topPerfumes;
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
    };
}

export default useMultiStepForm;
