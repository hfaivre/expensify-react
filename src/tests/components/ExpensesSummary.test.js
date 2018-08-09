import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import {ExpensesSummary} from '../../components/ExpensesSummary';


test('Should render Expenses Summary with expense count of 1',()=>{
	const wrapper = shallow( <ExpensesSummary expenseCount = {1} expensesTotal = {109500}/>);
	expect(wrapper).toMatchSnapshot();
});

test('Should render Expenses Summary with expense count of 1++',()=>{
	const wrapper = shallow( <ExpensesSummary expenseCount = {3} expensesTotal = {114195}/>);
	expect(wrapper).toMatchSnapshot();
});