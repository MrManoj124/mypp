import './App.css';
import LoginForm from './Components/JsFiles/LoginForm';
import RegisterForm from './Components/JsFiles/RegiterForm';
import Dashboard from './Components/JsFiles/Dashboard';

function App() {
  return (
    <div className="App">
      <LoginForm/>
      <RegisterForm/>
      <Dashboard/>
    </div>
  );
}

export default App;
