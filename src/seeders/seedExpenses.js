import faker from 'faker';
import uuid from 'uuid';

const descriptions = [
	"Lunch @ Jimmy's",
	"Gass Bill",
	"Bicycle Parts",
	"Trip to Brussels",
	"Petrol",
	"Coffee at Starbucks",
	"Mission Impossible movie Ticket",
	"Netflix Subscription",
	"Guitar lesson",
	"Groceries",
	"Bicycle Paint Job",
	"Saint Valentines restaurants",
	"Concert tickets for Snarky Puppy",
	"Phone charger",
	"Taxi from Airport to home",
	"Lunch with Client",
	"2 pint at les Chaises",
	"New shoes", 
	"Burger king"
];


export const fakeExpenses = descriptions.map((expense)=>{
	return {
		description : expense,
		amount : Math.floor(faker.finance.amount()*100),
		note: faker.hacker.phrase(),
		createdAt : faker.date.recent().valueOf()
	}
});






