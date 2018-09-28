const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false,
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = [...this.data.dataArray, ...dataArray]
      this.setData({
        dataArray: tempArray,
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.setData({
        total,
      })
      if (total === 0) {
        this.setData({
          noneResult: true,
        })
      }
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },
    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false,
      })
    },
    isLocked() {
      return this.data.loading === true
    },
    lock() {
      this.setData({
        loading: true,
      })
    },
    unlock() {
      this.setData({
        loading: false,
      })
    },
  },
})
export default paginationBev
