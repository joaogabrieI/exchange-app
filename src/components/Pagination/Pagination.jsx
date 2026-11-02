import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { getPageItems } from '../../utils/pagination'
import styles from './Pagination.module.css'

function Pagination({ page, totalPages, onPageChange }) {
  const { t } = useLanguage()

  return (
    <nav className={styles.pagination} aria-label={t.table.pagination}>
      <button
        type="button"
        className={styles.button}
        aria-label={t.table.previousPage}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === null ? (
          <span key={`gap-${index}`} className={styles.gap} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={item === page ? styles.current : styles.button}
            aria-label={t.table.page(item)}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.button}
        aria-label={t.table.nextPage}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Pagination
