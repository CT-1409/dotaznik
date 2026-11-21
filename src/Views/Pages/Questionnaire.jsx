import perfumes from "../../data/perfumes.json";
const STEPS = [
	{
		key: "season",
		question: "Not every fragrance suits every season – which one will you be wearing yours in?",
		options: ["Spring", "Summer", "Autumn", "Winter", "All Seasons"],
	},
	{
		key: "daytime",
		question: "When will you wear it?",
		options: ["Day", "Evening"],
	},
	{
		key: "event",
		question: "What is the occasion?",
		options: ["everyday", "beach", "gym", "hangouts", "Formal", "Romantic evening"],
	},
	{
		key: "scent",
		question: "Which scent would you like the most?",
		options: ["roses", "oud", "bergamont", "citrus"],
	},
];

function Questionnaire() {
	return (
		<main>
			<h1>Not every fragrance suits every season — which one will you be wearing yours in?</h1>
			<ul>
				<button name="Spring" value="Spring" onClick={() => handleOptionClick("Spring")}>
					Spring
				</button>

				<button name="Summer" value="Summer" onClick={() => handleOptionClick("Summer")}>
					Summer
				</button>

				<button name="Autumn" value="Autumn" onClick={() => handleOptionClick("Autumn")}>
					Autumn
				</button>

				<button name="Winter" value="Winter" onClick={() => handleOptionClick("Winter")}>
					Winter
				</button>

				<button name="All Seasons" value="All Seasons" onClick={() => handleOptionClick("All Seasons")}>
					All Seasons
				</button>
			</ul>
		</main>
	);
} // closes Questionnaire

export default Questionnaire;
