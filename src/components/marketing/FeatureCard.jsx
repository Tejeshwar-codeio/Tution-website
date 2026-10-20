import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { fadeInUp } from '../../lib/motionVariants';

export default function FeatureCard({ title, description, icon }) {
  const Icon = Icons[icon] || Icons.Sparkles;
  return (
    <motion.div variants={fadeInUp}>
      <GlassCard>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 mb-4">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-heading font-semibold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </GlassCard>
    </motion.div>
  );
}
