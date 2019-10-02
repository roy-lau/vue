<template>
    <div class="dashboard">
        <el-alert title="欢迎登陆 XX 资产管理平台，" type="success" />
        <br />
        <el-row>
            <el-col :offset="1" :span="7">
                <el-card shadow="hover" class="card-box1">
                    <i class="el-icon-menu" /> &nbsp;
                    <span>覆盖区域 </span>
                    <count-to class="list-number" :startVal='0' :endVal='8' />
                </el-card>
            </el-col>
            <el-col :offset="1" :span="7">
                <el-card shadow="hover" class="card-box2">
                    <i class="el-icon-bell" /> &nbsp;
                    <span>表数 </span>
                    <count-to class="list-number" :startVal='0' :endVal='66' />
                </el-card>
            </el-col>
            <el-col :offset="1" :span="6">
                <el-card shadow="hover" class="card-box3">
                    <i class="el-icon-document" /> &nbsp;
                    <span>数据量 </span>
                    <count-to class="list-number" :startVal='0' :endVal='893' />
                </el-card>
            </el-col>
        </el-row><br />
        <el-row>
            <el-col :offset="1" :span="22">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <h3>区域年度趋势图</h3>
                    </div>
                    <ve-line :data="chartData1"></ve-line>
                </el-card>
            </el-col>
        </el-row><br />
        <el-row>
            <el-col :offset="1" :span="7">
                <el-card shadow="hover">
                    <ve-pie :data="chartData2"></ve-pie>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="7">
                <el-card shadow="hover">
                    <ve-histogram :data="chartData2"></ve-histogram>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="6">
                <el-card shadow="hover">
                    <ve-radar :data="chartData3"></ve-radar>
                </el-card>
            </el-col>
        </el-row>
        <br />
    </div>
</template>
<script>
const VeLine = () => import('v-charts/lib/line')
const VePie = () => import('v-charts/lib/pie')
const VeHistogram = () => import('v-charts/lib/histogram')
const VeRadar = () => import('v-charts/lib/radar')
import countTo from '@/components/count-to'
export default {
    components: { VeLine, VePie, VeHistogram, VeRadar, countTo },
    data() {
        this.chartSettings = {
            dimension: ['日期'],
            metrics: ['访问用户', '下单用户', '下单率'],
            dataType: { '下单率': 'percent' }
        }
        return {
            chartData1: {
                columns: ['date', '北京', '上海', '广州'],
                rows: [
                    { 'date': '01-01', '北京': 1231, '上海': 2123, '广州': 1023 },
                    { 'date': '01-02', '北京': 1223, '上海': 6123, '广州': 4103 },
                    { 'date': '01-03', '北京': 2123, '上海': 3123, '广州': 3103 },
                    { 'date': '01-04', '北京': 4123, '上海': 3223, '广州': 8203 },
                    { 'date': '01-05', '北京': 3123, '上海': 5123, '广州': 6103 },
                    { 'date': '01-06', '北京': 7123, '上海': 5231, '广州': 6211 }
                ]
            },
            chartData2: {
                columns: ['date', '北京', '上海', '广州'],
                rows: [
                    { 'date': '01-01', '北京': 1231, '上海': 2123, '广州': 1023 },
                    { 'date': '01-02', '北京': 1223, '上海': 6123, '广州': 4103 },
                    { 'date': '01-03', '北京': 2123, '上海': 3123, '广州': 3103 },
                    { 'date': '01-04', '北京': 4123, '上海': 3223, '广州': 8203 },
                    { 'date': '01-05', '北京': 3123, '上海': 5123, '广州': 6103 },
                    { 'date': '01-06', '北京': 7123, '上海': 5231, '广州': 6211 }
                ]
            },
            chartData3: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
            }
        }
    }
}
</script>
<style lang="less">
.dashboard {
    background-color: #F0F2F5;

    .card-box1 {
        font-size: 18px;
        color: white;
        background-color: #67C23A;
    }

    .card-box2 {
        font-size: 18px;
        color: white;
        background-color: #E6A23C;
    }

    .card-box3 {
        font-size: 18px;
        color: white;
        background-color: #F56C6C;
    }
}
</style>