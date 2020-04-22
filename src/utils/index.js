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

// 删除json id
const removeJsonId = (data) => {
    const rollremove = (source) => {
        Object.keys(source).map(item => {
            if (item === 'id') delete source[item]
            if (Array.isArray(source[item])) {
                source[item].map(sub => rollremove(sub))
            } else {
                if (typeof source[item] === 'object') rollremove(source[item])
            }
        })
    }
    rollremove(data)
    return data
}

module.exports = {
    renderTagChildren,
    removeJsonId
}