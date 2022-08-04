const userMockData = {
  username: 'admin',
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
};

export default [
  {
    url: '/api/user/getUser',
    timeout: 1000,
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: userMockData
      };
    }
  }
];
