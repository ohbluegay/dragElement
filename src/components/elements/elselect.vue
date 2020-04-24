<template>
    <div class="select">
        <span class="caption">{{attrs.caption}}</span>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in attrs.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-dialog
            title="修改组件属性"
            :visible="id === editId"
            :show-close="false"
            width="50%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="描述">
                    <el-input v-model="form.captions" placeholder="描述" />
                </el-form-item>
                <template v-for="(item, index) in form.options">
                    <el-form-item :label="'选项'+index" :key="item.id" class="selectoption">
                        <el-input v-model="item.label" placeholder="选项名" />
                        <el-input v-model="item.value" placeholder="选项值" />
                        <el-button @click="removeOption(item.id)" type="danger" icon="el-icon-delete" circle />
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button @click="addOption">添加选项</el-button>
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
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            value: '',
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
                return {
                    caption: '',
                    options: []
                }
            }
        }
    },
    computed: {
        ...mapState({
            editId: state => state.editId
        })
    },
    methods: {
        ...mapActions([
            'setEditId',
            'editComponentAttrs'
        ]),
        comfirmEdit() {
            this.editComponentAttrs({
                attrs: this.form,
                id: this.id
            })
            this.setEditId('')
        },
        resetEdit() {
            this.form = JSON.parse(JSON.stringify(this.attrs))
            this.setEditId('')
        },
        addOption() {
            const options = JSON.parse(JSON.stringify(this.form.options))
            options.push({
                label: '',
                value: '',
                id: new Date().getTime()
            })
            this.$set(this.form, 'options', options)
        },
        removeOption(id) {
            const options = this.form.options.filter(item => item.id !== id)
            this.$set(this.form, 'options', options)
        }
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.attrs))
    }
}
</script>

<style lang="less" scoped>
    .select {
        display: flex;
        align-items: center;
        .caption {
            font-size: 16px;
            padding: 0 5px;
        }
    }
</style>
<style lang="less">
    .selectoption {
        .el-form-item__content {
            display: flex;
            input {
                width: 100px;
            }
        }
    }
</style>