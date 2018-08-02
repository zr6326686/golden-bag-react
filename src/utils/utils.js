// 下划线命名转驼峰命名
export function underline2Hump(underlineName) {
  const underlineNameArr = underlineName.split('');
  let humpName = '';
  underlineNameArr.forEach((item, index) => {
    if (item === '_' && index < underlineNameArr.length) {
      humpName += underlineNameArr[index + 1].toUpperCase();
      underlineNameArr[index + 1] = '';
    } else {
      humpName += item;
    }
  });
  return humpName;
}

export function initialUppercase(title) {
  return title[0].toUpperCase() + title.substring(1);
}

export function isLogin() {
  const cookies = document.cookie.split(';');
  for (const item of cookies) {
    if (item.split('=')[0].trim() === 'user_id') {
      return true;
    }
  }
  return false;
}
