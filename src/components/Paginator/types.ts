export interface IPaginator {
	totalUsersCount:number,
	pageSize:number,
	onPageChange:(pageNumber:number)=>void,
	currentPage:number,
	portionSize?:number,
}