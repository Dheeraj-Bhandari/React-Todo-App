import React,{ useState } from 'react'
import "./style.css"
import menu from './menuApi'
import Menucard from './Menucard'
import Navbar from './navbar'
const uniqueList = [...new Set(menu.map((ele)=>{
    return ele.category
})),"all"
];

const Resturent = () => {

    const [menuData, setmenuData] = useState(menu);
    const [menuList, setMenuList] = useState(uniqueList);
    const filterItem = (cat) =>{
        const updatedList = menu.filter((ele)=>{
            return ele.category===cat;
        })
        if(cat==="all") return setmenuData(menu);
        else return setmenuData(updatedList);

        

    }
    return (
        <>
        <Navbar filterItem={filterItem} menuList={menuList}/>
        <Menucard menuData={menuData}/>
        </>
    )
}

export default Resturent