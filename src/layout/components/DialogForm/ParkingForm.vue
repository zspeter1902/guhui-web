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

      <!-- 停车位 --start -->
      <!-- <el-form-item label="工单内容" prop="ordAbout">
        <el-input v-model="form.ordAbout" type="textarea" placeholder="请输入内容" />
      </el-form-item> -->
      <el-form-item label="归属项目" prop="proId">
        <el-select v-model="tempForm.proId" clearable placeholder="请选择归属项目" style="width: 100%" @change="handleChangeProject">
          <el-option
            v-for="dict in projectList"
            :key="dict.proId"
            :label="dict.proName"
            :value="dict.proId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车位" prop="parId">
        <el-select v-model="tempForm.parId" clearable placeholder="请选择停车位" style="width: 100%" @change="handleChangeForm(tempForm.parId, 'parId')">
          <el-option
            v-for="dict in parkingListFiltered"
            :key="dict.id"
            :label="dict.position"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号" prop="carCode">
        <el-input v-model="tempForm.carCode" placeholder="请输入车牌号" @change="handleChangeForm(tempForm.carCode, 'carCode')" />
      </el-form-item>
      <el-form-item label="企业名称" prop="comName">
        <el-input v-model="tempForm.comName" placeholder="请输入企业名称" @change="handleChangeForm(tempForm.comName, 'comName')" />
      </el-form-item>
      <el-form-item label="企业编码" prop="comCode">
        <el-input v-model="tempForm.comCode" placeholder="请输入企业编码" @change="handleChangeForm(tempForm.comCode, 'comCode')" />
      </el-form-item>
      <el-form-item label="租金" prop="price">
        <el-input v-model.number="tempForm.price" placeholder="请输入预算租金" @change="handleChangeForm(tempForm.price, 'price')" />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="tempForm.startTime"
          clearable
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择开始时间"
          @change="handleChangeForm(tempForm.startTime, 'startTime')"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="tempForm.endTime"
          clearable
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择结束时间"
          @change="handleChangeForm(tempForm.endTime, 'endTime')"
        />
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
import { listUser, listParking } from '@/api/user'
import { isCarCode, isValidEmail, isValidPhone } from '@/utils/validate'
export default {
  data() {
    const validateEndTime = (rule, value, callback) => {
      const { startTime } = this.form
      if (!startTime) {
        return callback() // 如果开始时间没有选择，则只需要结束时间必填。
      }
      if (new Date(value) < new Date(startTime)) {
        callback(new Error('结束时间不能早于开始时间'))
      } else {
        callback() // 验证通过
      }
    }
    const validateLicensePlate = (rule, value, callback) => {
      if (value) {
        if (!isCarCode(value)) {
          callback(new Error('请输入正确的车牌号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
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
        parId: [
          { required: true, message: '请选择车位', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
          { validator: validateEndTime, trigger: 'blur' }
        ],
        carCode: [
          { required: true, message: '请输入车牌号', trigger: 'blur' },
          { validator: validateLicensePlate, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入车位租赁价格', trigger: 'blur' },
          { type: 'number', message: '价格是数字类型！' }
        ],
        comCode: [
          { required: true, message: '请输入企业编码', trigger: 'blur' }
        ],
        comName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ]

      },
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: null
      },
      // 项目列表
      projectList: [],
      parkingList: []
    }
  },
  computed: {
    parkingListFiltered({ tempForm }) {
      return this.parkingList.filter(item => {
        return tempForm.proId === item.proId
      })
    }
  },
  // 组件生命周期
  created() {
    this.getProjectList()
    this.getParkingList()
  },

  methods: {
    getParkingList() {
      listParking().then(response => {
        const list = response.rows?.map(item => {
          item.value = String(item.id)
          item.label = item.parName
          item.raw = { cssClass: '', listClass: '' }
          return item
        })
        this.parkingList = list
      })
    },
    handleChangeProject(value) {
      this.$set(this.form, 'proId', value)
      this.$nextTick(() => {
        this.$set(this.tempForm, 'parId', this.parkingListFiltered[0].id)
        this.$set(this.form, 'parId', this.parkingListFiltered[0].id)
      })
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
      this.title = '添加工单-停车位'
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
