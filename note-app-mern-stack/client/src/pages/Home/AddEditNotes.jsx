import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';

import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({ noteData, type, onClose, getAllNotes, showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);

    const [error, setError] = useState(null)


    const addNewNote = async () => {

        try {

            const response = await axiosInstance.post('/add-note', {
                title,
                content,
                tags
            })

            if (response.data && response.data.note) {
                showToastMessage({ message: "Note Added Successfully", type: "success" });
                getAllNotes()
                onClose()
            }

        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }

    }


    const editNote = async () => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put('/edit-note/' + noteId, {
                title,
                content,
                tags
            })

            if (response.data && response.data.note) {
                // showToastMessage("Note Updated Successfully")
                showToastMessage({ message: "Note Updated Successfully", type: "success" });

                getAllNotes()
                onClose()
            }

        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }

    }



    const handleAddnote = async () => {

        if (!title) {
            setError("Please enter the title")
            return
        }

        if (!content) {
            setError("Please enter the content")
            return
        }

        setError("")

        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }

    }

    return (
        <>
            <div className="">
                <div className="d-flex justify-content-between mb-2">
                    <h1 className="modal-title fs-5"></h1>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <form>
                    <div className="">
                        <div className="input-group mb-3">
                            <div className="input-group-text"></div>
                            <input
                                type="text"
                                className="form-control p-2"
                                placeholder='title'
                                value={title}
                                onChange={({ target }) => setTitle(target.value)}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text"></span>
                            <textarea
                                className="form-control"
                                placeholder='Content'
                                rows={10}
                                value={content}
                                onChange={({ target }) => setContent(target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <TagInput
                                tags={tags}
                                setTags={setTags}
                            />
                        </div>

                    </div>

                    {error && <p className='text-danger small pb-1'>{error}</p>}

                    <div className=" ">
                        <button type="button" className="btn btn-sm btn-primary p-2" style={{ width: "100%" }} onClick={handleAddnote}>
                            {type === 'edit' ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEditNotes;
