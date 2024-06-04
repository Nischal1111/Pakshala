import React from 'react'
import { motion } from 'framer-motion'

const Menu = () => {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.17, 0.67, 0.83, 0.67] }}>
      This is menus.
    </motion.div>
  )
}

export default Menu
