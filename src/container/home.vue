<template>
   <div class="dragHome">
       <el-row>
           <el-col :span="6">
              <sidebar />
           </el-col>
           <el-col :span="18">
               <el_content id="content_0" />
           </el-col>
       </el-row>
   </div>
</template>

<script>
import sidebar from 'components/sideBar'
import content from 'components/content'
import { mapState } from 'vuex'
export default {
    components: {
        sidebar,
        el_content: content
    }
}
</script>

<style lang="less" scoped>

</style>