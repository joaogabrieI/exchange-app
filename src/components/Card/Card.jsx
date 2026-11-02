import styles from './Card.module.css'

function Card({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag className={`${styles.card} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Card
