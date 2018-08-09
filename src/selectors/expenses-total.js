export default (expenses) => {
	return expenses.reduce((acc, next)=> {
		return acc = acc + next.amount;
	},0);
};