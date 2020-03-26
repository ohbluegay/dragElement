const renderTagChildren = (id, data) => {
    let components = []
    const rollMap = (source) => {
        if (source.id === id) {
            components = source.children
        } else {
            if (source.hasOwnProperty('children')) {
                source.children.map(item => {
                    if (item.id === id && item.hasOwnProperty('children')) {
                        components = item.children
                    } else {
                        if (item.hasOwnProperty('children')) rollMap(item)
                    }
                })
            }
        }
    }
    rollMap(data)
    return components
}

module.exports = {
    renderTagChildren
}