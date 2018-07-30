import React from 'react';
import ReactDOM from 'react-dom';
import Double from './double';
import AddOne from './add-one';
import Ceiling from './ceiling';
import ComposeNormal1 from './compose-normal-1.js';
import ComposeNormal2 from './compose-normal-2.js';
import ComposeNormal3 from './compose-normal-3.js';
import DoubleAltered from './double-altered';
import AddOneAltered from './add-one-altered';
import CeilingIncorrectlyAltered from './ceiling-incorrectly-altered';
import ComposeAltered from './compose-altered';
import DoubleDecorated from './double-decorated';
import DoubleDecoratedUse from './double-decorated-use';
import AddOneDecorated from './add-one-decorated';
import CeilingDecorated from './ceiling-decorated';
import ComposeDecorated from './compose-decorated';
import DoubleModifiedAndOneNot from './double-modified-add-one-not';
import ComposeLifted from './compose-lifted';
import BuildLog from './build-log';
import DoubleManuallyLifted from './double-manually-lifted';
import DoubleModifiedAndOneNot2 from './double-modified-add-one-not-2';
import AddOneManuallyLifted from './add-one-manually-lifted';
import CeilingManuallyLifted from './ceiling-manually-lifted';
import MapDecorateDouble from './map-decorate-double';
import MapDecorateFn from './map-decorate-fn';
import MapDecorateAddOne from './map-decorate-add-one';
import MapDecorateCeiling from './map-decorate-ceiling';
import LogNameDecorator from './log-name-decorator';
import MapDecomposed from './map-decomposed';
import FlatMapDecorator from './flatmap-decorator';

// import './test';

ReactDOM.render(<Double />, document.querySelector('#double'));
ReactDOM.render(<AddOne />, document.querySelector('#add-one'));
ReactDOM.render(<Ceiling />, document.querySelector('#ceiling'));
ReactDOM.render(<ComposeNormal1 />, document.querySelector('#compose-normal-1'));
ReactDOM.render(<ComposeNormal2 />, document.querySelector('#compose-normal-2'));
ReactDOM.render(<ComposeNormal3 />, document.querySelector('#compose-normal-3'));
ReactDOM.render(<DoubleAltered />, document.querySelector('#double-altered'));
ReactDOM.render(<AddOneAltered />, document.querySelector('#add-one-altered'));
ReactDOM.render(<CeilingIncorrectlyAltered />, document.querySelector('#ceiling-incorrectly-altered'));
ReactDOM.render(<ComposeAltered />, document.querySelector('#compose-altered'));
ReactDOM.render(<DoubleDecorated />, document.querySelector('#double-decorated'));
ReactDOM.render(<AddOneDecorated />, document.querySelector('#add-one-decorated'));
ReactDOM.render(<CeilingDecorated />, document.querySelector('#ceiling-decorated'));
ReactDOM.render(<ComposeDecorated />, document.querySelector('#compose-decorated'));
ReactDOM.render(<DoubleModifiedAndOneNot />, document.querySelector('#double-modified-add-one-not'));
ReactDOM.render(<ComposeLifted />, document.querySelector('#compose-lifted'));
ReactDOM.render(<BuildLog />, document.querySelector('#build-log'));
ReactDOM.render(<DoubleManuallyLifted />, document.querySelector('#double-manually-lifted'));
ReactDOM.render(<DoubleModifiedAndOneNot2 />, document.querySelector('#double-modified-add-one-not-2'));
ReactDOM.render(<AddOneManuallyLifted />, document.querySelector('#add-one-manually-lifted'));
ReactDOM.render(<CeilingManuallyLifted />, document.querySelector('#ceiling-manually-lifted'));
ReactDOM.render(<MapDecorateDouble />, document.querySelector('#map-decorate-double'));
ReactDOM.render(<MapDecorateFn />, document.querySelector('#map-decorate-fn-1'));
ReactDOM.render(<MapDecorateAddOne />, document.querySelector('#map-decorate-add-one'));
ReactDOM.render(<MapDecorateCeiling />, document.querySelector('#map-decorate-ceiling'));
ReactDOM.render(<LogNameDecorator />, document.querySelector('#log-name-decorator'));
ReactDOM.render(<MapDecorateFn />, document.querySelector('#map-decorate-fn-2'));
ReactDOM.render(<MapDecomposed />, document.querySelector('#map-decomposed'));
ReactDOM.render(<FlatMapDecorator />, document.querySelector('#flat-map-decorator'));
