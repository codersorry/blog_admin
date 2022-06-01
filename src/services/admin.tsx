import myRequest from "../utils/request";

// 获取文章类别信息
export async function getTypeInfo() {
  return myRequest.get({
    url: "/admin/getTypeInfo",
    withCredentials: true,
  });
}

// 添加文章
export async function addArticle(data: any) {
  return myRequest.post({
    url: "/admin/addArticle",
    withCredentials: true,
    data,
  });
}

// 修改文章
export async function updateArticle(data: any) {
  return myRequest.post({
    url: "/admin/updateArticle",
    withCredentials: true,
    data,
  });
}

// 获得文章列表
export async function getArticleList() {
  return myRequest.get({
    url: "/admin/getArticleList",
    withCredentials: true,
  });
}

// 删除文章
export async function delArticle(id: any) {
  return myRequest.get({
    url: `/admin/delArticle/${id}`,
    withCredentials: true,
  });
}

// 通过id获取文章详情内容
export async function getArticleById(id: any) {
  return myRequest.get({
    url: `/admin/getArticleById/${id}`,
    withCredentials: true,
  });
}
