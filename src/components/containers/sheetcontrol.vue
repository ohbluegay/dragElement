<template>
    <div class="sheetcontrol">
        <div class="navTab">
            <div class="tabItem" :class="{'active': item.id === activeId}" v-for="item in componentArray" :key="item.id" @click="activeTab(item.id)">{{item.attrs.name}}</div>
        </div>
        <template v-for="item in componentArray">
            <div class="content" v-show="item.id === activeId" @drop="dropElem" @dragover="allowDrag" :key="item.id">
                <template v-for="(sub, index) in item.children">
                    <mouseevent :item="sub" :key="index">
                        <component :is="sub.tag" :id="sub.id" :attrs="sub.attrs" />
                    </mouseevent>
                </template>
            </div>
        </template>
        <el-dialog
            title="修改组件属性"
            :visible="id === editId"
            :show-close="false"
            width="50%">
            <el-form ref="form" :model="form" label-width="80px">
                <template v-for="(item, index) in form.options">
                    <el-form-item :label="'选项卡'+index" :key="item.id" class="selectoption">
                        <el-input v-model="item.attrs.name" placeholder="选项卡名" />
                        <el-input v-model="item.attrs.value" placeholder="选项卡值" />
                        <el-button @click="removeOption(item.id)" type="danger" icon="el-icon-delete" circle />
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button @click="addOption">添加选项卡</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetEdit">取 消</el-button>
                <el-button type="primary" @click="comfirmEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mouseEvent from 'components/mouseEvent'
import { renderTagChildren } from 'utils'
export default {
    data() {
        return {
            componentArray: [],
            activeId: '',
            form: {
                caption: '',
                options: []
            }
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
            source: state => state.source,
            editId: state => state.editId
        })
    },
    watch: {
        'source': {
            handler(val) {
                this.componentArray = renderTagChildren(this.id, val)
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        ...mapActions([
            'setJson',
            'setEditId',
            'editComponentChildren'
        ]),
        activeTab(id) {
            this.activeId = id
        },
        dropElem(e) {
            e.stopPropagation()
            e.preventDefault()
            const data = JSON.parse(e.dataTransfer.getData('data'))
            const { component, type } = data
            this.setJson({
                type,
                component,
                pId: this.activeId,
                id: `${component}_${new Date().getTime()}`
            })
        },
        allowDrag(e) {
            e.preventDefault()
        },
        comfirmEdit() {
            this.editComponentChildren({
                children: JSON.parse(JSON.stringify(this.form.options)),
                pId: this.id
            })
            this.setEditId('')
        },
        resetEdit() {
            this.form.options = JSON.parse(JSON.stringify(this.componentArray))
            this.setEditId('')
        },
        addOption() {
            const options = JSON.parse(JSON.stringify(this.form.options))
            options.push({
                tag: 'sheetitem',
                attrs: {
                    name: '',
                    value: ''
                },
                id: 'sheetitem_' + new Date().getTime(),
                children: []
            })
            this.$set(this.form, 'options', options)
        },
        removeOption(id) {
            const options = this.form.options.filter(item => item.id !== id)
            this.$set(this.form, 'options', options)
        }
    },
    components: {
        mouseevent: mouseEvent
    },
    mounted() {
        this.activeId = this.componentArray[0].id
        this.form.options = JSON.parse(JSON.stringify(this.componentArray))
    }
}
</script>

<style lang="less" scoped>
    .sheetcontrol {
        border: 1px dashed #ddd;
        position: relative;
        .navTab {
            height: 30px;
            display: flex;
            .tabItem {
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
                color: #333;
                font-size: 14px;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                background: rgba(0, 160, 220);
                cursor: pointer;
                &.active {
                    background: #fff;
                }
            }
        }
        .content {
            min-height: 150px;
        }
    }
</style>