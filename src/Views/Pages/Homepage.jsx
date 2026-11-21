import Header from "../Layout/Header.jsx"
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main>
                <h2>Find Your Essens</h2>
                <p>
                    A perfume isn't just about smelling good.
                    It's about who you are — the invisible signature you leave behind,
                    the feeling people remember long after you're gone.
                    You don't pick a scent. You reveal yourself through it.
                    So choose wisely. Find your <b>Essens</b>.
                </p>
                <button onClick={() => navigate("/questionnaire")}>
                    Find yourself
                </button>
            </main>
        </>
    );
}

export default Homepage