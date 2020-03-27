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
                <el-form-item label="属性">
                    <el-input v-model="form.attrs"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setEditId('')">取 消</el-button>
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
                attrs: JSON.stringify(this.attrs)
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
            const attrs = JSON.parse(this.form.attrs)
            this.editComponentAttrs({
                attrs,
                id: this.id
            })
            this.setEditId('')
        }
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