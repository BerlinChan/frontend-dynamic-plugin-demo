import React from 'react'
import { useQuery } from '@apollo/client';
import Home from './components/Home'
import Manage, {GET_PLUGIN_LIST} from './components/Manage'
import './App.css';

const PLUGIN_SERVER_HOST = 'http://localhost:5000'

function App() {
  const [menuList, setMenuList] = React.useState([
    {title:'Home', component:Home},
    {title:'Manage', component:Manage},
  ])
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeMenu = React.useMemo(()=> menuList.find((item,index)=>index===activeIndex), [menuList,activeIndex])
  const { data } = useQuery(GET_PLUGIN_LIST);
  const menuListWithPlugins = React.useMemo(()=>menuList.concat(data?data.pluginList:[]), [menuList, data])

  const handleMenuChange=(index, pluginItem)=>{
    setActiveIndex(index)
    if (index > menuList.length - 1) {
      const pluginRoot = document.querySelector('.plugin-root')
      if (pluginRoot) {
        pluginRoot.innerHTML = '';
      }
      const script = document.createElement('script');
      script.src = `${PLUGIN_SERVER_HOST}/${pluginItem.id}/${pluginItem.entry}`; // fully qualified path to the loaded script
      script.async = true;
      document.body.appendChild(script);
    }
  }

  return (
    <div className="App">
      <ul className="menu">
        {menuListWithPlugins.map((item,index)=><li key={index} className={index===activeIndex?'active':''} onClick={()=>handleMenuChange(index, item)}>{item.title}</li>)}
      </ul>
      <hr/>

      {activeMenu ? <activeMenu.component/> : <div className="plugin-root"></div>}
    </div>
  );
}

export default App;
