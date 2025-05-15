import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { InputPage } from './InputPage';
import { DisplayPage } from './DisplayPage'; // Импортируем новую страницу

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/input" element={<InputPage />} />
                <Route path="/display" element={<DisplayPage />} />
            </Routes>
        </Router>
    );
};

export default App;
