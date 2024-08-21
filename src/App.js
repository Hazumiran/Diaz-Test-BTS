import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Layout/LoginForm';
import RegisterForm from './Layout/RegisterForm';
import ChecklistTodo from './Layout/ChecklistTodo';
import TambahChecklist from './Layout/TambahChecklist';
import TambahItem from './Layout/TambahItem';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/checklist" element={<ChecklistTodo />} />
          <Route path="/tambahchecklist" element={<TambahChecklist />} />
          <Route path="/tambahitem" element={<TambahItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
