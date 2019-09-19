import Http from './http-base'

class Test {
  /**
   * 测试
   *
   * @returns
   * @memberof Test
   */
  getData () {
    let http = new Http()
    http.path = '/test'
    return http.get()
  }
}
export default new Test()