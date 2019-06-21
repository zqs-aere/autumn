export default {
  name: 'my-table-index',
  data () {
    return {}
  },
  props: {
    dataList: {
      type: [Array, Object]
    }
  },
  computed: {
    columns () {
      return (this.$slots && this.$slots.default).filter(val => {
        return val.componentOptions && val.componentOptions.tag === 'my-table-column'
      }).map(val => {
        return {
          ...val,
          props: {
            ...(val.componentOptions.propsData || {})
          }
        }
      })
    },
    list () {
      if (this.dataList instanceof Array) {
        return this.dataList
      } else {
        return this.dataList.items || []
      }
    }
  },
  methods: {
    cols (columns) {
      return columns.map(val => {
        return <col width={val.props.width} />
      })
    },
    header (h, columns) {
      return columns.map((vNode) => {
        const name = vNode.props.name

        if (vNode.data.scopedSlots && vNode.data.scopedSlots.th) {
          // scopedSlots 存在
          return <td class={`text-${vNode.props.align || 'left'}`}>
                   {vNode.data.scopedSlots.th({name})}
                 </td>
        } else {
          // prop 存在
          return <td class={`text-${vNode.props.align || 'left'}`}>{name}</td>
        }
      })
    },
    body (h, columns, item) {
      let result = columns.map(vNode => {
        if (vNode.data.scopedSlots && vNode.data.scopedSlots.default) {
          // scopedSlots 存在
          return <td class={`text-${vNode.props.align || 'left'}`}>{vNode.data.scopedSlots.default({row: item})}</td>
        } else if (vNode.props.prop) {
          // prop 存在
          return h('td', Object.assign(vNode.componentOptions, {
            class: `text-${vNode.props.align || 'left'}`
          }), [item[vNode.props.prop]])
        } else {
          // 直接返回
          return h('td', Object.assign(vNode.componentOptions, {
            class: `text-${vNode.props.align || 'left'}`
          }), vNode.componentOptions.children)
        }
      })
      return result
    },
    rowClick (item, e) {
      e.preventDefault()
      this.$emit('row-click', item)
    }
  },
  render (h) {
    const {
      cols,
      header,
      body,
      columns,
      list,
      rowClick
    } = this

    return (<div class="my-table">
              <table cellspacing="0" cellpadding="0" border="0">
                <colgroup>
                  { cols(columns) }
                </colgroup>

                <thead>
                  <tr class="flex-box space-between">
                    { header(h, columns) }
                  </tr>
                </thead>

                <tbody>
                  {
                    list.map(item => {
                      return (<tr
                                class="flex-box space-between tr-row"
                                onClick={(e) => rowClick(item, e)}>
                                {body(h, columns, item)}
                              </tr>)
                    })
                  }
                </tbody>
              </table>

              <my-pagination
                class="mg-t16"
                count={61}>
              </my-pagination>
            </div>)
  }
}
