<template>
  <div class="operate" v-if="componentId === operateId">
        <el-button-group>
            <el-button type="primary" icon="el-icon-edit" circle plain @click="editAttrs"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click="deleteComponent"></el-button>
        </el-button-group>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        componentId: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            operateId: state => state.operateId
        })
    },
    methods: {
        ...mapActions([
            'deleteElem',
            'setEditId'
        ]),
        deleteComponent() {
            this.$confirm('确认删除?').then(() => {
                this.deleteElem(this.componentId)
            }).catch(() => {})
        },
        // 编辑组件属性
        editAttrs() {
            this.setEditId(this.componentId)
        }
    }
}
</script>

<style>

</style>