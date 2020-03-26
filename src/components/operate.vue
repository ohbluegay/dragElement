<template>
  <div class="operate" v-if="componentId === operateId">
        <el-button-group>
            <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
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
            'deleteElem'
        ]),
        deleteComponent() {
            this.$confirm('确认删除?').then(() => {
                this.deleteElem(this.componentId)
            }).catch(() => {})
        }
    }
}
</script>

<style>

</style>