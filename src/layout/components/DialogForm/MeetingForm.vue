<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="92px">

      <!-- <el-form-item label="图片地址" prop="imgUrl">
        <el-input v-model="form.imgUrl" type="textarea" placeholder="请输入内容" />
      </el-form-item> -->
      <el-form-item label="联系人" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="userPhone">
        <el-input v-model="form.userPhone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="联系邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="请输入联系邮箱" />
      </el-form-item>
      <!-- 工单内容 ordAbout start -->
      <!-- <el-form-item label="工单内容" prop="ordAbout">
        <el-input v-model="form.ordAbout" type="textarea" placeholder="请输入内容" />
      </el-form-item> -->
      <el-form-item label="会议人数" prop="capacity">
        <el-input v-model="tempForm.capacity" placeholder="请输入会议人数" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="tempForm.price" placeholder="请输入预算价格" />
      </el-form-item>
      <el-form-item label="会议室面积" prop="proSize">
        <el-input v-model.number="tempForm.proSize" placeholder="请输入会议室面积">
          <template slot="append">㎡</template>
        </el-input>
      </el-form-item>
      <el-form-item label="音响" prop="audio">
        <el-select v-model="tempForm.audio" placeholder="请选择是否需要音响">
          <el-option
            v-for="dict in commonStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="大屏" prop="ledScreen">
        <el-select v-model="tempForm.ledScreen" placeholder="请选择是否需要大屏">
          <el-option
            v-for="dict in commonStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投影仪" prop="projector">
        <el-select v-model="tempForm.projector" placeholder="请选择是否需要投影仪">
          <el-option
            v-for="dict in commonStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="讲台" prop="podium">
        <el-select v-model="tempForm.podium" placeholder="请选择是否需要讲台">
          <el-option
            v-for="dict in commonStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- 工单内容 ordAbout end -->
      <!-- <el-form-item label="处理备注" prop="ordInfo">
        <el-input v-model="form.ordInfo" placeholder="请输入处理备注" />
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getWork_order, addWork_order_auto, updateWork_order_auto } from '@/api/work'
import { listUser } from '@/api/user'
import { getDictDetail } from '@/api/global'

import { isValidEmail, isValidPhone } from '@/utils/validate'
export default {
  dicts: ['common_status'],
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (!isValidEmail(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (value) {
        if (!isValidPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      // 遮罩层
      loading: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      visible: false,
      // 表单参数
      form: {
        ordSource: 'on_line'
      },
      tempForm: {},
      user: {},
      // 表单校验
      rules: {
        ordAbout: [
          { required: true, message: '工单内容不能为空', trigger: 'blur' }
        ],
        ordSource: [
          { required: true, message: '工单来源不能为空', trigger: 'blur' }
        ],
        // imgUrl: [
        //   { required: true, message: "图片地址不能为空", trigger: "blur" }
        // ],
        userName: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '联系邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: null
      },
      commonStatus: []
    }
  },

  methods: {
    open(type, ordId) {
      this.getDict()
      this.visible = true
      this.reset()
      this.form.ordType = type
      this.form.id = ordId
      this.title = '预订会议室'
    },
    getDict() {
      getDictDetail('common_status').then(res => {
        // console.log('字典查看', res)
        this.commonStatus = res.data
      })
    },
    // 取消按钮
    cancel() {
      this.visible = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        ordType: null,
        ordAbout: null,
        ordSource: 'on_line',
        // imgUrl: null,
        userName: null,
        userPhone: null,
        userEmail: null
      }
      this.tempForm = {}
      // this.$refs['form'].resetFields()
    },

    /** 提交按钮 */
    submitForm() {
      // this.tempForm this.form.ordAbout
      this.form.ordAbout = JSON.stringify(this.tempForm)
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWork_order_auto(this.form).then(response => {
              this.$message.success('修改成功')
              this.visible = false
              // this.$emit('refresh')
            })
          } else {
            addWork_order_auto(this.form).then(response => {
              this.$message.success('提交成功')
              this.visible = false
              // this.$emit('refresh')
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
