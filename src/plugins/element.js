import {
  ElButton, ElContainer, ElHeader, ElFooter, ElMain,
  ElSelect, ElOption, ElFormItem, ElForm, ElCard,
  ElInput, ElMessage, ElLoading, ElAlert, ElProgress,
  ElCarousel, ElCarouselItem, ElBadge, ElDropdown, ElDropdownMenu,
  ElDropdownItem, ElInputNumber, ElMessageBox, ElCheckbox, ElTable,
  ElTableColumn, ElTimeline, ElTimelineItem
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/cs'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElButton)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElFooter)
  app.use(ElMain)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElFormItem)
  app.use(ElForm)
  app.use(ElCard)
  app.use(ElInput)
  app.use(ElMessage)
  app.use(ElLoading)
  app.use(ElAlert)
  app.use(ElProgress)
  app.use(ElCarousel)
  app.use(ElCarouselItem)
  app.use(ElBadge)
  app.use(ElDropdown)
  app.use(ElDropdownMenu)
  app.use(ElDropdownItem)
  app.use(ElInputNumber)
  app.use(ElMessageBox)
  app.use(ElCheckbox)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElTimeline)
  app.use(ElTimelineItem)
}
