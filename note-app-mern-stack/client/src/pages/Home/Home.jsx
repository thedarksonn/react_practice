import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import EmptyCard from '../../components/Cards/EmptyCard';
import AddEditNotes from './AddEditNotes';

import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';

import adddata from '../../assets/add.png'
import nodata from '../../assets/no.png'

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });


    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: '',
        type: 'add',
    });

    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState([])

    const [isSearch, setIsSearch] = useState()

    const navigate = useNavigate(false)

    const handleEdit = (notesDetails) => {
        setOpenAddEditModal({ isShown: true, data: notesDetails, type: 'edit' })
    }

    const showToastMessage = ({ message, type }) => {
        setShowToastMsg({
            isShown: true,
            message,
            type
        })
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ''
        })
    }

    // get user data
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user')
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {

            if (error.response.status === 401) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    // get all notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/get-all-notes')
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log("an unexpected error occurred. please try again")
        }
    }

    // delete note
    const deleteNote = async (data) => {
        const noteId = data._id

        try {

            const response = await axiosInstance.delete('/delete-note/' + noteId)

            if (response.data && !response.data.error) {
                showToastMessage({ message: "Note Deleted Successfully", type: "delete" });
                getAllNotes()
            }

        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                console.log("an unexpected error occurred. please try again")
            }
        }
    }

    // search for notes
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get('/search-notes', {
                params: { query },
            })

            if (response.data && response.data.notes) {
                setIsSearch(true)
                setAllNotes(response.data.notes)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put('/update-note-pinned/' + noteId, {
                isPinned: !noteData.isPinned,
            })

            if (response.data && response.data.note) {
                showToastMessage({ message: "Note Updated Successfully", type: "success" });
                getAllNotes()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false)
        getAllNotes()
    }



    useEffect(() => {
        getAllNotes()
        getUserInfo()
        return () => { }
    }, [])

    return (
        <>
            <Navbar
                userInfo={userInfo}
                onSearchNote={onSearchNote}
                handleClearSearch={handleClearSearch}
            />

            <div className='container py-5 bg-light rounded' style={{ marginTop: '100px' }}>

                {allNotes.length > 0 ? (
                    <div className='row p-3'>

                        {allNotes.map((item, index) => (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={item.createdOn}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => { handleEdit(item) }}
                                onDelete={() => { deleteNote(item) }}
                                onPinNote={() => { updateIsPinned(item) }}
                            />
                        ))}

                    </div>
                ) : (
                    <EmptyCard
                        imgsrc={isSearch ? nodata : adddata}
                        message={isSearch ? `Oops! No notes found matching your search!` : `Start creating your first note! Click the '+' button to jot down your thoughts, ideas, and reminders. let's get started!`}
                    />
                )}



            </div>

            <button
                className='d-flex align-items-center justify-content-center text-white bg-primary border-0'
                style={{
                    padding: '25px',
                    borderRadius: '50%',
                    fontWeight: 'bolder',
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                }}
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: 'add', data: null });
                }}
            >
                <MdAdd size={22} className='' />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {
                    setOpenAddEditModal({ isShown: false, type: 'add', data: null });
                }}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                }}
                contentLabel=''
                className='w-40 max-height-75 rounded-md p-4 mx-auto bg-light'
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: 'add', data: null });
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
