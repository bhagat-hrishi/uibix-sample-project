// Importing React Router  
import { BrowserRouter as Router , Switch , Route, Link} from 'react-router-dom'

// Importing components
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                    <Route path="/"  exact component={Home} />
                    <Route path="/signin"  exact component={SignIn} />
                    <Route path="/signup"   exact component={SignUp} />
                    
            </Switch>
        </div>
    </Router>
    );
}

const Home = ()=>{ 
    

      return (
        <div className='homepage'>
              <marquee direction='right' >Do not Share Your Original Info</marquee>
                <h1 className="main-name ">
                    UIBIX
                </h1>
                <div className='homepagelinks'>
                    <Link to='/signup' className='signup-link'>
                        SIGNUP
                    </Link>
                    <Link to='/signin' className='signin-link'>
                        SIGNIN
                    </Link>
                </div>
                <div className="social-container">
                    <ul className="social-icons">
                        <li><a href="https://www.linkedin.com/company/uibix?originalSubdomain=in" target="_blank" rel="noreferrer"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="https://www.facebook.com/uibix" target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://www.uibix.com/" ><i className="fa fa-globe"></i></a></li>
                    </ul>
                
                </div>
        </div>
      )
};

export default App;
