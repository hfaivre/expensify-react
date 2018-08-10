import {login, logout} from '../../actions/auth';

test('Should login', () => {
    const uid = 'heloosoaskafjl';
    const action = login(uid);
    expect(action).toEqual({
        type : 'LOGIN',
        uid: expect.any(String)
    });
});

test('Should logout', () => {
    const action = logout();
    expect(action).toEqual({
        type : 'LOGOUT'
    });
});