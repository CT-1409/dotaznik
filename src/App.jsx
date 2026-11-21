import Homepage from "./Views/Pages/Homepage.jsx";
import Questionnaire from "./Views/Pages/Questionnaire.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
        </Routes>
    );
}

export default App;
