import React from 'react';
import ReactDOM from 'react-dom';
import Double from './double';
import AddOne from './add-one';
import Ceiling from './ceiling';
import ComposeNormal1 from './compose-normal-1.js';
import ComposeNormal2 from './compose-normal-2.js';
import ComposeNormal3 from './compose-normal-3.js';

ReactDOM.render(<Double />, document.querySelector('#double'));
ReactDOM.render(<AddOne />, document.querySelector('#add-one'));
ReactDOM.render(<Ceiling />, document.querySelector('#ceiling'));
ReactDOM.render(<ComposeNormal1 />, document.querySelector('#compose-normal-1'));
ReactDOM.render(<ComposeNormal2 />, document.querySelector('#compose-normal-2'));
ReactDOM.render(<ComposeNormal3 />, document.querySelector('#compose-normal-3'));
