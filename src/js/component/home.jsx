import React, { useState, useEffect } from "react";
import "../../styles/index.css";

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
			redirect: "follow",
		})
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
		fetch("https://assets.breatheco.de/apis/fake/todos/user/createdname", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(par),
			redirect: "follow",
		})
			.then((response) => {
				response.status === 200 ? setTodolist(par) : "";
			})
			.catch((error) => console.log("error", error));
	};
	// const strike = (list) => {
	// const par = todolist.crossedLine((list, i) => index !== i);
	// const strikethrough = <strike>{list}</strike>;
	// const strikethrough = setTodolist(strikethrough);
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/createdname", {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(strikethrough),
	// 		redirect: "follow",
	// 	})
	// 		.then((response) => {
	// 			response.status === 200 ? "crossedLine" : "";
	// 		})
	// 		.catch((error) => console.log("error", error));
	// };
	const completeTodo = (index) => {
		const todosArray = [...todolist];
		todosArray[index].done = !todosArray[index].done;
		setItem(todosArray);
	};
	console.log(todolist);
	return (
		<div className="container">
			<div className="container">
				<h1>todos</h1>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<input
						type="text"
						className="form-control"
						placeholder="What needs to be done?"
						onChange={(e) => setItem(e.target.value)}
						// value={item}
					/>
					<a
						onClick={() => {
							if (item === "")
								return alert("you cant do that Jimbo");
							setItem("");
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
								<span
									className={list.done ? "crossedLine" : ""}>
									{list.label}
								</span>
								<button
									className="strikethrough"
									onClick={() => completeTodo(index)}>
									strikethrough button
									{list.done}
								</button>
								{/* <button onClick={() => strike(index)}>
									strikethrough
								</button> */}
								<span className="deletekey">
									<a
										className="deletekey btn "
										onClick={() => {
											deletes(index);
										}}>
										X
									</a>
								</span>
							</li>
						);
					})}
			</ul>
			<span>{todolist.length + " items"}</span>
			<br></br>
		</div>
	);
};

export default Home;
