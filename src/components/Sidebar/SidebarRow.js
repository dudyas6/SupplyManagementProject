import '../../styles.css'

export default function SidebarRow({content, href, faIcon})
{   
    faIcon = `float-left mx-2 font-bold fas ${faIcon}`
    return (
        <li className="w-full h-full px-2 py-3 bg-white border-b border-light-border">
        <a href={href} className="font-sans text-sm font-bold no-underline hover:font-normal text-nav-item">
          <i className={faIcon}></i>
          {content}
          <span><i className="float-right fas fa-angle-right"></i></span>
        </a>
      </li>
    )
}
