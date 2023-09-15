import Prototypes from 'prop-types'
import {  useState } from 'react';

export const DeleteButton = ({onClick}) => {

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const Icon = () => {
        return (
            <button
                onClick={ () => setDeleteConfirm(true) }
            >
                <svg
                    className="w-6 h-6 fill-none hover:text-neutral"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 11V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 11V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 7H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        )
    }

    const Confirmation = () => {
        return (
            <div className="tooltip tooltip-open tooltip-warning" data-tip="Are you sure?">
                <div>
                    <button 
                        className="btn btn-xs"
                        onClick={() => onClick()} 
                    >
                        Yes
                    </button>
                    <button 
                        className="ml-3 btn btn-xs"
                        onClick={() => setDeleteConfirm(false)} 
                    >
                        No
                    </button>
                </div>
            </div>
        )
    }

    return (deleteConfirm ?
        <div>
            <Confirmation />
        </div>
        :
        <Icon />
    )
}

DeleteButton.propTypes = { onClick: Prototypes.func };
