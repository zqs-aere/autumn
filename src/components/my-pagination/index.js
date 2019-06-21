export default {
  name: 'my-pagination',
  props: {
    count: Number,
    currentPage: Number,
    pageSize: Number,
    pageArea: Array
  },
  data () {
    return {
      dataCurrentPage: 1,
      dataPageSize: 10,
      dataPageArea: [5, 10, 15, 20]
    }
  },
  computed: {
    allPages () {
      const { count, dataPageSize } = this
      return Array.apply(null, {length: Math.ceil(count / dataPageSize)})
    },
    pageList () {
      const result = []
      result[0] = this.dataCurrentPage
      result.push(this.dataCurrentPage + 1)
      result.push(this.dataCurrentPage + 2)
      result.unshift(this.dataCurrentPage - 1)
      result.unshift(this.dataCurrentPage - 2)
      return result
    }
  },
  methods: {
    setCurrentPage (page) {
      let result = {
        page
      }

      this.dataCurrentPage = page
      this.$emit('current-change', result)

      result = null
    },
    itemClick (e, val, isDisabled) {
      if (isDisabled) {
        return
      }
      this.setCurrentPage(val)
    },
    pages () {
      const { allPages, dataCurrentPage, itemClick, pageList } = this
      const length = allPages.length

      return (<ul class="ul-reset flex-box">
                {allPages.length > 1 && <li
                  onClick={(e) => itemClick(e, dataCurrentPage - 1, dataCurrentPage === 1)}
                  class={`my-pagination_item${dataCurrentPage === 1 ? ' disabled' : ''}`}>
                  {'<'}
                </li>}
                <li
                  onClick={(e) => itemClick(e, 1)}
                  class={`my-pagination_item${dataCurrentPage === 1 ? ' pagination-active' : ''}`}>
                  1
                </li>
                {
                  dataCurrentPage >= 5 && <li class="my-pagination_item">
                    ...
                  </li>
                }
                {
                  allPages.map((val, index) => {
                    if (index !== 0 && index !== length - 1) {
                      if (pageList.includes(index + 1)) {
                        return (<li
                                  onClick={(e) => itemClick(e, index + 1)}
                                  class={`my-pagination_item${dataCurrentPage === index + 1 ? ' pagination-active' : ''}`}>
                                  {index + 1}
                                </li>)
                      }
                    }
                  })
                }
                {
                  dataCurrentPage + 3 < allPages.length && <li class="my-pagination_item">
                    ...
                  </li>
                }
                {length !== 1 && <li
                  onClick={(e) => itemClick(e, length)}
                  class={`my-pagination_item${dataCurrentPage === length ? ' pagination-active' : ''}`}>
                  {length}
                </li>}
                {allPages.length > 1 && <li
                  onClick={(e) => itemClick(e, dataCurrentPage + 1, dataCurrentPage === allPages.length)}
                  class={`my-pagination_item${dataCurrentPage === allPages.length ? ' disabled' : ''}`}>
                  >
                </li>}
              </ul>)
    }
  },
  created () {
    this.currentPage && (this.dataCurrentPage = this.currentPage)
    this.pageSize && (this.dataPageSize = this.pageSize)
    this.pageArea && (this.dataPageArea = this.pageArea)
  },
  render () {
    const { pages } = this
    return (<div class="my-pagination">
              {pages()}
            </div>)
  }
}
