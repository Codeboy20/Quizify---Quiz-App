// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import './index.css';
// import Home from './components/Home.jsx';
// import Quizz from './components/Quizz.jsx';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// const rootElement = document.getElementById('root');

// const AuthenticatedApp = () => (
//   <Auth0Provider
//     domain="dev-hl12gy0z2ds5l6uu.us.auth0.com"
//     clientId="kM0hLxu1pfxREazDYIpq2nWYq8LP2DMM"
//     redirectUri={window.location.origin}
//   >
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/quiz" element={<Quizz />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </Auth0Provider>
// );

// ReactDOM.render(<AuthenticatedApp />, rootElement);




import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';
import Home from './components/Home.jsx';
import Quizz from './components/Quizz.jsx';

const rootElement = document.getElementById('root');

const AuthenticatedApp = () => (
  <Auth0Provider
    domain="dev-hl12gy0z2ds5l6uu.us.auth0.com"
    clientId="kM0hLxu1pfxREazDYIpq2nWYq8LP2DMM"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quizz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

ReactDOM.render(<AuthenticatedApp />, rootElement);
