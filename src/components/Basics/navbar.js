import React from 'react'

const Navbar = ({filterItem, menuList}) => {
  return (
    <>
    <nav className='navbar'>
            <div className="btn-group">

                {
                    menuList.map((ele)=>{
                        return (
                            
                            <>
                            <button className="btn-group__item" onClick={()=>filterItem(ele)}>{ele}</button>
                            </>
                        )
                    })
                }
                
            </div>
        </nav>
    </>
  )
}

export default Navbar