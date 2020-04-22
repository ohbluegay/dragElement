<template>
    <div class="component_content" @mouseenter="operateComponent(item.id)" @mouseleave="operateComponent('')">
        <operate :componentId="item.id" :attrs="item.attrs" />
        <slot />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import operate from 'components/operate'
export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    methods: {
        operateComponent(id) {
            this.setOperateId(id)
        },
        ...mapActions([
            'setOperateId'
        ])
    },
    components: {
        operate
    }
}
</script>

<style lang="less" scoped>
.component_content {
    position: relative;
    .operate {
        position: absolute;
        top: -40px;
        right: 0;
    }
}
</style>