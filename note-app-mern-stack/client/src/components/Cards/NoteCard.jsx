import React from 'react'
import moment from 'moment'

import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'

import './notes.css'
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <>

            <div className="col-md-4 single-note-item">
                <div className="card">
                    <div className="card-body">
                        <span className="side-stick bg-primary"></span>

                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="note-title  mb-0">{title}</h5>
                                <p className="note-date font-italic text-muted">{moment(date).format('Do MMM YYYY')}</p>
                            </div>
                            <MdOutlinePushPin
                                className={`cursor-pointer ${isPinned ? 'text-primary' : 'text-dark'}`}
                                onClick={onPinNote}
                            />
                        </div>

                        <div className="note-content">
                            <p className="note-inner-content text-muted">{content?.slice(0, 60)}</p>
                        </div>

                        <div className="d-flex  justify-content-between align-items-center">

                            <div className="tags">
                                <span className="text-primary"> {tags.map((item) => `#${item} `)} </span>
                            </div>

                            <div className=''>
                                <span type="button" className="me-2 btn btn-sm" onClick={onEdit}><MdCreate /> </span>
                                <span type="button" className="me-2 btn btn-sm" onClick={onDelete}><MdDelete /></span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>



        </>
    )
}

export default NoteCard