const BASE_URL = "https://hamsahmedansari-todo-server.herokuapp.com";

getTodos = () => {
	document.querySelector("#done").innerHTML = null;
	document.querySelector("#inProgress").innerHTML = null;
	document.querySelector("#open").innerHTML = null;
	try {
		fetch(`${BASE_URL}/todo`)
			.then(res => {
				return res.json();
			})
			.then(result => {
				console.log("Get Todos", result.data);
				result.data.map((val) => {
					if (val.status == "open") {
						// document.querySelector("#open").innerHTML = null;
						let appendData = `<div class="innerData">
							<div class="line1">
								<p class="title">${val.title}</p>
								<p class="comment">${val.type}</p>
							</div>
							<p class="description">
								${val.description}
							</p>
							<p class="duration">
							${moment(val.date).fromNow()}
							</p>
							<div class="buttons">
								<a href="javascript:void(0)" onclick="updateTodo('${val._id}','${val.description}','done','${val.title}','${val.type}')"id="doneBtn">Done</a>
								<a href="javascript:void(0)" onclick="updateTodo('${val._id}','${val.description}','inprogress','${val.title}','${val.type}')"id="inProgressBtn">InProgress</a>
								<a href="javascript:void(0)" onclick="deleted('${val._id}')" id="deleteBtn">Delete</a>
							</div>
							</div>`;
						document.querySelector("#open").innerHTML += appendData;
						
					}
					if (val.status == "inprogress") {
						// document.querySelector("#inProgress").innerHTML = null;
						let appendData = `<div class="innerData">
							<div class="line1">
								<p class="title">${val.title}</p>
								<p class="comment">${val.type}</p>
							</div>
							<p class="description">
								${val.description}
							</p>
							<p class="duration">
							${moment(val.date).fromNow()}
							</p>
							<div class="buttons">
								<a href="javascript:void(0)" onclick="updateTodo('${val._id}','${val.description}','done','${val.title}','${val.type}')"id="doneBtn">Done</a>
								<a href="javascript:void(0)" style="background-color:#000 !important; text-decoration:line-through !important;" id="inProgressBtn">InProgress</a>
								<a href="javascript:void(0)" onclick="deleted('${val._id}')" id="deleteBtn">Delete</a>
							</div>
							</div>`;
						document.querySelector("#inProgress").innerHTML += appendData;
						
					}
					if (val.status == "done") {
						// document.querySelector("#done").innerHTML = null;
						let appendData = `<div class="innerData">
							<div class="line1">
								<p class="title">${val.title}</p>
								<p class="comment">${val.type}</p>
							</div>
							<p class="description">
								${val.description}
							</p>
							<p class="duration">
								${moment(val.date).fromNow()}
							</p>
							<div class="buttons">
								<a href="javascript:void(0)" style="background-color:#000; text-decoration:line-through;"id="doneBtn">Done</a>
								<a href="javascript:void(0)" onclick="updateTodo('${val._id}','${val.description}','inprogress','${val.title}','${val.type}')"id="inProgressBtn">InProgress</a>
								<a href="javascript:void(0)" onclick="deleted('${val._id}')" id="deleteBtn">Delete</a>
							</div>
							</div>`;
						document.querySelector("#done").innerHTML += appendData;
						
					}
				});
			});
	} catch (error) {
		console.log("error while getting todos", error);
	}
};


getTodos();


userData = () => {

	let title = document.querySelector('#title').value;
	let description = document.querySelector('#txtArea').value;
	let type = document.querySelector('#type').value;
	let status = document.querySelector('#status').value;
	// console.log(status);
	try {
		const payload = {
			description: description,
			isDelete: false,
			status: status,
			title: title,
			type: type,
			date : new Date().getTime()
		};

		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(payload)
		};

		fetch(`${BASE_URL}/todo`, options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				// console.log("data", data);
				getTodos();
			});
	} catch (error) {
		console.log("error while adding todo", error);
	}
	
}
deleted = (id) => {
	const deletedId = id;
	const options = {
		method: "DELETE",
		headers: {
			"content-type": "application/json"
		}
	};
	try {
		fetch(`${BASE_URL}/todo/${deletedId}`, options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				getTodos();
			});
	} catch (error) {
		console.log("error while deleting todo", error);
	}

}

updateTodo = (id,description,status,title,type) => {
	const updatedId = id;
	const payload = {
	  description: description,
	  isDelete: false,
	  status: status,
	  title: title,
	  type: type,
	  date : new Date().getTime()
	};
  
	const options = {
	  method: "PUT",
	  headers: {
		"content-type": "application/json"
	  },
	  body: JSON.stringify(payload)
	};
  
	try {
	  fetch(`${BASE_URL}/todo/${updatedId}`, options)
		.then(res => {
		  return res.json();
		})
		.then(data => {
		  console.log("data", data);
		  getTodos();
		});
	} catch (error) {
	  console.log("error while updating todo", error);
	}
  };

closeTab = () => {
	document.querySelector("#wrapper").style.display = "none";
}
