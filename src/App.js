import React, {useState, useEffect} from 'react';
import axios from "axios";

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);


    useEffect(() => {
        try {
            axios.get('https://the-trivia-api.com/api/questions?categories=arts,film,music&limit=5&region=FR&difficulty=easy&language=FR')
                .then(res => {
                    setQuestions(res.data);
                })
        } catch (e) {
            console.error(e.error);
        }
    }, []);

    const handleAnswerButtonClick = (answer) => {
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }


    const renderQuiz = () => {
        return (
            <>
                <h1>Quiz</h1>
                {questions.length > 0  && (
                    <>
                        <h2>Question {currentQuestion + 1}</h2>
                        <h3>{questions[currentQuestion].question}</h3>
                        {questions[currentQuestion].incorrectAnswers.map((answer, index) => (
                            <button key={index} onClick={() => handleAnswerButtonClick(answer)}>{answer}</button>
                        ))}
                        <button
                            onClick={() => handleAnswerButtonClick(questions[currentQuestion].correctAnswer)}>{questions[currentQuestion].correctAnswer}
                        </button>
                    </>
                )}
            </>
        );
    }

    const renderScore = () => {
        return (
            <>
                <h1>Quiz</h1>
                <h2>Votre score</h2>
                <p>{score} / {questions.length}</p>
            </>
        );
    }

    return (
        <div className="App">
            <div className="App-header">
                <h1>Quiz</h1>
            </div>

            <div className="App-content">
                {showScore ? renderScore() : renderQuiz()}
            </div>
        </div>
    );
}

export default App;