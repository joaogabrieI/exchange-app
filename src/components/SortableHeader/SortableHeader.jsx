import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import styles from './SortableHeader.module.css'

const ARIA_SORT = { asc: 'ascending', desc: 'descending' }

// direction: null (coluna não ordenada), 'asc' ou 'desc'.
function SortableHeader({ label, direction = null, onSort, className = '' }) {
  let Icon = ArrowUpDown
  if (direction === 'asc') Icon = ArrowUp
  if (direction === 'desc') Icon = ArrowDown

  return (
    <th scope="col" className={className} aria-sort={ARIA_SORT[direction] ?? 'none'}>
      <button
        type="button"
        className={`${styles.button} ${direction ? styles.sorted : ''}`}
        onClick={onSort}
      >
        {label}
        <Icon size={14} aria-hidden="true" />
      </button>
    </th>
  )
}

export default SortableHeader
