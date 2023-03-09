import React, { useState, useEffect } from 'react';
import axios from "axios";
import Question from './Question';

const App = () => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(null);

	const fetchQuestions = async () => {
		try {
			const response = await axios.get(
				'https://the-trivia-api.com/questions?limit=5'
			);
			setQuestions(response.data);
			setCurrentQuestion(response.data[0]);
			console.log(response)
		} catch (error) {
			console.error(error);
		}
	};

	const nextQuestion = () => {
		// TODO : update score and go to next question
	}

	useEffect(() => {
		fetchQuestions();
	}, [])

	return(
		<div className="App">
			<div className="App-header">
				<h1>Quiz</h1>
			</div>

			<div className="App-content">
				<Question
					question={currentQuestion}
					nextQuestion={nextQuestion}
				/>
			</div>
		</div>
	);
}

export default App;