#在 interface 里面，定义接口，在页面中
import { getBedList } from '@/api/interface.ts'; 使用接口
在代码里面 const getBed = async () => {
const params = {
current: current,
pageSize: pageSize,
search: bedSer,
};
const data = await getBedList(params);
setList(data.data);
setTotal(data.total.total);
};
这样使用
