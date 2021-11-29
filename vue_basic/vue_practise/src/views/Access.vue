<template>
  <div>
    <el-card>
      <el-table border :data="tableData">
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
    export default {
        name :'Access',
        data() {
          return {
            tableData:[
          {
            name : '皇帝',
            path: 'court',
            level:1
          },
          {
            name : '丞相',
            path: 'palace',
            level:2
          },{
            name : '官吏',
            path: 'house',
            level:3
          },{
            name : '平民',
            path: 'wood',
            level:4,
          },{
            name : '乞丐',
            path: 'street',
            level:5,
          },
        ],
          }
        },
    }
</script>

<style>

</style>