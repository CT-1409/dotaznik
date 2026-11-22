import parfumesData from "../../data/parfumes.json";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import Header from "../Layout/Header.jsx";

const perfumeImages = import.meta.glob(
	"../../assets/css/parfume_imgs/*.png",
	{ eager: true, query: "?url", import: "default" }
);

function Questionnaire() {
	const steps = Object.keys(parfumesData.options); //jenom klice, {season, daytime, event, notes}
	const option = parfumesData.options; // cely objekt options, ktery obsahuje vsechny hodnoty podle klice, {season: [...], daytime: [...], event: [...], notes: [...]}
	const { isFirstStep, prev, currentStepIndex, answerNext, topPerfumes, answers, clearAnswers } = useMultiStepForm({ steps });

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
			<Header onClearAnswers={clearAnswers} />
			<div className="questionnaire">
				<form>
					<div>
						{isComplete ? (
							<>
								<h2>Your best match</h2>
								{/* checking if topPerfumes is empty  */}
								{topPerfumes.length > 0 ? (
									<ul className="match-list">
										{topPerfumes.map(perfume => (
											<li key={perfume.id}>
												<span>{perfume.name}</span>
												<img
													src={perfumeImages[`../../assets/css/parfume_imgs/${perfume.image}`]}
													alt={perfume.name}
												/>
											</li>
										))}
									</ul>
								) : (
									<p>No matching perfume found.</p>
								)}

								<button type="button" onClick={clearAnswers}>
									Back to the beginning
								</button>
								<button type="button" onClick={prev}>
									Back
								</button>
							</>
						) : (
							<>
								<h1>Not every fragrance suits every season — which one will you be wearing yours in?</h1>
								<h2>{question}</h2>
								<ul className="question-options">
									<li>
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
								{!isFirstStep && (
									<div className="questionnaire-navigation">
										<button type="button" onClick={prev}>
											Back
										</button>
									</div>
								)}

							</>
						)}
					</div>
				</form>
			</div>
		</>
	);
} // closes Questionnaire

export default Questionnaire;
