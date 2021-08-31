import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// ---------Components----------------
import A_Class from './components/AClass';
import Classwork from './components/Classwork';
import Members from './components/Members';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Signin from './components/Signin';
import CreateAssignment from './components/CreateAssignment';
import SubmitAssignment from './components/SubmitAssignment';

// ----------Routers-------------
import { Switch,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/class/:id/stream">
            <A_Class />
          </Route>
          <Route exact path="/class/:id/classwork">
            <Classwork />
          </Route>
          <Route exact path="/class/:id/people">
              <Members />
          </Route>
          <Route exact path="/class/:id/assign/create">
              <CreateAssignment />
          </Route>
          <Route exact path="/assign/:id/submit">
              <SubmitAssignment />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
