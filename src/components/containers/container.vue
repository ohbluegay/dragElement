<template>
    <el-col :span="attrs.span || 24">
        <div class="container" @drop="dropElem" @dragover="allowDrag">
            <el-row>
            <template v-for="(item, index) in componentArray">
                <mouseevent :item="item" :key="index">
                    <component :is="item.tag" :id="item.id" :attrs="item.attrs" />
                </mouseevent>
            </template>
            </el-row>
        </div>
    </el-col>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mouseEvent from 'components/mouseEvent'
import { renderTagChildren } from 'utils'
import dragJson from 'constants/drag'
export default {
    data() {
        return {
            componentArray: []
        }
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        attrs: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapState({
            source: state => state.source
        })
    },
    watch: {
        'source': {
            handler(val) {
                this.componentArray = renderTagChildren(this.id, val)
            },
            deep: true
        }
    },
    methods: {
        dropElem(e) {
            e.stopPropagation()
            e.preventDefault()
            const data = JSON.parse(e.dataTransfer.getData('data'))
            const { component, type } = data
            if (component === 'layout1_1') {
                const tagJson = JSON.parse(JSON.stringify(dragJson[data.type][data.component]))
                tagJson.children.map((item, index) => item.id = `${item.tag}_${new Date().getTime()+index}`)
            }
            this.setJson({
                type,
                component,
                pId: this.id,
                id: `${component}_${new Date().getTime()}`
            })
        },
        allowDrag(e) {
            e.preventDefault()
        },
        ...mapActions([
            'setJson'
        ])
    },
    components: {
        mouseevent: mouseEvent
    }
}
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        min-height: 150px;
        border: 1px dashed #ddd;
    }
</style>