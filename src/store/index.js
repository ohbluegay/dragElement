import Vue from 'vue'
import Vuex from 'vuex'
import dragJson from 'constants/drag'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        source:{
            id: 'content_0',
            tag: 'content',
            children: [],
            attrs: {
                name: 'ctright',
                padding: '0',
                borderSides: '8'
            }
        },
        operateId: '',
        editId: ''
    },
    mutations: {
        // data: { pId: 要插入的父dom id, component: 要插入的dom元素, id: 当前组件id, type: 当前组件的类型，是容器组件or功能组件 }
        SET_JSON(state, data) {
            // 获取当前组件对应的tag JSON
            const tagJson = JSON.parse(JSON.stringify(dragJson[data.type][data.component]))
            tagJson.id = data.id
            const rollmap = (source) => {
                if (source.id === data.pId) {
                    source.children.push(tagJson)
                } else {
                    source.children.map(item => {
                        if (item.hasOwnProperty('id') && data.pId === item.id) {
                            item.children.push(tagJson)
                        } else {
                            if (item.hasOwnProperty('children')) rollmap(item)
                        }
                    })
                }
                return source
            }
            state.source = rollmap(state.source)
        },
        // 删除组件
        DELETE_ELEM(state, id) {
            const rollmap = (source) => {
                source.children.map((item, index) => {
                    if (item.hasOwnProperty('id') && item.id === id) {
                        source.children.splice(index, 1)
                    } else {
                        if (item.hasOwnProperty('children')) rollmap(item)
                    }
                })
                return source
            }
            state.source = rollmap(state.source)
        },
        // 设置被操作的组件id
        SET_OPERATE_ID(state, id) {
            state.operateId = id
        },
        // 设置当前编辑的组件id
        SET_EDIT_ID(state, id) {
            state.editId = id
        },
        // 编辑组件属性值
        EDIT_COMPONENT_ATTRS(state, data) {
            const { attrs, id } = data
            const rollmap = (source) => {
                source.children.map(item => {
                    if (item.hasOwnProperty('id') && item.id === id) {
                        item.attrs = attrs
                    } else {
                        if (item.hasOwnProperty('children')) rollmap(item)
                    }
                })
                return source
            }
            state.source = rollmap(state.source)
        },
        // 修改组件子节点
        EDIT_COMPONENT_CHILDREN(state, data) {
            const rollmap = (source) => {
                if (source.id === data.pId) {
                    source.children = data.children
                } else {
                    source.children.map(item => {
                        if (item.hasOwnProperty('id') && data.pId === item.id) {
                            item.children = data.children
                        } else {
                            if (item.hasOwnProperty('children')) rollmap(item)
                        }
                    })
                }
                return source
            }
            state.source = rollmap(state.source)
        }
    },
    actions: {
        // 添加组件
        setJson({ commit }, data) {
            commit('SET_JSON', data)
        },
        // 删除组件
        deleteElem({ commit }, id) {
            commit('DELETE_ELEM', id)
        },
        // 操作组件
        setOperateId({ commit }, id) {
            commit('SET_OPERATE_ID', id)
        },
        // 设置修改的组件id
        setEditId({ commit }, id) {
            commit('SET_EDIT_ID', id)
        },
        // 修改组件属性
        editComponentAttrs({ commit }, data) {
            commit('EDIT_COMPONENT_ATTRS', data)
        },
        // 修改组件子节点
        editComponentChildren({ commit }, data) {
            commit('EDIT_COMPONENT_CHILDREN', data)
        }
    }
})