import React, {useState} from 'react'
import Navbar2 from './Navbar2';
import { ImCross } from "react-icons/im";
import { useHistory, useParams } from 'react-router-dom';


const CreateAssignment = () => {
    const [form, setForm] = useState([]);
    const [dealine,setDeadline] = useState('');
    const [title, setTitle] = useState('');
    const [err, setErr] = useState('');
    const hist = useHistory();

    const params = useParams();

    const submitHandler = () => {

        let Question = [];

        form.forEach(ele=>{
            let tempQuestion = {
                question: ele.Question,
                options: [ele.Option1, ele.Option2, ele.Option3, ele.Option4],
                correct: ele.Correct,
                points: ele.Points
            }
            Question.push(tempQuestion)
        })

        let sendQuestionData = {
            title: title,
            questions: Question,
            due: dealine,
        }

        console.log(sendQuestionData, params)

        if(!sendQuestionData.due || !sendQuestionData.title || !sendQuestionData.questions ){
            //empty field
            setErr("Empty field!")
        }
        else{
            fetchClassPosts(sendQuestionData).then(res => {
                if(!res.error){
                    hist.push(`/class/${params.id}/classwork`);
                }else{
                    // setErr(res.error || 'Something')
                    console.log(res.error)
                }
            })
        }
    }

    const fetchClassPosts = async (sendQuestionData) => {
        let res = await fetch(`/class/${params.id}/assign`, {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify(sendQuestionData)
        });
        res = await res.json();
        return res;
    };

    const prevIsValid = () => {
        if (form.length === 0) {
        return true;
        }

        const someEmpty = form.some(
        (item) => item.Correct === "" || item.Correct === "Select the Correct Option" ||item.Option1 === "" ||item.Option2 === "" ||item.Option3 === "" ||item.Option4 === "" || item.Question === ""|| item.Points === ""
        );

        if (someEmpty) {
        form.map((item, index) => {
            const allPrev = [...form];

            if (form[index].Points === "") {
            allPrev[index].errors.Points = "Points is required";
            }

            if (form[index].Question === "") {
            allPrev[index].errors.Question = "Question is required";
            }

            if (form[index].Option1 === "") {
            allPrev[index].errors.Option1 = "Option1 is required";
            }

            if (form[index].Option2 === "") {
            allPrev[index].errors.Option2 = "Option2 is required";
            }
            if (form[index].Option3 === "") {
            allPrev[index].errors.Option3 = "Option3 is required";
            }
            if (form[index].Option4 === "") {
            allPrev[index].errors.Option4 = "Option4 is required";
            }
            if (form[index].Correct === "") {
            allPrev[index].errors.Correct = "Correct Option is required";
            }
            if (form[index].Correct === "Select the Correct Option") {
            allPrev[index].errors.Correct = "Correct Option is required";
            }
            setForm(allPrev);
        });
        }

        return !someEmpty;
    };

    const handleAddLink = (e) => {
        e.preventDefault();
        const inputState = {
        Points: "",
        Question: "",
        Option1: "",
        Option2: "",
        Option3: "",
        Option4: "",
        Correct:"",

        errors: {
            Points: null,
            Question: null,
            Option1: null,
            Option2: null,
            Option3: null,
            Option4: null,
            Correct: null,
        },
        };

        if (prevIsValid()) {
        setForm((prev) => [...prev, inputState]);
        }
    };

    const onChange = (index, event) => {
        event.preventDefault();
        event.persist();

        setForm((prev) => {
        return prev.map((item, i) => {
            if (i !== index) {
            return item;
            }

            return {
            ...item,
            [event.target.name]: event.target.value,

            errors: {
                ...item.errors,
                [event.target.name]:
                event.target.value.length > 0
                    ? null
                    : [event.target.name] + " Is required",
            },
            };
        });
        });
    };

    const handleRemoveField = (e, index) => {
        e.preventDefault();

        setForm((prev) => prev.filter((item) => item !== prev[index]));
    };
    return (
        <>
            {/* <Navbar2/> */}
            <div className="p-5">
                <div className="container col-12 col-md-9 mt-5 p-5 bg-white form_bg">
                    <h3>Create the Assignment</h3>
                    {/* {JSON.stringify(form)} */}
                    <form>
                        
                        <div className="row justify-content-center align-content-center mb-3">
                            <div className="col-md-5"> 
                                <input type="text" placeholder="Title" className="form_bg mt-4" onChange={(e)=>setTitle(e.target.value)} name="title" value={title} style={{outline: "none", padding: "8px", borderRadius: "20px"}}></input>
                            </div>
                        </div>
                        {form.map((item, index) => (
                            <div className="row mt-3" key={`item-${index}`}>
                                <button
                                        className="offset-10 col-1 mb-3 btn"
                                        onClick={(e) => handleRemoveField(e, index)}
                                        style={{textAlign:"right"}}
                                    >
                                    <ImCross />
                                </button>
                                <div className="row justify-content-center align-content-center mb-3">
                                    <div className="col-12 col-md-5">
                                        <input
                                        type="number"
                                        className={
                                            item.errors.Points
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Points"
                                        placeholder="Points"
                                        value={item.Points}
                                        onChange={(e) => onChange(index, e)}
                                        />

                                        {item.errors.Points && (
                                        <div className="invalid-feedback">{item.errors.Points}</div>
                                        )}

                                    </div>
                                </div>

                                <div className="row justify-content-center align-content-center mb-3">
                                    <div className="col-md-10">
                                        <input
                                        type="text"
                                        className={
                                            item.errors.Question
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Question"
                                        placeholder="Question"
                                        value={item.Question}
                                        onChange={(e) => onChange(index, e)}
                                        />
                        
                                        {item.errors.Question && (
                                        <div className="invalid-feedback">{item.errors.Question}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row justify-content-center align-content-center mb-md-3">
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input
                                        type="text"
                                        className={
                                            item.errors.Option1
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Option1"
                                        placeholder="Option1"
                                        value={item.Option1}
                                        onChange={(e) => onChange(index, e)}
                                        />
                        
                                        {item.errors.Option1 && (
                                        <div className="invalid-feedback">{item.errors.Option1}</div>
                                        )}
                                    </div>
                                
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input
                                        type="text"
                                        className={
                                            item.errors.Option2
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Option2"
                                        placeholder="Option2"
                                        value={item.Option2}
                                        onChange={(e) => onChange(index, e)}
                                        />
                        
                                        {item.errors.Option2 && (
                                        <div className="invalid-feedback">{item.errors.Option2}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row justify-content-center align-content-center mb-md-3">
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input
                                        type="text"
                                        className={
                                            item.errors.Option3
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Option3"
                                        placeholder="Option3"
                                        value={item.Option3}
                                        onChange={(e) => onChange(index, e)}
                                        />
                        
                                        {item.errors.Option3 && (
                                        <div className="invalid-feedback">{item.errors.Option3}</div>
                                        )}
                                    </div>
                                
                                    <div className="col-12 col-md-5 mb-3 mb-md-0">
                                        <input
                                        type="text"
                                        className={
                                            item.errors.Option4
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Option4"
                                        placeholder="Option4"
                                        value={item.Option4}
                                        onChange={(e) => onChange(index, e)}
                                        />
                        
                                        {item.errors.Option4 && (
                                        <div className="invalid-feedback">{item.errors.Option4}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row justify-content-center align-content-center mb-3">
                                    <div className="col-12 col-md-5 p-2">                            
                                        <select name="Correct" value={item.Correct} onChange={(e)=> onChange(index,e)} className={
                                                item.errors.Correct
                                                ? "form-control  is-invalid form_bg custom-select"
                                                : "form-control form_bg custom-select"
                                            }>
                                            <option value={Option}>Select the Correct Option</option>
                                            <option value={item.Option1}>{item.Option1}</option>
                                            <option value={item.Option2}>{item.Option2}</option>
                                            <option value={item.Option3}>{item.Option3}</option>
                                            <option value={item.Option4}>{item.Option4}</option>
                                        </select>
                                        {item.errors.Correct && (
                                        <div className="invalid-feedback">{item.errors.Correct}</div>
                                        )}
                                    </div>
                                        {/* <input
                                        type="text"
                                        className={
                                            item.errors.Correct
                                            ? "form-control  is-invalid form_bg"
                                            : "form-control form_bg"
                                        }
                                        name="Correct"
                                        placeholder="Correct Answer"
                                        value={item.Correct}
                                        onChange={(e) => onChange(index,e)}
                                        /> */}
                                </div>
                            </div>
                        ))}
                
                        <button className="btn btn-outline-dark mt-2 form_bg" onClick={handleAddLink}>
                            Add another question
                        </button>
                    </form>
                    <div className="row justify-content-center align-content-center mb-3 mt-3">
                        <div className="col-12 col-md-5">
                            <input
                            type="date"
                            className={"form-control form_bg"}
                            name="Deadline"
                            placeholder="Deadline"
                            value={dealine}
                            onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={submitHandler} className="btn btn-outline-success mt-2 form_bg">
                        Post the Assignment
                    </button>
                    <p className="mt-3 danger">{err}</p>
                </div>
            </div>
        </>
    )
}

export default CreateAssignment
