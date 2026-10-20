import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import { stats } from '../../data/stats';
import { fadeInUp, staggerContainer, viewportOnce } from '../../lib/motionVariants';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-gradient">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 border-y border-white/10 bg-slate-900/50">
      <Container>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeInUp}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-slate-400 text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
