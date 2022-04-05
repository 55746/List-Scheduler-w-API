import React, { useState, useEffect } from "react";

const Home = () => {
	const [todolist, setTodolist] = useState([]);
	const [item, setItem] = useState("");

	const addItem = (newItem) => {
		let newList = [...todolist, { label: newItem, done: false }];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/createdname", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newList),
			redirct: "follow",
		})
			// .then((response) => response.json())
			.then((response) => {
				response.status === 200 ? setTodolist(newList) : "";
			})
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/createdname",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setTodolist(result);
			})
			.catch((error) => console.log("error", error));
	}, []);

	const deletes = (index) => {
		const par = todolist.filter((list, i) => index !== i);
		setTodolist(par);
	};
	console.log(todolist);
	return (
		<>
			<div>
				<h1>Data</h1>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<input
						type="text"
						className="form-control"
						placeholder=""
						onChange={(e) => setItem(e.target.value)}
						value={item}
					/>
					<a
						onClick={() => {
							if (item === "")
								return alert("you cant do that Jimbo");
							// setTodolist([...todolist, item]);
							// addItem(item);
							// setItem("");
							// console.log("updated");
							addItem(item);
						}}
						type="btn btn-primary"
						className="input-group-text"
						id="basic-addon1">
						Button
					</a>
				</div>
			</div>
			<ul>
				{todolist &&
					todolist.map((list, index) => {
						return (
							<li key={index} className="boxtype">
								<div>{list.label}</div>
								<div className="deletekey">
									<a
										className="deletekey btn "
										onClick={() => {
											deletes(index);
										}}>
										X
									</a>
								</div>
							</li>
						);
					})}
			</ul>
			<span>{todolist.length + " items"}</span>
			<br></br>
		</>
	);
};

export default Home;

// let requestOptions = {
// 	method: "PUT",
// 	// headers: myHeaders,
// 	redirect: "follow",
// 	body: raw,
// };
