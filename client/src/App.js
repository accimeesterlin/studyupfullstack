import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

window.moment = moment;


class App extends Component {


    componentDidMount() {

    }

    render() {
        return (
           <div>
               <Link to = '/signup'> <Button> Sign Up </Button> </Link>
               <Link to = '/signin'> <Button> Sign In </Button> </Link>
           </div>
        );
    }
}



export default App;