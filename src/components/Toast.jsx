import Prototypes from 'prop-types'

const getType = (type, message) => {
    if(type == "success")
        return <div className="alert alert-success">
                    <span>{message}</span>
                </div>
    else if(type == "error")
        return <div className="alert alert-error">
                    <span>{message}</span>
                </div>
    else
        return <div className="alert alert-info">
                    <span>{message}</span>
                </div>
}

export const Toast = ({type, message}) => {
    return (
        <div className="toast toast-start">
            {getType(type, message)}
        </div>
    )
}


Toast.propTypes = {
    type: Prototypes.string,
    message: Prototypes.string,
};