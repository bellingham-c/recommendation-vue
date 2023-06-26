<template>
  <div>
    <img src="../../assets/img/regBack.jpg" alt="">
    <div style="position: absolute;top: 10px;left: 10px;">
      <router-link style="text-decoration: none;" to="/">
        <el-button type="primary">返回登录</el-button>
      </router-link>
    </div>
    <div class="register-form">
      <form>
        <p>欢迎加入我们</p>
        <el-input style="width: 80%;height: 60px; margin-left: 10%;font-size: 25px; margin-top: 10px"
                  v-model="form.email" placeholder="电子邮箱"/>
        <el-input style="width: 50%;height: 60px; margin-left: 10%;font-size: 25px; margin-top: 10px"
                  v-model="MailCode" placeholder="验证码"/>
        <el-button @click="SendMailCode" style="width: 20%;height: 60px; margin-left: 10%;font-size: 25px; margin-top: 10px">获取验证码
        </el-button>
        <el-input type="password" style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                  v-model="form.password" placeholder="密码"/>
        <el-input type="password" style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                  v-model="checkPWD" placeholder="确认密码"/>
        <el-form-item style="width: 80%;height: 60px; font-size: 25px; margin-left: 10%;margin-top: 10px"
                      label="您的身份">
          <el-radio-group v-model="identify">
            <el-radio label="商家"/>
            <el-radio label="网红"/>
          </el-radio-group>
        </el-form-item>
        <el-alert
            v-show="!isSame"
            style="width: 80%;height: 40px; margin-left: 10%;font-size: 25px; margin-top: 10px"
            type="error"
            :description=errMsg
            show-icon
        />
        <el-alert
            v-show="!isMailLegal"
            style="width: 80%;height: 40px; margin-left: 10%;font-size: 25px; margin-top: 10px"
            type="error"
            description="邮箱不合法"
            show-icon
        />
        <el-button @click="onSubmit()" style="width: 80%;height: 60px;margin-left: 10%;margin-top: 10px" type="primary">
          注册
        </el-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {computed} from "vue";
import ERequest from '../../request/ERequest'
import CRequest from '../../request/CRequest'
import router from "@/router";
import {ElMessage} from "element-plus";

const isSame = computed(() => {
  if (form.password !== checkPWD.value) {
    SetErrMsg("两次密码不一致")
    return false
  }
  return form.password === checkPWD.value;
})

// do not use same name with ref
const form = reactive({
  email: '',
  password: '',
})

const errMsg = ref("")

const MailCode = ref("")

const checkPWD = ref("")
const identify = ref("")

// 验证邮箱是否合法
// const reg_tel = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const reg_tel = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isMailLegal = computed(() => {
  if (form.email!==""){
    return  reg_tel.test(form.email)
  }
  return true
})


// 设置错误信息
const SetErrMsg = (msg) => {
  errMsg.value = msg
}

// 提交注册信息
const onSubmit = () => {
  const params = new FormData()
  params.append("email", form.email)
  params.append("password", form.password)
  params.append("mail_code", MailCode.value)
  if (identify.value === '商家') {
    ERequest.post('/register', params).then((res) => {
      if (res.data.code === 200) {
        Success("注册成功")
        router.push('/')
      } else {
        Fail("注册失败")
      }
    }).catch((err) => {
      Fail(err.response.data.msg)
    })
  } else {
    CRequest.post('/register', params).then((res) => {
      console.log(6)
      if (res.data.code === 200) {
        Success("注册成功")
        router.push('/')
      } else {
        Fail("注册失败")
      }
    }).catch((err) => {
      Fail(err.response.data.msg)
    })
  }
}

const SendMailCode=()=>{
  if (form.email===""){
    Fail("请输入邮箱")
  }else {
    const params=new FormData()
    params.append("email",form.email)
    CRequest.post("/send/mail/code",params).then((res)=>{
      if (res.data.code===200){
        Success("验证码发送成功")
      }
    }).catch((err)=>{
      Fail(err.response.data.msg)
    })
  }
}

const Success = (msg) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}
const Fail = (msg) => {
  ElMessage.error(msg)
}
</script>

<style scoped>
svg {
  width: 25px;
  height: 25px;
  margin-top: 7px;
}

.is-legal {
  position: absolute;
  top: 38%;
  color: red;
  display: flex;
  align-items: center;
}

.is-legal span {
  margin-top: 1px;
  color: red;
  font-size: 20px;
}

p {
  font-size: 30px;
  text-align: center;
  color: black;
}

form {
  width: 80%;
  height: 50%;
  margin-left: 10%;
}

.register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 700px;
  border-radius: 20px;
  background-color: rgb(246, 246, 246, 0.6);
}

img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  z-index: -1;
}
</style>
