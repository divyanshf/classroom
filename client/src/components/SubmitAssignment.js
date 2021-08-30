import React, { useState } from 'react'
import Navbar2 from './Navbar2'

const SubmitAssignment = () => {
    const [answer, setAnswer] = useState([]);

    const onChange = (index, event) => {
        // event.preventDefault();
        event.persist();
        setAnswer(
            {...answer,
            [event.target.name]: event.target.value,}
        );
    };
    return (
        <>
            <Navbar2 />
            <div className="p-5">
                <div className="container col-12 col-md-9 mt-5 p-5 bg-white form_bg">
                    <h3>Solve the Assignment</h3>
                    {console.log(answer)}
                    {JSON.stringify(answer)}
                    <form>
                        <div className="row justify-content-center align-content-center mb-3 mt-5">
                            <div className="col-md-10">
                                <p>Question 1</p>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-center mb-md-3">
                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio1" name="question1" value="Option 1" onChange={(e)=> onChange(0,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 1</label>
                            </div>

                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio2" name="question1" value="Option 2" onChange={(e)=> onChange(0,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 2</label>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-center mb-md-3">
                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio3" name="question1" value="Option 3" onChange={(e)=> onChange(0,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 3</label>
                            </div>

                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio4" name="question1" value="Option 4" onChange={(e)=> onChange(0,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 4</label>
                            </div>
                        </div>
                        {/* <div className="row justify-content-center align-content-center mb-3 mt-5">
                            <div className="col-md-10">
                                <p>Question 2</p>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-center mb-md-3">
                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio1" name="question2" value="Option 1" onChange={(e)=> onChange(1,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 1</label>
                            </div>

                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio2" name="question2" value="Option 2" onChange={(e)=> onChange(1,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 2</label>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-center mb-md-3">
                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio3" name="question2" value="Option 3" onChange={(e)=> onChange(1,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 3</label>
                            </div>

                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                <input type="radio" id="customRadio4" name="question2" value="Option 4" onChange={(e)=> onChange(1,e)} className="custom-control-input m-3" />
                                <label className="custom-control-label" for="customRadio1">Option 4</label>
                            </div>
                        </div> */}
                    </form>
                    <button className="col-md-2 btn btn-outline-success mt-2 form_bg">
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default SubmitAssignment
