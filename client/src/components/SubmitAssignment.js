import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Navbar2 from './Navbar2'

const SubmitAssignment = () => {
    const [answer, setAnswer] = useState([]);
    const params = useParams();
    const [questions, setQuestions] = useState([]) 

    const [err, setErr] = useState('')

    const hist = useHistory();

    const onChange = (index, event) => {
        // event.preventDefault();
        event.persist();
        console.log(answer)
        setAnswer(
            {...answer,
                [event.target.name]: event.target.value
            }
        );
    };

    useEffect(()=>{

        
        const fetchAssigns = async () => {
            try{
                let res = await fetch(`/assign/${params.id}`, {
                        method: 'GET',
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    });
                res = await res.json();
                return res;
            }
            catch(err){
                console.log(err)
            }
        };

        fetchAssigns().then(res=>{
            if(res){
                console.log(res.assign.questions)

                setQuestions(res.assign.questions)
            }else{
                console.log("no resukt")
                setErr("No result")
            }
        });

    }, [])

    const submitHandler = async () => {
        console.log(answer)
        try{
            let res = await fetch(`/assign/${params.id}/submit`, {
                    method: 'POST',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(answer),
                })
            console.log(res)
            
            res = await res.json();

            console.log(res)

            if(!res.error){
                hist.push("/")
            }else{
                throw res.error;
            }
        }
        catch(err){
            console.log(err)
            setErr(err)
        }
    }



    return (
        <>
            <div className="p-5">
                <div className="container col-12 col-md-9 mt-5 p-5 bg-white form_bg">
                    <h3>Solve the Assignment</h3>
                    {/* {console.log(answer)} */}
                    {JSON.stringify(answer)}
                    <form>
                        {questions.map((question, index)=>{
                         return <form key={index}>
                            <div className="row justify-content-center align-content-center mb-3 mt-5">
                                <div className="col-md-10">
                                    <p>{question.question}</p>
                                    <p>{question.points}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center align-content-center mb-md-3">
                                <div className="col-12 col-md-5 mb-3 mb-md-0">
                                    <input type="radio" id="customRadio1" name={index} value={question.options[0]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                    <label className="custom-control-label" for="customRadio1">{question.options[0]}</label>
                                </div>

                                <div className="col-12 col-md-5 mb-3 mb-md-0">
                                    <input type="radio" id="customRadio2" name={index} value={question.options[1]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                    <label className="custom-control-label" for="customRadio1">{question.options[1]}</label>
                                </div>
                            </div>
                            <div className="row justify-content-center align-content-center mb-md-3">
                                <div className="col-12 col-md-5 mb-3 mb-md-0">
                                    <input type="radio" id="customRadio3" name={index} value={question.options[2]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                    <label className="custom-control-label" for="customRadio1">{question.options[2]}</label>
                                </div>

                                <div className="col-12 col-md-5 mb-3 mb-md-0">
                                    <input type="radio" id="customRadio4" name={index} value={question.options[3]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                    <label className="custom-control-label" for="customRadio1">{question.options[3]}</label>
                                </div>
                            </div>
                            </ form>
                        })}
                    </form>
                    <button onClick={submitHandler} className="col-md-2 btn btn-outline-success mt-2 form_bg">
                        Submit
                    </button>
                    <p className="mt-3 danger">{err}</p>
                </div>
            </div>
        </>
    )
}

export default SubmitAssignment
