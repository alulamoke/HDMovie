import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import { store } from './redux/store';
import theme from './utils/theme';
import GlobalStyle from './utils/globals';

import App from './containers/App';

import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>HDMovie</title>
          <meta
            name="description"
            content=" HDMovie is a website that you can watch the largest collection of
            Movies and TV shows anytime anywhere!"
          />
        </Helmet>
        <App />
        <GlobalStyle />
      </>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);
