import React, {useState, useEffect} from 'react';
import axios from "axios";

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [answerSelected, setAnswerSelected] = useState("");


    useEffect(() => {
        try {
            axios.get('https://the-trivia-api.com/api/questions?categories=food,film,general_knowledge&limit=5&region=FR&difficulty=easy&language=fr')
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
            setAnswerSelected('correct');
        } else {
            setAnswerSelected('incorrect');
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setAnswerSelected("");
            } else {
                setShowScore(true);
            }
        }, 1000);
    }


    const renderQuiz = () => {
        return (
            <div className='quiz'>
                <h1 className='quiz-header'>Quiz - Question {currentQuestion + 1}</h1>
                {questions.length > 0  && (
                    <>
                        <h3 className='quiz-question'>{questions[currentQuestion].question}</h3>
                        <div className='btn-display'>
                            {questions[currentQuestion].incorrectAnswers.map((answer, index) => (
                                <button key={index} className='btn-quiz-response' onClick={() => handleAnswerButtonClick(answer)}>{answer}</button>
                            ))}
                            <button
                                className={`btn-quiz-response ${answerSelected === 'correct' ? 'btn-correct' : ''} ${answerSelected === 'incorrect' ? 'btn-incorrect' : ''}`}
                                onClick={() => handleAnswerButtonClick(questions[currentQuestion].correctAnswer)}>{questions[currentQuestion].correctAnswer}
                            </button>
                        </div>

                    </>
                )}
            </div>
        );
    }

    const renderScore = () => {
        return (
            <div className={'score-wrap'}>
                <h2 className={'score-title'}>Votre score</h2>
                <p className={'score-result'}>Vous avez répondu correctement à <span className={`${score >= 3 ? 'correct' : 'incorrect'}`}>{score}</span> question(s) sur {questions.length} .</p>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="App-content">
                {showScore ? renderScore() : renderQuiz()}
            </div>
        </div>
    );
}

export default App;