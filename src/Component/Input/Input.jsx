// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from "prop-types";
import './Input.css';

const Input = ({ id, label, value, type, required, placeholder, handleChange, onFocus }) => {
    return (<>
        <div className="input-div">
            { label &&
                <label className="input-label" htmlFor={id}>
                    {label}
                </label>
            }
            <input
                id={id}
                className="input-field"
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={onFocus}
            />
        </div>
    </>);
};

Input.propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
    onFocus: PropTypes.any,
};

export default Input;