import { DropdownProps } from '../../types';

export const Dropdown = (props: DropdownProps) => {
    const options = ['All', 'Succeeded', 'Failed'];
    const onOptionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.onFilterChange(e.target.value);
    }
    return (
        <div className="dropdown-list">
            <select onChange={e => onOptionChangeHandler(e)}>
                {options.map((option:string, index:number) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
            </select>
        </ div>
    );
};

