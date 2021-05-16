import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import GlobalContextProvider, { GlobalContext } from './contexts/GlobalContext'
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import Landing from './components/Landing'
import TodoList from './components/TodoList'

function App() {
  return (
      <GlobalContextProvider>
          <GlobalContext.Consumer>{(context) => {
            const theme = createMuiTheme({
              palette: {
                type: context.prefersDarkMode ? 'dark' : 'light'
              },
            })
            return (
              <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                  <Layout>
                    <Switch>
                      <Route exact path="/">
                        <Landing />
                      </Route>
                      <Route exact path="/list">
                        <TodoList />
                      </Route>
                    </Switch>
                  </Layout>
                </Router>
              </ThemeProvider>
            )
          }}
          </GlobalContext.Consumer>
      </GlobalContextProvider>
  );
}

export default App;
