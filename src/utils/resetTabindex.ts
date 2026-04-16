  // 強制將tab的tabindex都設成0
export function setTabindex() {
  setTimeout(() => {
    const tab = document.querySelectorAll('.tabCheck')
    if(tab){
      tab.forEach(item => {
        item.setAttribute('tabindex','0')
      })
    }
  }, 0)
}

  // 強制將dataTable的tabindex都設成0
  export function setDataTableindex() {
    setTimeout(() => {
      const tab = document.querySelectorAll('.dataTableRow')
      if(tab){
        tab.forEach(item => {
          item.setAttribute('tabindex','0')
        })
      }
    }, 0)
  }
