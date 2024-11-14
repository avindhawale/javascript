const posts = [
	{title: 'First Title', desc: 'This is first post'},
	{title: 'Second Title', desc: 'This is second post'},
	{title: 'Third Title', desc: 'This is third post'},
];

function getPosts(){
	
	setTimeout( () =>{
		let output = '';
		posts.forEach( post => {
			output += `<li>${post.title}</li>`;
		});
		document.body.innerHTML = output;
	}, 1000);
}

function addPost(post){
	
	return new Promise( (resolve, reject) => {
		setTimeout( () =>{
			posts.push(post);
			const error = false;
			if(error) reject("Error : Something went wrong");
			else resolve();
		}, 2000);	
	});
	
}
getPosts();
addPost({title: 'Forth Title', desc: 'This is forth post'}).then(getPosts);
