import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Tabs, Tab, AppBar, Toolbar, Typography } from '@mui/material';
import DatabaseViewer from './components/DatabaseViewer';
import EmptyTab from './components/EmptyTab';

const App: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Router>
            <AppBar position="static" style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h6">Digger App</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Database Viewer" component={Link} to="/" />
                    <Tab label="Empty Tab" component={Link} to="/empty" />
                </Tabs>
                <Switch>
                    <Route exact path="/" component={DatabaseViewer} />
                    <Route path="/empty" component={EmptyTab} />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;