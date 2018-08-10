import authReducer from '../../reducers/auth';

test('Should return login with correct info', () => {
	const action = {
		type: 'LOGIN',
		uid: '12341908190'
	};
	const state = authReducer({}, action);
	expect(state).toEqual({uid: action.uid});
});


test('Should return logout', () => {
	const action = {
		type: 'LOGOUT'
	};
	const state = authReducer({uid: 'askdj'}, action);
	expect(state).toEqual({});
});