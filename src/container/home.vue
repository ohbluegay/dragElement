<template>
   <div class="dragHome">
       <el-row>
           <el-col :span="6">
              <sidebar />
           </el-col>
           <el-col :span="18">
               <el_content id="content_0" />
               <div class="operate"><el-button type="primary" @click="saveJson">保存</el-button></div>
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
            const data = removeJsonId(JSON.parse(JSON.stringify(this.source)))
            setJson(data).then((res) => {
                console.log(data)
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
.operate {
    display: flex;
    padding-top: 20px;
    justify-content: flex-end;
}
</style>