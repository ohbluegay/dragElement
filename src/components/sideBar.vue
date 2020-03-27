<template>
    <div class="elementChoose">
        <el-alert
            title="可选组件"
            type="success"
            :closable="false" />
        <el-row>
            <el-col :span="12" v-for="(item, index) in dragData" :key="index">
                <div draggable="true" class="content" @dragstart="drag" :data-component="item.component" :data-type="item.type"><i :class="item.icon"></i></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dragData: [
                {
                    icon: 'el-icon-s-grid',
                    component: 'container',
                    type: 'container',
                    name: '组件容器'
                },{
                    icon: 'el-icon-menu',
                    component: 'toolbar',
                    type: 'container',
                    name: '操作容器'
                },
                {
                    icon: 'el-icon-edit',
                    component: 'elbutton',
                    type: 'element',
                    name: '按钮'
                }, {
                    icon: 'el-icon-date',
                    component: 'datepicker',
                    type: 'element',
                    name: '日历'
                }, {
                    icon: 'el-icon-s-management',
                    component: 'elselect',
                    type: 'element',
                    name: '选择器'
                }
            ]
        }
    },
    methods: {
        drag(e) {
            e.dataTransfer.setData('data', JSON.stringify({
                component: e.target.dataset.component,
                type: e.target.dataset.type
            }))
        }
    }
}
</script>

<style lang="less" scoped>
    .elementChoose {
        border: 1px solid #ddd;
        padding: 10px 5px;
    }
    .content {
        margin: 5px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 160, 220);
        cursor: move;
    }
</style>