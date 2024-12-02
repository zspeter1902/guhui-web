import request from '@/utils/request'
// 获取新闻列表
export function getNewsList(params) {
  return request({
    url: '/portal/center/news/list',
    method: 'get',
    params
  })
}

// 获取活动
export function getActivityList(data) {
  return request({
    url: '/park/exercise/center/list',
    method: 'get',
    params: {
      ...data
      // type: '1',
      // isHistory: '0',
      // cancelHttp: true
    }
  })
}

export function getActivityListHistory(page) {
  return request({
    url: '/park/exercise/center/list',
    method: 'get',
    params: {
      type: '1',
      isHistory: '1',
      ...page,
      cancelHttp: true
    }
  })
}
export function getActivityDetail(id) {
  return request({
    url: `/park/exercise/center/info/${id}`,
    method: 'get'
  })
}
// 培训活动报名
export function signUpActivity(actId, otherData) {
  return request({
    url: `/portal/exercisesignup/center/save`,
    method: 'post',
    data: {
      actId,
      ...otherData
    }
  })
}
// 验证签到
export function checkSignInActivity(actId, signInId) {
  return request({
    url: `/portal/exercisesignup/center/signInCheck`,
    method: 'post',
    data: {
      signInId,
      actId
    }
  })
}
// 活动签到
export function signInActivity(data) {
  return request({
    url: `/portal/exercisesignup/center/signIn`,
    method: 'post',
    data: {
      ...data
    }
  })
}
// 活动报名信息
export function getSignUpInfo(params) {
  return request({
    url: `/portal/exercisesignup/list`,
    method: 'get',
    params
  })
}
// 活动报名信息
export function getSignUpInfoHistory(actId, page) {
  return request({
    url: `/portal/exercisesignup/center/info/${actId}`,
    method: 'get',
    params: {
      ...page
    }
  })
}
// 活动报名信息
// 填报调查问卷
export function addQuestionnaire(data) {
  return request({
    url: `/portal/exercisesignup/center/questionnaire`,
    method: 'post',
    data: {
      ...data
    }
  })
}
// 填报调查问卷（无签到）
export function addQuestionnaireNoSign(data) {
  return request({
    url: `/portal/exercisesignup/center/questionnaire1`,
    method: 'post',
    data: {
      ...data
    }
  })
}
// 活动答题竞赛
export function getActivityTest(id) {
  return request({
    url: `/portal/exercisequestion/infoByActId/${id}`,
    method: 'get'
  })
}
// 试卷查询
export function getTest(id) {
  return request({
    url: `/portal/exercisequestion/info/${id}`,
    method: 'get'
  })
}
// 开始答题
export function startActivityTest(data) {
  return request({
    url: `/portal/questionanswertotal/save`,
    method: 'post',
    data
  })
}
export function changeActivityTest(data) {
  return request({
    url: `/portal/questionanswertotal/update`,
    method: 'post',
    data
  })
}
// 获取答题状态信息
export function getActivityTestProgress(data) {
  return request({
    url: `/portal/questionanswertotal/list`,
    method: 'post',
    data
  })
}
// 题目提交答案
export function submitQuestionAnswer(data) {
  return request({
    url: `/portal/questionanswer/save`,
    method: 'post',
    data
  })
}
// 试卷答题结果集
export function getQuestionAnswerResults(examinId) {
  return request({
    url: `/portal/questionanswer/selfAnswer`,
    method: 'get',
    params: {
      examinId
    }
  })
}
// 临时接口，删除活动试卷汇总
export function removeQuestionAnswer(ids) {
  return request({
    url: `/portal/questionanswer/delete`,
    method: 'post',
    data: JSON.stringify(ids)
  })
}
// 试卷排名
export function getQuestionRank(params) {
  return request({
    url: `/portal/questionanswer/totalSpeeds`,
    method: 'get',
    params
  })
}
// 人才引进
export function getJobList(params) {
  return request({
    url: `/portal/recruit/center/list`,
    method: 'get',
    params
  })
}
// 职业详情
export function getJobDetail(id) {
  return request({
    url: `/portal/recruit/center/info/${id}`,
    method: 'get'
  })
}
// 立即投递
export function sendResume(data) {
  return request({
    url: `/thirdparty/center/delivery`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
