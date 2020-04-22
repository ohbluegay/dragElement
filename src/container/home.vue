<template>
   <div class="dragHome">
       <el-row>
           <el-col :span="6">
              <sidebar />
           </el-col>
           <el-col :span="18">
               <el_content id="content_0" />
               <el-row>
                   <el-button type="primary" @click="saveJson">保存</el-button>
               </el-row>
           </el-col>
       </el-row>
   </div>
</template>

<script>
import sidebar from 'components/sideBar'
import content from 'components/content'
import { getJson, setJson } from 'utils/api'
import { removeJsonId } from 'utils'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            source: state => state.source
        })
    },
    components: {
        sidebar,
        el_content: content
    },
    methods: {
        saveJson() {
            setJson(removeJsonId(this.source)).then((res) => {
                console.log(res)
            })
        }
    },
    created() {
        getJson().then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }
}
</script>

<style lang="less" scoped>

</style>