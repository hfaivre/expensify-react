import { 
  setExpenses, 
  startSetExpenses, 
  startAddExpense, 
  startEditExpense,
  addExpense, 
  editExpense, 
  removeExpense, 
  startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'test uid';

beforeEach((done)=>{
  const expensesData = {};
  expenses.forEach(({id, description, note, amount, createdAt})=>{
    expensesData[id] = {description, note, amount, createdAt};
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done());

});

test('Should fetch data from database', (done)=>{
  const store = createMockStore({auth: {uid}});
  store.dispatch(startSetExpenses()).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should Add expense to database and store', (done) => { //Done force JEST to make this test be an asynchronous one
  const store = createMockStore({auth: {uid}});
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    createdAt: 1000,
    note: 'this one is better'
  };
  store.dispatch(startAddExpense(expenseData))
    .then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id:expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});



test('should Add defaults to database and store', (done) => {
  const store = createMockStore({auth: {uid}});
  const expenseDefaults = {
    description: '',
    amount: 0,
    createdAt: 0,
    note: ''
  };
  store.dispatch(startAddExpense({}))
    .then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id:expect.any(String),
          ...expenseDefaults
        }
      });
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});


test('Should setup SET_EXPENSE data with data', ()=> {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should remove item from database', (done)=> {
  const store = createMockStore({auth: {uid}});
  store.dispatch(startRemoveExpense({id:1}))
    .then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id:1
      });
      return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot)=>{
      expect(snapshot.val()).toEqual(null);
      done();
    });
});


test('Should edit expense in database', (done) => {
  const store = createMockStore({auth: {uid}});
  const id = expenses[0].id;
  const updates = {amount: 40};
  store.dispatch(startEditExpense(id,updates))
  .then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id, 
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot)=>{
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

