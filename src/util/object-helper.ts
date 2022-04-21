export const updateObjectInArray = (items: UserType[], itemsId: number, objPropName: string, newObjectProps: object) => {
	return items.map((u:UserType) => {
		// @ts-ignore
		if (u[objPropName] == itemsId) {
			return {...u, ...newObjectProps}
		}
		return u
	})
}
