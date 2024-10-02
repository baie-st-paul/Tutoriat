import React, {SetStateAction} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faX} from "@fortawesome/free-solid-svg-icons";

export type Props = {
    subjects: Array<string>
    setSubjects: SetStateAction<any | Array<string>>
}

function TeachersSubjectComponent(props: Props) {
    const [subject, setSubject] = React.useState<string>("");

    return (
        <>
            <h2>Subjects</h2>
            <div className="form-group form_container">
                <div className="icons">
                    <i onClick={() => {
                        if (subject !== "") {
                            props.setSubjects([...props.subjects, subject]);
                            setSubject("");
                        }
                    }}><FontAwesomeIcon icon={faPlus}/></i>
                </div>
                <input className="form-control m-0" type="text" placeholder="Ajout Sujet"
                       value={subject}
                       onChange={e => setSubject(e.target.value)}/>
                {
                    props.subjects.map((s, index) => {
                        return (
                            <div key={index} className="list_cases d-flex justify-content-between">
                                <div >{s}</div>
                                <div>
                                    <i onClick={() => {
                                        props.setSubjects(props.subjects.filter((_, i) => i !== index));
                                    }}><FontAwesomeIcon className="text-danger" icon={faX}/></i>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </>
    );
}

export default TeachersSubjectComponent;