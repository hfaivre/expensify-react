const promise = new Promise((resolve, reject)=>{
	setTimeout(()=>{
		resolve('this is my resolve data');
	}, 3000)
});


promise.then((data)=>{
	console.log(data)
});