import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import "numeral/locales/fr";


numeral.locale('fr');
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>{numeral(amount/100).format('$0,0.00')}
       -
       Created At: {moment(createdAt).format('MMM Do, YYYY')}
    </p>
  </div>
);

export default ExpenseListItem;
