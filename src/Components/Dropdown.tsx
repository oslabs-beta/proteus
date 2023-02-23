import React from "react";

export const Dropdown = (props: any) => {
    const options = ['All', 'Succeeded', 'Failed'];
    const onOptionChangeHandler = (e: any): void => {
      props.onFilterChange(e.target.value)
    }
    return (
        <div className="dropdown-list">
            <select onChange={onOptionChangeHandler}>
                {options.map((option:string, index:number) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
            </select>
        </ div>
    );
};

