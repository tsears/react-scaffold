import * as React from 'react'
import * as styles from './Footer.m.css'

const currentYear = new Date().getFullYear()

export const Footer = () => (
  <div className={styles.footer}>tchat &copy;{currentYear} Tom Sears</div>
)
