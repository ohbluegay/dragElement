import Vue from 'vue'
import Vuex from 'vuex'
import dragJSon from 'constants/drag'

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
        operateId: ''
    },
    mutations: {
        // data: { pId: 要插入的父dom id, component: 要插入的dom元素, id: 当前组件id }
        SET_JSON(state, data) {
            // 获取当前组件对应的tag JSON
            const tagJson = JSON.parse(JSON.stringify(dragJSon[data.type][data.component]))
            tagJson.id = data.id
            const rollmap = (source) => {
                if (source.id === data.pId) {
                    source.children.push(tagJson)
                } else {
                    if (source.hasOwnProperty('children')) {
                        source.children.map(item => {
                            if (item.hasOwnProperty('id') && data.pId === item.id) {
                                item.children.push(tagJson)
                            } else {
                                if (item.hasOwnProperty('children')) rollmap(item)
                            }
                        })
                    }
                }
                return source
            }
            state.source = rollmap(state.source)
        },
        // 删除组件
        DELETE_ELEM(state, id) {
            const rollmap = (source) => {
                if (source.hasOwnProperty('children')) {
                    source.children.map((item, index) => {
                        if (item.hasOwnProperty('id') && item.id === id) {
                            source.children.splice(index, 1)
                        } else {
                            if (item.hasOwnProperty('children')) rollmap(item)
                        }
                    })
                }
                return source
            }
            state.source = rollmap(state.source)
            console.log(state.source)
        },
        // 设置被操作的组件id
        SET_OPERATE_ID(state, id) {
            state.operateId = id
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
        }
    }
})