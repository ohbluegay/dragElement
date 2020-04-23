<template>
    <div class="elementChoose">
        <div class="componentType">
            <el-alert
            title="容器组件"
            type="success"
            :closable="false" />
            <el-row>
                <el-col :span="12" v-for="(item, index) in containerComponent" :key="index">
                    <div draggable="true" class="content" @dragstart="drag" :data-component="item.component" :data-type="item.type">{{item.name}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="componentType">
            <el-alert
            title="功能组件"
            type="success"
            :closable="false" />
            <el-row>
                <el-col :span="12" v-for="(item, index) in operateComponnet" :key="index">
                    <div draggable="true" class="content" @dragstart="drag" :data-component="item.component" :data-type="item.type">{{item.name}}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            containerComponent: [
                {
                    component: 'container',
                    type: 'container',
                    name: '组件容器'
                },{
                    component: 'toolbar',
                    type: 'container',
                    name: '操作容器'
                }, {
                    component: 'container3_1',
                    type: 'container',
                    name: '栅格3_1'
                }, {
                    component: 'container3_2',
                    type: 'container',
                    name: '栅格3_2'
                }, {
                    component: 'container2_1',
                    type: 'container',
                    name: '栅格2_1'
                }, {
                    component: 'sheetcontrol',
                    type: 'container',
                    name: '选项卡'
                }
            ],
            operateComponnet: [
                {
                    component: 'elbutton',
                    type: 'element',
                    name: '按钮'
                }, {
                    component: 'datepicker',
                    type: 'element',
                    name: '日历'
                }, {
                    component: 'elselect',
                    type: 'element',
                    name: '选择器'
                }, {
                    component: 'chart',
                    type: 'element',
                    name: '折线图'
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
        color: #fff;
        font-size: 12px;
        cursor: move;
    }
    .componentType {
        margin-bottom: 20px;
    }
</style>