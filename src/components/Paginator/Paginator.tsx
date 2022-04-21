import React, { useState } from 'react';
import cn from 'classnames';

import s from './Paginator.module.css'
import { IPaginator } from "./types";

const Paginator: React.FC<IPaginator> = ({
	                                         totalUsersCount,
	                                         pageSize,
	                                         onPageChange,
	                                         currentPage,
	                                         portionSize = 10,
                                         }) => {

	const [portionNumber, setPortionNumber] = useState(1);

	const pageCount = Math.ceil(totalUsersCount / pageSize);
	let page: Array<number> = [];

	for (let i = 1; i <= pageCount; i++) {
		page.push(i)
	}

	const portionCount = Math.ceil(pageCount / portionSize);
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	const rightPortionPageNumber = portionNumber * portionSize;

	return (
		<div className={s.paginator}>
			{portionNumber > 1 &&
				<button onClick={() => {
					setPortionNumber(portionNumber - 1)
				}}>PREV</button>}
			{
				page
					.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
					.map((p) => (
						<span className={cn({
							[s.selectedPage]: currentPage === p
						}, s.pageNumber)} key={p} onClick={(e) => {
							onPageChange(p)
						}}>{p}</span>
					))
			}
			{
				portionCount > portionNumber &&
				<button onClick={() => {
					setPortionNumber(portionNumber + 1)
				}}>NEXT</button>
			}
		</div>
	);
};

export default Paginator;

