import { motion } from 'framer-motion';
import { GraduationCap, Laptop, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../lib/motionVariants';

export default function AudienceSplitCards() {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp}>
        <GlassCard className="h-full border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/30 text-emerald-400 mb-4">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-slate-100 mb-2">School — Matric / CBSE / ICSE / NCERT</h3>
          <p className="text-slate-400 mb-6">
            Maths, Physics, Chemistry, Computer Science and more — with individual care, fast track exam prep, and home tuitions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/school">Explore School Programs</Button>
            <Link to="/contact" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm">
              Book Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <GlassCard className="h-full border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 mb-4">
            <Laptop className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-slate-100 mb-2">BE / Diploma / Arts & Science</h3>
          <p className="text-slate-400 mb-6">
            Mechanical Sciences, Electronics, Computer Sciences — with video lectures, semester coaching, and project consultancy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/engineering" variant="secondary">Explore Engineering</Button>
            <Link to="/projects" className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
