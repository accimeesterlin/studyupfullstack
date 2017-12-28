import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Dropdown, Label} from 'semantic-ui-react';
import {clearCookie} from '../utils';
import '../scss/header.scss';

const Header = ({user}) => {

    const {username} = user;

    return (
        <div className="header">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5} className="profile">
                        <Label as='a' image>
                            <img src='https://www.serviceseeking.com.au/assets/business_profile/default-profile-pic.svg' alt='Logo'/>
                            { 'Welcome ' + username }
                        </Label>
                    </Grid.Column>


                    <Grid.Column width={9} className="profile">

                    </Grid.Column>


                    <Grid.Column width={2} className="more-options">

                        <Dropdown icon={'align justify'}>
                            <Dropdown.Menu>
                                <Link to='/profile'><Dropdown.Item> Profile </Dropdown.Item> </Link>
                                <Link to='/map'><Dropdown.Item> Study now </Dropdown.Item> </Link>
                                <Link to='/event'><Dropdown.Item> Study later </Dropdown.Item> </Link>
                                <Link to='/dashboard'><Dropdown.Item> Dashboard </Dropdown.Item> </Link>
                                <Link to='/event/lists'><Dropdown.Item> Events </Dropdown.Item> </Link>
                                <Link to='/'><Dropdown.Item onClick={clearCookie}> Logout </Dropdown.Item></Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </div>
    );
};


export default Header;