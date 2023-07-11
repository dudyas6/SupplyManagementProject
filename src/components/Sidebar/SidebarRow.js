import '../../styles.css';

export default function SidebarRow({ content, href, faIcon }) {
  const iconClass = `flex items-center justify-center mx-2 font-bold fa ${faIcon}`;

  return (
    <li className="w-full h-full px-2 py-3 bg-white border-b border-light-border">
      <a href={href} className="flex items-center font-sans text-sm font-bold no-underline hover:font-normal text-nav-item">
        <div className={iconClass}></div>
        <span>{content}</span>
        <span><i className="float-right p-2 fa fa-angle-right"></i></span>
      </a>
    </li>
  );
}
