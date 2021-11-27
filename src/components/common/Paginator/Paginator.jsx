import React, {useState} from 'react';
import s from './Paginator.module.css'
import cn from 'classnames'

const Paginator = ({
                       totalUsersCount,
                       pageSize,
                       onPageChange,
                       currentPage,
                       portionSize = 10
                   }) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let page = [];
    for (let i = 1; i <= pageCount; i++) {
        page.push(i)
    }
    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}

            {page
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => (
                    <span className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)} key={p} onClick={(e) => {
                        onPageChange(p)
                    }}>{p}</span>
                ))}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
        </div>
    );
};

export default Paginator;

