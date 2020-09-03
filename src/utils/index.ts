import moment from "moment"
import set from "date-fns/set"
import Loadable from 'react-loadable';
import Loading from '../components/loading/Loading';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatMoney = (val: any): unknown => {
  val = val.toString().replace(/[,.]/g, "")
  if (Number.isNaN(val * 1)) {
    return ""
  }
    return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1.")

}


export const formatRequestMoney = (val: string): string => {
  return val.replace(/[ ().Rp]/g, "")
}

export const removeComma = (val: string):string => {
  return val.replace(/\D/gi, "")
}

export const formatDate = (date: string):string => {
  moment.locale('id');
  return moment(moment(date)).format("DD MMM yyyy")
}

export const openWhatsappChat = (phoneNumber: string):void => {
  const whatsAppUrl = `https://wa.me/${phoneNumber.replace(/\+/g, "")}`
  const u = navigator.userAgent
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  isIOS ? window.open(whatsAppUrl, "_self") : window.open(whatsAppUrl)
}
export const formtDateToUTC = (date: string):string => {
  const dateTime0 = set(new Date(date), {hours:0,minutes:0, seconds:0})
  const result =  moment(dateTime0).utc().format()
  return result
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const routerLazyLoad  = (loader: any): any =>{
  return  Loadable({loader,loading: Loading});
}


