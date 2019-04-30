import * as types from '../actions/actionTypes';

export default function users(state = [], action) {
	switch (action.type) {
		case types.FETCH_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}
