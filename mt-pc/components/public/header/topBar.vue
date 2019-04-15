<template>
    <el-row class="m-header">
        <el-col :span="4">
            <Geo />
        </el-col>
        <el-col :span="3">
            <user />
        </el-col>
        <el-col :span="17">
            <Nav /> 
        </el-col>
    </el-row>
</template>

<script>
import Geo from "./geo.vue"
import User from "./user.vue"
import Nav from "./nav.vue"
export default {
    components:{
        Geo,
        User,
        Nav
    }
}
</script>


