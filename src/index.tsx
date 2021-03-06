import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './assets/lang';
import theme from './theme';
import App from './pages/App';



ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={null}>
            <App />
        </Suspense>
    </ThemeProvider>,
    document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
