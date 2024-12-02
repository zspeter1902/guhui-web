<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
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

      <!-- 入驻园区 --start -->
      <!-- <el-form-item label="工单内容" prop="ordAbout">
        <el-input v-model="form.ordAbout" type="textarea" placeholder="请输入内容" />
      </el-form-item> -->
      <el-form-item label="意向项目" prop="proId">
        <el-select v-model="tempForm.proId" clearable placeholder="请选择归属项目" style="width: 100%" @change="handleChangeProject">
          <el-option
            v-for="dict in projectList"
            :key="dict.proId"
            :label="dict.proName"
            :value="dict.proId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="企业名称" prop="comName">
        <el-input v-model="tempForm.comName" placeholder="请输入企业名称" @change="handleChangeForm(tempForm.comName, 'comName')" />
      </el-form-item>
      <el-form-item label="企业编码" prop="comCode">
        <el-input v-model="tempForm.comCode" placeholder="请输入企业编码" @change="handleChangeForm(tempForm.comCode, 'comCode')" />
      </el-form-item>
      <el-form-item label="企业地址" prop="busAddr">
        <el-input v-model="tempForm.busAddr" placeholder="请输入企业地址" @change="handleChangeForm(tempForm.busAddr, 'busAddr')" />
      </el-form-item>
      <el-form-item label="企业简介" prop="busInfo">
        <el-input v-model="tempForm.busInfo" placeholder="请输入企业简介" @change="handleChangeForm(tempForm.busInfo, 'busInfo')" />
      </el-form-item>
      <el-form-item label="企业规模" prop="busScale">
        <el-input v-model.number="tempForm.busScale" placeholder="请输入企业规模人数" @change="handleChangeForm(tempForm.busScale, 'busScale')">
          <template slot="append">人</template>
        </el-input>
      </el-form-item>
      <el-form-item label="需求面积" prop="busNead">
        <el-input v-model="tempForm.busNead" placeholder="请输入需求面积" @change="handleChangeForm(tempForm.busNead, 'busNead')">
          <template slot="append">m²</template>
        </el-input>
      </el-form-item>
      <!-- 停车位 --end -->
      <el-form-item label="处理备注" prop="ordInfo">
        <el-input v-model="form.ordInfo" placeholder="请输入处理备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getWork_order, addWork_order_auto, updateWork_order_auto, listProject } from '@/api/work'
import { isValidEmail, isValidPhone } from '@/utils/validate'
export default {
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
        ],
        proId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],

        comName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        busNead: [
          { required: true, message: '请输入商机需求', trigger: 'blur' }
        ],
        busScale: [
          { required: true, message: '请输入商机规模', trigger: 'blur' },
          { type: 'number', message: '商机规模是数字类型！' }
        ]

      },
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: null
      },
      // 项目列表
      projectList: []
    }
  },
  computed: {
  },
  // 组件生命周期
  created() {
    this.getProjectList()
  },

  methods: {
    handleChangeProject(value) {
      this.$set(this.form, 'proId', value)
      // this.$nextTick(() => {
      //   this.$set(this.tempForm, 'parId', this.parkingListFiltered[0].id)
      //   this.$set(this.form, 'parId', this.parkingListFiltered[0].id)
      // })
    },
    handleChangeForm(value, field) {
      this.$set(this.form, field, value)
    },
    /** 查询资源项目列表 */
    getProjectList() {
      listProject().then(response => {
        const list = response.rows?.map(item => {
          item.value = String(item.proId)
          item.label = item.proName
          item.raw = { cssClass: '', listClass: '' }
          return item
        })
        this.projectList = list
      })
    },

    open(type, ordId) {
      this.reset()
      this.visible = true
      this.form.ordType = type
      this.form.id = ordId
      this.title = '添加工单-入驻申请'
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
        userEmail: null,
        ordInfo: null
      }
      this.tempForm = {}
      this.$refs['form'].resetFields()
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const form = {
            id: null,
            ordType: null,
            ordAbout: null,
            ordSource: 'on_line',
            // imgUrl: null,
            userName: null,
            userPhone: null,
            userEmail: null,
            ordInfo: null
          }
          for (const key in form) {
            form[key] = this.form[key]
          }
          form.ordAbout = JSON.stringify(this.tempForm)
          if (this.form.id != null) {
            updateWork_order_auto(form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.visible = false
              this.$emit('refresh')
            })
          } else {
            addWork_order_auto(form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.visible = false
              this.$emit('refresh')
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-date-editor,
.el-select {
  width: 100%;
}
</style>
