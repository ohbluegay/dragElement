<template>
    <div class="container" @drop="dropElem" @dragover="allowDrag">
        <el-row>
            <template v-for="(item, index) in componentArray">
                <el-col :span="item.attrs.span || 24" :key="item.id">
                    <mouseevent :item="item" :key="index">
                        <component :is="item.tag" :id="item.id" :attrs="item.attrs" />
                    </mouseevent>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mouseEvent from 'components/mouseEvent'
import { renderTagChildren } from 'utils'
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
        min-height: 150px;
        border: 1px dashed #ddd;
        padding: 10px;
        position: relative;
    }
</style>