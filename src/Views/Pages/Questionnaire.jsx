import parfumesData from "../../data/parfumes.json";
import useMultiStepForm from "../../hooks/useMultiStepForm";

function Questionnaire() {
	const steps = Object.keys(parfumesData.options); //pocet dotazu, jenom klice
	const option = parfumesData.options;
	const { step, next, isFirstStep, prev, goTo, currentStepIndex} = useMultiStepForm({ steps });

	const currentKey = steps[currentStepIndex]; // vezme klic z pole steps podle currentStepIndex
	const currentOptions = option[currentKey]; // vezme hodnoty podle klice z parfumesData.options

	return (
		<div className="questionnaire">
			<form>
				<div>
					<h1>Not every fragrance suits every season — which one will you be wearing yours in?</h1>
					<ul>
						<h2>{currentKey}</h2>
						<li>
							{!isFirstStep && 
								(
								<button type="button" onClick={prev}>
									Back
								</button>
								)
							}
							{currentOptions.map((currentOptionsValues) => (
								<button
									key={currentOptionsValues}
									type="button"
									onClick={next}
								>
									{currentOptionsValues}
								</button>
							))}
						</li>
					</ul>
				</div>	
			</form>
		</div>
	);
} // closes Questionnaire

export default Questionnaire;
