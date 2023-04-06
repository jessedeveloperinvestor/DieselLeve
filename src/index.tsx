import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Head from './Head';
import Main from './Main';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Head />
    <Main />
  </StrictMode>
);
