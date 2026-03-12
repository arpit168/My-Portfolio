import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { FiX } from 'react-icons/fi'

export default function OverlayMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className='fixed inset-0 flex items-center justify-center z-50 '>
          <button onClick={onClose} className='absolute top-6 right-6 thext-white  text-3xl' aria-label='Close Menu'>

            <FiX />
          </button>

          <ul className='space-t-6 text-center'>
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonials",
              "Contact"
            ].map((item, index) => (
              <motion.li
               key={item}
              initial={{opacity:0 , y:20}}
              animate={{delay:0.3 + index * 0.1}}
              >
                <a href={`#${item.toLowerCase()}`} 
                onClick={onClose} 
                className='text-4xl text-white font-semiBold hover:text-pink-400 transistion-colors duration-300'>
                  {item}
                </a>


              </motion.li>
            ))}

          </ul>

        </motion.div>
      )}




    </AnimatePresence>
  )
}