<template>
    <div class="content" @drop="dropElem" @dragover="allowDrag">
        <template v-for="(item, index) in source.children">
            <mouseevent :item="item" :key="index">
                <component :is="item.tag" :id="item.id" />
            </mouseevent>
        </template>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import mouseEvent from 'components/mouseEvent'
export default {
    props: {
        id: {
            type: String,
            default: 'parent'
        }
    },
    computed: {
        ...mapState({
            source: state => state.source
        })
    },
    methods: {
        dropElem(e) {
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
    .content {
        width: 100%;
        min-height: 150px;
        padding: 20px;
        border: 1px solid #ddd;
    }
</style>