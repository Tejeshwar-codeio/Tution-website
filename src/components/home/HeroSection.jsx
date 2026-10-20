import { motion } from 'framer-motion';
import { BookOpen, Cpu, Atom, Code } from 'lucide-react';
import Container from '../ui/Container';
import GradientBlob from '../ui/GradientBlob';
import AudienceSplitCards from './AudienceSplitCards';
import { fadeInUp, float, staggerContainer } from '../../lib/motionVariants';
import { BRAND, LOCATIONS } from '../../lib/constants';

const icons = [
  { Icon: BookOpen, className: 'top-20 left-[10%] text-amber-400' },
  { Icon: Atom, className: 'top-32 right-[15%] text-emerald-400' },
  { Icon: Code, className: 'bottom-40 left-[20%] text-amber-300' },
  { Icon: Cpu, className: 'bottom-32 right-[10%] text-emerald-300' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <GradientBlob className="w-96 h-96 bg-amber-700 -top-20 -left-20" />
      <GradientBlob className="w-80 h-80 bg-emerald-700 top-40 right-0" />

      {icons.map(({ Icon, className }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block opacity-20 ${className}`}
          variants={float}
          animate="animate"
        >
          <Icon className="h-12 w-12" />
        </motion.div>
      ))}

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient mb-3">
            {BRAND}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">
            at {LOCATIONS}
          </motion.p>
          <motion.p variants={fadeInUp} className="font-heading text-lg md:text-xl lg:text-2xl font-semibold leading-snug text-slate-300 max-w-2xl mx-auto">
            <span className="text-amber-300/90">Score Higher. Learn Smarter.</span>
            <br />
            <span className="text-slate-400 text-base md:text-lg font-medium">— School Boards to Engineering Excellence</span>
          </motion.p>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Matric, CBSE, ICSE & NCERT coaching plus BE, Diploma, and Arts & Science programmes —
            with experienced faculty, individual care, and project consultancy.
          </motion.p>
        </motion.div>
        <AudienceSplitCards />
      </Container>
    </section>
  );
}
