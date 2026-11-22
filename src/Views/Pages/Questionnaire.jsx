import parfumesData from "../../data/parfumes.json";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import Header from "../Layout/Header.jsx";

function Questionnaire() {
	const steps = Object.keys(parfumesData.options); //jenom klice, {season, daytime, event, notes}
	const option = parfumesData.options; // cely objekt options, ktery obsahuje vsechny hodnoty podle klice, {season: [...], daytime: [...], event: [...], notes: [...]}
	const { isFirstStep, prev, currentStepIndex, answerNext, topPerfumes, answers } = useMultiStepForm({ steps });

	const currentKey = steps[currentStepIndex]; // vezme klic z pole steps podle currentStepIndex
	const currentOptions = option[currentKey]; // vezme hodnoty podle klice z parfumesData.options
	const isComplete = Object.keys(answers).length === steps.length;

	const questionByKey = {
		season: "Which season will you wear this fragrance in?",
		daytime: "When will you wear it?",
		event: "What kind of occasion is it for?",
		notes: "Which fragrance notes do you like?",
	};

	const question = questionByKey[currentKey] ?? "Choose your preferences";

	return (
		<>
			<Header />
			<div className="questionnaire">
				<form>
					<div>
						{isComplete ? (
							<>
								<h2>Your best match</h2>
								{topPerfumes.length > 0 ? (
									<ul className="match-list">
										{topPerfumes.map(perfume => (
											<li key={perfume.id}>{perfume.name}</li>
										))}
									</ul>
								) : (
									<p>No matching perfume found.</p>
								)}
							</>
						) : (
							<>
								<h1>Not every fragrance suits every season — which one will you be wearing yours in?</h1>
								<ul>
									<h2>{question}</h2>
									<li>
										{!isFirstStep && (
											<button type="button" onClick={prev}>
												Back
											</button>
										)}
										{/* foreach currentOptionsValues in currentOptions, create a button for each option  */}
										{currentOptions.map((currentOptionsValues) => (
											<button
												key={currentOptionsValues}
												type="button"
												onClick={() => answerNext(currentOptionsValues, currentKey)}
											>
												{currentOptionsValues}
											</button>
										))}
									</li>
								</ul>
							</>
						)}
					</div>
				</form>
			</div>
		</>
	);
} // closes Questionnaire

export default Questionnaire;
