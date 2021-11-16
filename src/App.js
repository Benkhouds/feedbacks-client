import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import {LoginPage, RegisterPage, ProfilePage, HomePage, CreatePage, FeedbackPage} from './pages/index'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
 return (
  <Router> 
       <div>
          <Switch>
             <Route exact path="/" component={HomePage} />
             <PrivateRoute exact path="/profile" component={ProfilePage} />
             <PrivateRoute exact path="/feedbacks/:id" component={FeedbackPage} />
             <PrivateRoute exact path="/create" component={CreatePage} />
             <Route exact path="/register" component={RegisterPage} />
             <Route exact path="/login" component={LoginPage} />
          </Switch>
        </div>
  </Router>
 )
}

