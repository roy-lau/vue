<template>
    <div id="server-index">
        <el-row>
            <el-col :span="3">
                <left-menu />
            </el-col>
            <el-col :span="21">
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import leftMenu from "@/components/leftMenu"
export default {
    components: {
        leftMenu
    }
}
</script>