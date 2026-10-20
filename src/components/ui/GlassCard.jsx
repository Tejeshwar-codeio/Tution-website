import { motion } from 'framer-motion';
import { hoverLift } from '../../lib/motionVariants';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  const Comp = hover ? motion.div : 'div';
  const motionProps = hover ? { variants: hoverLift, initial: 'rest', whileHover: 'hover' } : {};

  return (
    <Comp
      className={`glass rounded-2xl p-6 ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  );
}
