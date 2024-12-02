<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      class="info-form"
      :model="form"
      :rules="rules"
      label-width="108px"
      :label-position="mobile ? 'top' : 'right'"
    >
      <el-row type="flex" :gutter="30" class="flex-wrap">
        <el-col :sm="12" :xs="24">
          <el-form-item label="海外仓名称" prop="wareName">
            <el-input v-model="form.wareName" placeholder="请输入海外仓名称" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="24">
          <el-form-item label="建设形式" prop="buildForm">
            <el-select
              v-model="form.buildForm"
              placeholder="请选择建设形式"
              filterable
              size="small"
              clearable
              class="filter-item"
            >
              <el-option
                v-for="item of buildType"
                :key="item.id"
                :value="item.dictCode"
                :label="item.dictName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="地理位置" prop="geographicPosition">
            <el-input
              v-model="form.geographicPosition"
              placeholder="请填写地理位置"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="中文地址" prop="addrCn">
            <el-input v-model="form.addrCn" placeholder="请输入中文地址" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="英文地址" prop="addrEn">
            <el-input v-model="form.addrEn" placeholder="请输入英文地址" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="成立时间" prop="establishTime">
            <el-date-picker
              v-model="form.establishTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="投资公司" prop="investBusi">
            <el-input v-model="form.investBusi" placeholder="请输入投资公司" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="仓库总面积" prop="allArea">
            <el-input v-model.number="form.allArea" placeholder="请输入仓库总面积">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="空仓面积" prop="emptyArea">
            <el-input v-model.number="form.emptyArea" placeholder="请输入空仓面积">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="商品出库时效" prop="exwTime">
            <el-input v-model="form.exwTime" placeholder="请输入商品出库时效" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="可存货物类型" prop="goosType">
            <el-input
              v-model="form.goosType"
              placeholder="请输入可存货物类型"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="24">
          <el-form-item label="租仓最低价格" prop="rentalPriceMin">
            <el-input
              v-model.number="form.rentalPriceMin"
              placeholder="请输入租仓最低价格"
            >
              <template slot="append">元/单位</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="租仓最高价格" prop="rentalPriceMax">
            <el-input
              v-model.number="form.rentalPriceMax"
              placeholder="请输入租仓最高价格"
            >
              <template slot="append">元/单位</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="租仓单位" prop="priceUnit">
            <el-select
              v-model="form.priceUnit"
              placeholder="请选择租仓单位"
              filterable
              size="small"
              clearable
              class="filter-item"
            >
              <el-option
                v-for="item of costStandard"
                :key="item.id"
                :value="item.dictCode"
                :label="item.dictName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="起租体积" prop="rentalVolumeMin">
            <el-input
              v-model.number="form.rentalVolumeMin"
              placeholder="请输入起租体积"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="服务最低收费" prop="servicePriceMin">
            <el-input
              v-model.number="form.servicePriceMin"
              placeholder="请输入服务最低收费"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="服务最高收费" prop="servicePriceMax">
            <el-input
              v-model.number="form.servicePriceMax"
              placeholder="请输入服务最高收费"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="服务收费说明" prop="serviceExplain">
            <el-input
              v-model="form.serviceExplain"
              placeholder="请输入服务收费说明"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24">
          <el-form-item label="仓库简介" prop="wareAbout">
            <el-input
              v-model="form.wareAbout"
              placeholder="请输入仓库简介"
              type="textarea"
              :rows="3"
              maxlength="300"
              resize="none"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item ref="wareImgUrl" label="仓库图片" prop="wareImgUrl">
            <!-- :on-remove="handleRemove" -->
            <!-- :on-preview="handlePictureCardPreview" -->
            <el-upload
              action="wareImgUrl"
              list-type="picture-card"
              :auto-upload="true"
              :headers="headers"
              :file-list="imgs"
              :before-upload="beforeUpload"
              :http-request="onUpload"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <!-- <el-upload
            action="wareImgUrl"
            :show-file-list="false"
            :auto-upload="true"
            list-type="picture-card"
            class="uploader"
            :before-upload="beforeUpload"
            :headers="headers"
            :http-request="onUpload"
          >
            <div v-if="!form.wareImgUrl" class="upload-preview">
              <i class="el-icon-upload2 uploader-icon" />
            </div>
            <div v-else>
              <el-image class="el-upload-list__item-thumbnail" :src="form.wareImgUrl" fit="contain" />
            </div>
          </el-upload> -->
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="配套服务" prop="supportService">
            <service-checkbox
              :check="form.supportService"
              @change="onSelectService($event, 'supportService')"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="内容介绍" prop="wareInfo">
            <tinymce ref="editor" v-model="form.wareInfo" :height="400" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="text-center">
        <el-button type="primary" :disabled="loading" @click="onSubmit('form')">提交</el-button>
        <!-- <p class="tip">提交后，预计两个工作日完成审核</p> -->
      </el-form-item>
    </el-form>
    <el-dialog title="预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getToken } from '@/utils/auth'
import { getDictList, uploadFile } from '@/api/global'
import ServiceCheckbox from '@/components/ServiceCheckbox'
import { addWarehouse, getWarehouseDetail, updateWarehouse } from '@/api/company'
// construction
export default {
  name: 'StorehouseRelease',
  components: { Tinymce, ServiceCheckbox },
  data() {
    return {
      loading: false,
      headers: {
        token: getToken() || '' // getToken()
      },
      dialogImageUrl: '',
      dialogVisible: false,
      imgs: [],
      form: {
        wareName: '',
        establishTime: '',
        investBusi: '',
        buildForm: '',
        geographicPosition: '',
        addrCn: null,
        addrEn: '',
        allArea: '',
        emptyArea: '',
        exwTime: '',
        goosType: '',
        supportService: '',
        rentalPriceMin: '',
        rentalPriceMax: '',
        servicePriceMin: '',
        servicePriceMax: '',
        serviceExplain: '',
        rentalVolumeMin: '',
        priceUnit: '',
        wareAbout: '',
        wareInfo: '',
        wareImgUrl: ''
      },
      rules: {
        wareName: [
          { required: true, message: '请填写海外仓名称！', trigger: 'blur' },
          { max: 50, message: '50个字符以内！', trigger: ['change', 'blur'] }
        ],
        geographicPosition: [
          { required: true, message: '请填写地理位置！', trigger: 'blur' }
        ],
        addrCn: [
          {
            required: true,
            message: '请填写详细地址(中文)！',
            trigger: 'blur'
          }
        ],
        allArea: [
          { required: true, message: '请填写仓库总面积！', trigger: 'blur' },
          { type: 'number', message: '面积是数字类型！' }
        ],
        emptyArea: [
          { required: true, message: '请填写空仓面积！', trigger: 'blur' },
          { type: 'number', message: '面积是数字类型！' }
        ],
        exwTime: [
          { required: true, message: '请填写出库时效！', trigger: 'blur' }
        ],
        priceUnit: [
          { required: true, message: '请选择仓库单位', trigger: 'change' }
        ],
        goosType: [
          { required: true, message: '请填写货物类型！', trigger: 'blur' }
        ],
        wareImgUrl: [
          { required: true, message: '请上传仓库图片！', trigger: 'change' }
        ],
        rentalPriceMin: [
          {
            required: true,
            message: '请填写租仓最低价格！',
            trigger: 'change'
          },
          { type: 'number', message: '价格是数字类型', trigger: 'change' }
        ],
        rentalPriceMax: [
          {
            required: true,
            message: '请填写租仓最高价格！',
            trigger: 'change'
          },
          { type: 'number', message: '价格是数字类型', trigger: 'change' }
        ],
        servicePriceMin: [
          { required: true, message: '请填写服务最低收费！', trigger: 'blur' },
          { type: 'number', message: '费用是数字类型', trigger: 'change' }
        ],
        servicePriceMax: [
          { required: true, message: '请填写服务最高收费！', trigger: 'blur' },
          { type: 'number', message: '费用是数字类型', trigger: 'change' }
        ],
        supportService: [
          { required: true, message: '请选择配套服务！', trigger: 'blur' }
        ],
        rentalVolumeMin: [
          {
            required: true,
            message: '请填写起租体积！',
            trigger: ['blur', 'change']
          },
          { type: 'number', message: '体积是数字类型', trigger: 'change' }
        ]
      },
      buildType: [],
      costStandard: [],
      currency: []
    }
  },
  computed: {
    mobile({ $store }) {
      return $store.getters.device === 'mobile'
    },
    id({ $route }) {
      return $route.params.id
    }
  },
  created() {
    if (this.id) {
      this.getInfo(this.id)
    }
    this.getDict()
  },
  methods: {
    getInfo(id) {
      getWarehouseDetail(id).then(res => {
        this.form = res.crossWare
        res.crossWare.wareImgUrl.split(',').forEach((item, index) => {
          this.imgs.push({
            name: index,
            url: item
          })
        })
      })
    },
    // 获取基本Map
    getDict() {
      // 建设形式
      const getBuildType = getDictList('construction')
      // 收费标准
      const getCostStandard = getDictList('cost_standard')
      // 币制
      const getCurrency = getDictList('currency')

      Promise.all([getBuildType, getCostStandard, getCurrency]).then((res) => {
        this.buildType = res[0].list[0].children
        this.costStandard = res[1].list[0].children
        this.currency = res[2].list[0].children
      })
    },
    onUpload(res) {
      const form = new FormData()
      form.append('file', res.file)
      uploadFile('test', form).then((result) => {
        this.imgs.push({
          name: res.file.uid,
          url: result.url
        })
        this.$set(this.form, res.action, this.imgs.map(item => item.url).join(','))
        this.$message.success('上传成功！')
        this.$refs[res.action].clearValidate()
      })
    },
    beforeUpload(file) {
      const isIMG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isIMG && isLt1M
    },
    handleRemove(file, fileList) {
      const i = this.imgs.findIndex(item => item.name === file.uid)
      this.imgs.splice(i, 1)
      this.$set(this.form, 'wareImgUrl', this.imgs.map(item => item.url).join(','))
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSelectService(value, type) {
      this.$set(this.form, type, value.join(','))
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(valid)
          if (this.id) {
            this.onEdit()
          } else {
            this.onAdd()
          }
        }
      })
    },
    onAdd() {
      addWarehouse(this.form).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '创建成功！',
          onClose: () => {
            this.$router.push('/my/info/warehouse')
          }
        })
      }).catch(() => {
        this.loading = false
      })
    },
    onEdit() {
      updateWarehouse(this.form).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '更新成功！',
          onClose: () => {
            this.$router.push('/my/info/warehouse')
          }
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.info-form {
  width: 92%;
  padding: 20px 0;
  .el-select,
  .el-cascader {
    width: 100%;
  }
  .dot,
  .tip {
    margin-top: 10px;
    color: $redColor;
  }
  .el-button {
    width: 180px;
    margin-top: 20px;
  }
  .el-date-editor {
    width: 100%;
  }
  ::v-deep {
    .el-form-item__label {
      font-weight: normal;
    }
    .el-input {
      font-size: 14px;
      &__inner {
        border-radius: 2px;
        color: #666;
        vertical-align: middle;
        &::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
    .el-textarea__inner {
      line-height: 30px;
      border-radius: 2px;
      color: #666;
    }
    .el-upload {
      position: relative;
      width: 96px;
      height: 96px;
      border: 1px dashed rgba(0, 0, 0, 0.25);
      border-radius: 2px;
      line-height: 94px;
      overflow: hidden;
      vertical-align: top;
      &:hover {
        border-color: $mainColor;
      }
      .uploader-icon {
        font-size: 24px;
      }
      .el-upload-list__item-thumbnail {
        width: 94px;
        height: 94px;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 96px;
      height: 96px;
    }
  }
}

@media only screen and (max-width: 767px) {
  .info-form {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
