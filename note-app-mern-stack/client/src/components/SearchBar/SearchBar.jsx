import React from 'react'
import { LuFolderSearch } from "react-icons/lu";
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <>

            <div className="bg-danger p-1 bg-white" style={{ borderRadius: "5px" }}>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2 border-0"
                        // type="search" // if you use this. it will automatically show you the bootstrap inbuild clear icon when searching. i comment this one because of the custom close icon i have done
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={value}
                        onChange={onChange}
                    />

                    {value && (
                        <span className="d-flex align-items-center justify-content-center" style={{ borderRadius: "50%", padding: "7px" }} type="submit">
                            <IoMdClose
                                size={20}
                                onClick={onClearSearch}
                                className="text-success"
                            />
                        </span>
                    )}

                    <span className="d-flex align-items-center justify-content-center" style={{ borderRadius: "50%", padding: "7px" }} type="submit">
                        <LuFolderSearch
                            size={20}
                            onClick={handleSearch}
                            className="text-success"
                        />
                    </span>

                </form>
            </div>


        </>
    )
}

export default SearchBar