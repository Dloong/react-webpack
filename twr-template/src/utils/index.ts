/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import Loadable from 'react-loadable';
import Loading from '../components/loading';


export const routerLazyLoad  = (loader: any): any =>{
  return  Loadable({loader,loading: Loading});
}


