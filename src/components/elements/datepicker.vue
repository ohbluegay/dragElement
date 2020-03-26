<template>
    <el-date-picker
      v-model="dataValue"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
</template>

<script>
export default {
    data() {
        return {
            dataValue: ''
        }
    }
}
</script>