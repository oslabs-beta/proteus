import React from "react";

export const Dropdown = (props) => {
    const options = ['All', 'Succeeded', 'Failed'];
    const onOptionChangeHandler = (e) => {
      props.onFilterChange(e.target.value)
    //   console.log("User Selected Filter: ", e.target.value)
    }
    return (
        <div className="dropdown-list">
            <select onChange={onOptionChangeHandler}>
                {options.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
            </select>
        </ div>
    );
};

