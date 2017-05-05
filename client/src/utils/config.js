let PREFIX = ''    // 此处自定义request域名

if (PREFIX === '') {
  // 如果没有自定义 默认为当前域名
  PREFIX = '//' + window.location.host
}

export default PREFIX
