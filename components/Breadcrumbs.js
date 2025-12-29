import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumb-wrap" aria-label="Breadcrumb">
      <ul className="breadcrumb-ui">
        {items.map((item, index) => (
          <li key={index} className={item.active ? "active" : ""}>
            
            {item.href ? (
              <Link href={item.href}>
                {item.icon && <span className="icon"> {item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <>
                {item.icon && <span className="icon">{item.icon}</span>}
                {item.label}
              </>
            )}

            {index < items.length - 1 && (
              <>
              <span className="separator"> › </span> 
              </>
              
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
