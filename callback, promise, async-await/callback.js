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

function addPost(post, callback){
	
	setTimeout( () =>{
		posts.push(post);
		callback();
	}, 2000);
}

addPost({title: 'Forth Title', desc: 'This is forth post'}, getPosts);

getPosts();