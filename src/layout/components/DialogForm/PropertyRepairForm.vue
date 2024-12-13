<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="联系人" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="userPhone">
        <el-input v-model="form.userPhone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="联系邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="请输入联系邮箱" />
      </el-form-item>

      <el-form-item label="图片" prop="imgUrl">
        <!-- <el-input v-model="form.imgUrl" type="textarea" placeholder="请输入内容" /> -->
        <image-upload :value="form.imgUrl" :file-size="1" path="property-repair" @input="uploadImage" />
      </el-form-item>
      <!-- 广告位 --start -->
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
      <el-form-item label="归属建筑" prop="buiId">
        <el-select v-model="tempForm.buiId" clearable placeholder="请选择归属建筑" style="width: 100%" @change="handleChangeBuilding">
          <el-option
            v-for="dict in buildListFiltered"
            :key="dict.buiId"
            :label="dict.buiName"
            :value="dict.buiId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属楼层" prop="floId">
        <el-select v-model="tempForm.floId" clearable placeholder="请选择归属楼层" style="width: 100%" @change="handleChangeForm(tempForm.floId, 'floId')">
          <el-option
            v-for="dict in floorListFiltered"
            :key="dict.floId"
            :label="dict.floName"
            :value="dict.floId"
          />
        </el-select>
      </el-form-item>
      <!-- 广告位 --end -->
      <el-form-item label="报修信息">
        <el-input v-model="tempForm.ordAbout" type="textarea" placeholder="请输入报修信息" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getWork_order, addWork_order_auto, updateWork_order_auto, listProject, listBuild } from '@/api/work'
import { listUser, listFloor } from '@/api/user'
import { isValidEmail, isValidPhone } from '@/utils/validate'
import ImageUpload from '@/components/ImageUpload'
export default {
  components: { ImageUpload },
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
        imgUrl: [
          { required: true, message: '图片地址不能为空', trigger: 'blur' }
        ],
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
          { required: true, message: '请选择所属项目', trigger: 'change' }
        ]
      },
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: null
      },
      // 项目列表
      projectList: [],
      // 建筑列表
      buildList: [],
      floorList: []
    }
  },
  computed: {
    buildListFiltered({ tempForm }) {
      return this.buildList.filter(item => {
        return tempForm.proId === item.proId
      })
    },
    floorListFiltered({ tempForm }) {
      return this.floorList.filter(item => {
        return tempForm.buiId === item.buiId
      })
    }
  },

  methods: {
    getFloorList() {
      listFloor().then(response => {
        const list = response.rows?.map(item => {
          item.value = String(item.floId)
          item.label = item.floName
          item.raw = { cssClass: '', listClass: '' }
          return item
        })
        this.floorList = list
      })
    },
    handleChangeProject(value) {
      // this.form.proId = value
      this.$set(this.form, 'proId', value)
      const firstBuilding = this.buildListFiltered[0]
      if (firstBuilding) {
        this.form.buiId = firstBuilding.buiId //
        this.tempForm.buiId = firstBuilding.buiId // 同步到临时表单
      }
      const firstFlo = this.floorListFiltered[0]
      if (firstFlo) {
        this.form.floId = firstFlo.floId //
        this.tempForm.floId = firstFlo.floId // 同步到临时表单
      }
      // 重新触发表单验证
      // this.$refs['form'].validate()
    },
    handleChangeBuilding(value) {
      this.form.buiId = value
      const firstFlo = this.floorListFiltered[0]
      if (firstFlo) {
        this.form.floId = firstFlo.floId //
        this.tempForm.floId = firstFlo.floId // 同步到临时表单
      }
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
    /** 查询建筑列表 */
    getBuildList() {
      listBuild().then(response => {
        const list = response.rows?.map(item => {
          item.value = String(item.buiId)
          item.label = item.buiName
          item.raw = { cssClass: '', listClass: '' }
          return item
        })
        this.buildList = list
      })
    },
    open(type, ordId) {
      this.getProjectList()
      this.getBuildList()
      this.getFloorList()
      this.reset()
      this.visible = true
      this.form.ordType = type
      this.form.id = ordId
      this.title = '物业报修'
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
        imgUrl: null,
        userName: null,
        userPhone: null,
        userEmail: null
      }
      // this.$refs['form'].resetFields()
    },
    uploadImage(imgStr) {
      console.log(imgStr)
      this.$set(this.form, 'imgUrl', imgStr)
    },
    /** 提交按钮 */
    submitForm() {
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
.el-date-editor,
.el-select {
  width: 100%;
}
</style>
