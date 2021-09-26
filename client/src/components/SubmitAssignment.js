import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Navbar2 from './Navbar2'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { MdAssignment, MdAssignmentInd,MdCreateNewFolder } from "react-icons/md";

const SubmitAssignment = () => {
    const [answer, setAnswer] = useState([]);
    const params = useParams();
    const [questions, setQuestions] = useState([]) 
    const [assign, setAssign] = useState({
            title: '',
            submissions: [],
    });
    const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
        role:''
    });

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

        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            let cook = decodeURI(cookie);
            cook = cook.split('=').map(c => c.trim());
            if (cook[0] === 'user') {
                const temp = JSON.parse(decodeURIComponent(cook[1]));
                if(temp)
                setUser(() => {
                    return {
                        _id: temp._id,
                        email: temp.email,
                        username: temp.username,
                        role:temp.role
                    }
                });
            }
        })
        
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
                setAssign(()=>{
                    return {
                        title: res.assign.title,
                        submissions: res.assign.submissions
                    }
                })
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
                    method: 'PATCH',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(answer),
                })
            console.log(JSON.stringify(answer))
            
            console.log(res)

            res = await res.json();


            if(!res.error){
                hist.push("/")
            }else{
                throw res.error;
            }
        }
        catch(err){
            console.log(err)
            // setErr(err)
        }
    }


    if(user.role === "Student"){
        return (
            <>
               
                <div className="p-5">
                    <div className="container col-12 col-md-9 mt-5 p-5 bg-white form_bg">
                        <h3>Solve the Assignment</h3>
                        <form>
                            {questions.map((question, index)=>{
                             return <form key={index}>
                                <div className="row justify-content-center align-content-center mb-3 mt-5">
                                    <div className="col-md-10">
                                        <p style={{fontWeight:"600"}}>{question.question}</p>
                                        <p style={{float:"right"}}>Points: {question.points}</p>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-content-center mb-md-3">
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input type="radio" id="customRadio1" name={question._id} value={question.options[0]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                        <label className="custom-control-label" for="customRadio1">{question.options[0]}</label>
                                    </div>
    
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input type="radio" id="customRadio2" name={question._id} value={question.options[1]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                        <label className="custom-control-label" for="customRadio1">{question.options[1]}</label>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-content-center mb-md-3">
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input type="radio" id="customRadio3" name={question._id} value={question.options[2]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                        <label className="custom-control-label" for="customRadio1">{question.options[2]}</label>
                                    </div>
    
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input type="radio" id="customRadio4" name={question._id} value={question.options[3]} onChange={(e)=> onChange(index,e)} className="custom-control-input m-3" />
                                        <label className="custom-control-label" for="customRadio1">{question.options[3]}</label>
                                    </div>
                                </div>
                                </form>
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
        
    }else{
        return (
            <>
               
                <div className="p-5">
                    <div className="container col-12 col-md-9 mt-5 p-5 bg-white form_bg">
                        <h3>{assign.title}</h3>
                        {console.log(questions)}
                        <div className="row justify-content-center align-items-center">
                        {assign.submissions.length === 0 ? <p>No submissions yet</p> : null}
                        <ListGroup variant="flush"  className="mt-5 col-md-7">
                            {assign.submissions.map((ass, index) =>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between">
                                        <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> {ass.user}</div>
                                        <div>{ass.points}</div>
                                        <div>{(ass.time.split("T")[0])}</div>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default SubmitAssignment
