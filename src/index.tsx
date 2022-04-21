import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";

import './index.css';
import SamuraiJsApp from './App';

ReactDOM.render(<SamuraiJsApp/>, document.getElementById('root'));

serviceWorker.unregister();
