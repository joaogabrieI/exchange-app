import styles from './Button.module.css'

function Button({
  variant = 'primary',
  icon: Icon,
  iconSize = 16,
  fullWidth = false,
  className = '',
  children,
  ...buttonProps
}) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ].join(' ')

  return (
    <button type="button" className={classes} {...buttonProps}>
      {Icon && <Icon size={iconSize} aria-hidden="true" />}
      {children}
    </button>
  )
}

export default Button
