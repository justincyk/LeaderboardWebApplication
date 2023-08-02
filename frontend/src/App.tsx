// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import React from "react";
import "./App.css";
import LeaderboardPage from "./Leaderboard/LeaderboardPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <div className="containers">
                <Routes>
                    <Route path="/" element={<LeaderboardPage />} />.
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
