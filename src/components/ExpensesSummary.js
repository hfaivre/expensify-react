import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import "numeral/locales/fr";


numeral.locale('fr');

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
	const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');
	return (
		<div>
			<h1>Viewing {expenseCount} {expenseWord} totalling  {formattedExpensesTotal}</h1>
		</div>
	)
};
	



const mapStateToProps = (state) => {
  return {
    expenseCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal : expensesTotal(selectExpenses(state.expenses, state.filters))
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
