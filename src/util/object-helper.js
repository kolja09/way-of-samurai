export const updateObjectInArray = (items, itemsId, objPropName, newObjectProps) => {
   return items.map(u => {
        if (u[objPropName] === itemsId) {
            return {...u, ...newObjectProps}
        }
        return u
    })
}
