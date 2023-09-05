
import Prototypes from 'prop-types'

const PageList = ({pages = 1, activePage = 1, onPageSelect}) => {

    const getPageListElement = () => {
        return Array.from({ length: pages }, (_, index) =>
        (activePage !== index + 1 ?
            <button key={index} 
                className="join-item btn btn-xs"
                onClick={() => onPageSelect(index + 1)}
                >
                {index + 1}
            </button> :
            <button key={index} className="join-item btn btn-xs btn-active">{index + 1}</button>
        ))
    }

    return (
        <div className="mt-4 flex flex-col items-center">
            <div className="join">
                {getPageListElement()}
            </div>
        </div>
    )
}

PageList.propTypes = { 
    pages: Prototypes.number,
    activePage: Prototypes.number,
    onPageSelect: Prototypes.func,
 };

export default PageList;