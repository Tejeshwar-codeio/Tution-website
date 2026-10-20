import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import { staggerContainer, fadeInUp, viewportOnce } from '../../lib/motionVariants';

export default function CourseGrid({ items, columns = 3 }) {
  const colClass = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.div
      className={`grid gap-6 ${colClass}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={fadeInUp}>
          <Link to={item.slug ? `/courses/${item.slug}` : item.link || '#'}>
            <GlassCard className="h-full group">
              <h3 className="font-heading font-semibold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{item.description}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((t) => (
                    <Badge key={t} color="cyan">{t}</Badge>
                  ))}
                </div>
              )}
              <span className="inline-flex items-center gap-1 mt-4 text-indigo-400 text-sm">
                Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
