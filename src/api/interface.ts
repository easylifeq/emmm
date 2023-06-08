import axios from 'axios'

export const getBedList = (params?: any) => {
  return axios.post('/admin/bed_list', params)
}

// 床位一览表的详情数据修改
export const getUpdateSick = (params?: any) => {
  return axios.post('/admin/updateSick', params)
}
//  床位一览表的出院
export const getOut = (params?: any) => {
  return axios.post('/admin/out', params)
}

// c床位一览表换床床位http://mht.miaodaokeji.com/list/dataList
export const getDataList = (params?: any) => {
  return axios.get('/admin/dataList', { params })
}

// NurseList  医生护士列表
export const getNurseList = (params?: any) => {
  return axios.get('/admin/NurseList', { params })
}
// 更换床位
// NurseList  医生护士列表
export const geUpdateBed = (params?: any) => {
  return axios.get('/admin/updateBed', { params })
}
// changeRecord换床记录
export const getChangeRecord = (params?: any) => {
  return axios.get('/admin/changeRecord', { params })
}
// 病房状态表
// http://mht.miaodaokeji.com/admin/sickRoom
export const getSickRoom = (params?: any) => {
  return axios.get('/admin/sickRoom', { params })
}
