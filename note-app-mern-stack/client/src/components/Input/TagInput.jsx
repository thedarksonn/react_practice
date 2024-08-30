import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Fixed typo: e.target.value
    };

    const addNewTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="d-flex align-items-center gap-1">
                {tags?.length > 0 &&
                    tags.map((tag, index) => (
                        <div key={index} className="input-group-text" style={{ fontSize: '12px' }}>
                            # {tag}
                            <button type="button" className="btn btn-sm text-danger" onClick={() => handleRemoveTag(tag)}>
                                <MdClose size={15} />
                            </button>
                        </div>
                    ))}
            </div>

            <div className="d-flex align-items-center gap-2 mt-3">
                <input
                    type="text"
                    className="form-control p-2"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={addNewTag} // Corrected onClick handler
                >
                    <MdAdd size={22} />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
