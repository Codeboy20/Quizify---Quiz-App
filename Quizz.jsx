// import React, { useEffect, useState } from 'react'

// function Quizz() {
//   const [questions , setQuestions] = useState([]);
//   const[answers , setAnswers] = useState([]);
//   const [showresult,setshowresult] = useState(false);
//   const [Score , setScore] = useState(0);

//   useEffect(() =>{
//       fetch('quiz.json').then(res => res.json).then(data => console.log(data))
//   },[])
//   return (
//     <section>
//       <div>Quiz header</div>


//     </section>
//   )
// }

// export default Quizz

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizheader from "./quizheader";


const Loading = () => {
  return (
    <div className='h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[30%] rounded-bl-[30%]'>
      <p className='text-xl text-gray-500'>Loading...</p>
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
  return formattedTime;
};

function Quizz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setloading] = useState(false);
  const [Timer, setTimer] = useState(60);
  const [TimerIntervalId, setTimerIntervalId] = useState('')
  const [status, setstatus] = useState("")
  const navigate = useNavigate();



  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        setQuestions(data); // Assuming your JSON has a key named "questions"
      })
      .catch(error => {
        console.error('Error fetching quiz:', error);
      });

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (Timer <= 0) {
        setShowResult(true);
      }
    }
  }, [Timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    // Handle answer selection logic here
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
  };

  const handlesubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setloading(true);

    clearInterval(TimerIntervalId);

    setTimeout(() => {
      const quizscore = calculatescore(answers);
      setScore(quizscore);
      const percentage = (quizscore / questions.length) * 100;
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setstatus(newStatus)
      setShowResult(true);
      setloading(false);
    }, 3000);
  };

  const calculatescore = (userans) => {
    const correct = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userans) {
      if (userans[questionId] === correct[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  const RestartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setloading(false);
    setTimer(60);
    navigate("/quiz")
  }
  return (


    <section>
      {/* <div>Quiz header</div> */}
      {/* <quizheader timer={timer} /> */}
      <div className='flex flex-col item-center'>

        <div className='md:w-9/12 w-[90%] mx-auto my-8 flex flex-col sm:flex-row justify-between'>
          <div className='md:w-[70%] w-full ml-9'>
            {
              questions.map((question, index) => (
                <div key={question.id} className='m-3 py-3 px-4 shadow-sm border-sm border border-gray-200 rounded'>
                  <p className='flex items-center rounded text-xs p-2 cursor-pointer'><span className='h-8 w-8 bg-[#0b7a96] rounded-full flex items-center justify-center text-[white] mr-3'>{index + 1}</span>
                    <span className='text-base block'>{question.question}</span>
                  </p>

                  <div className='grid sm:grid-cols-2 grid-col-1 gap-4 mt-5'>
                    {
                      question.options.map((option, index) => (
                        <div onClick={() => handleAnswerSelect(question.id, option)} key={index} className={`border p-2 border-gray-200 rounded text-sx cursor-pointer ${answers[question.id] === option ? "bg-gray-300" : ''}`}>
                          <p className='text-[10px] mb-1'>Option {index + 1}</p>
                          <p>{option}</p>
                        </div>

                      ))
                    }
                  </div>
                </div>
              ))
            }

            
          </div>


          <div className='md:w-[30%] w-full p-4'>
            {
              showResult && (
                <div>
                  <h2 className='test-2xl font-large'>Your Score</h2>
                  <div className='h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[30%] rounded-bl-[30%]'>
                    <h3 className={`text-xl ${status === "passed" ? "text-green-800" : "text-[#0b7a96]"}`}>{status}</h3>

                    <h1 className='text-3xl font-bold my-2'>{score * 10}<span className='text-slate-800'>/150</span>
                    </h1>
                    {/* <p>Time Taken: <span>{formatTime(60 - Timer)}<span> </span></span></p> */}
                    <p className='text-sm flex justify-center items-center gap-2'>
                      Total time:{" "}
                      <span className='text-xl text-[#0b7a96]'>
                        {formatTime(60 - Timer)}
                        <span className='text-xs'>sec</span>
                      </span>
                    </p>


                  </div>
                  <button onClick={RestartQuiz} className='bg-[#0b7a96]  px-6 py-2 mt-5 w-full  text-white rounded hover:bg-[white] hover:text-black transition-all duration-300 ease-in'>Restart</button>
                </div>
              )}

            {loading && <Loading />}
          </div>

        </div>
        <button className='bg-[#0b7a96] w-fit ml-[33.5rem] mb-10 px-6 py-2 text-white rounded hover:bg-[white] hover:text-black transition-all duration-300 ease-in  ' onClick={handlesubmit}>Submit</button>
      </div>
    </section>
  );
}

export default Quizz;



