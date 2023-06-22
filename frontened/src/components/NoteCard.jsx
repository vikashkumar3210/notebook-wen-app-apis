import React, { useContext } from "react";
import noteContext from '../noteContext/note_Context';

const NoteCard = (props) => {
    return (
        <>

            <div className="row note_card">
                <div className="card">
                    <div className="title_tag">
                        <div className="note_wrap">
                            <h5> title: {props.title}</h5>
                            <h5>tag: {props.tag}</h5>
                        </div>
                        <p>{props.description}</p>
                    </div>
                    <span className="delete_item" onClick={() => { props.deleteitem(props.id) }}><i className="fa-sharp fa-solid fa-trash" style={{ cursor: "pointer" }}></i></span>
                </div>
            </div>
        </>
    );
}
export default NoteCard;