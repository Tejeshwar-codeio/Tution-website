import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../../lib/motionVariants';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <motion.div
      className={`max-w-3xl mb-12 ${alignClass}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">{eyebrow}</span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-100 mt-2">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-4 text-lg">{subtitle}</p>}
    </motion.div>
  );
}
