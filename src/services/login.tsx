import myRequest from "../utils/request";

// 登录
export async function checkLogin(loginInfo: any) {
  return myRequest.post({
    url: "/admin/checkLogin",
    data: loginInfo,
    withCredentials: true,
  });
}
