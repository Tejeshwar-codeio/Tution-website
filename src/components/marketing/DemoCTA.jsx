import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import GradientBlob from '../ui/GradientBlob';
import { fadeInUp, viewportOnce } from '../../lib/motionVariants';

export default function DemoCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <GradientBlob className="w-full h-full bg-indigo-600/30 inset-0" />
      <Container>
        <motion.div
          className="glass rounded-3xl p-10 md:p-16 text-center shadow-glow border-indigo-500/20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Experience a Free Live Class Before Enrollment
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            See our teaching style, meet your mentor, and discover how we turn learning into measurable results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact">Book Free Demo</Button>
            <Button to="/contact" variant="outline">Talk to a Mentor</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
