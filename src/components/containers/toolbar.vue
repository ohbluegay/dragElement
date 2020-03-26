<template>
    <div class="toolbar" @drop="dropElem" @dragover="allowDrag">
        <template v-for="(item, index) in componentArray">
            <mouseevent :item="item" :key="index">
                <component :is="item.tag" :id="item.id" />
            </mouseevent>
        </template>
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
    .toolbar {
        width: 100%;
        min-height: 60px;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 10px;
        border: 1px dashed #ddd;
    }
</style>