import React from 'react'
import styles from './Footer.m.css'

const currentYear = new Date().getFullYear()

export default () => (
  <div className={styles.footer}>tchat &copy;{currentYear} Tom Sears</div>
)
