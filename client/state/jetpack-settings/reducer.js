/**
 * External dependencis
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { reducer as jetpackModules } from './modules/reducer';
import { reducer as jetpackJumpstart } from './jumpstart/reducer';

export default combineReducers( {
	jetpackModules,
	jetpackJumpstart
} );
