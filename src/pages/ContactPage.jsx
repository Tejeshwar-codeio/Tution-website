import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import DemoBookingForm from '../components/forms/DemoBookingForm';
import FAQAccordion from '../components/forms/FAQAccordion';
import { faqs } from '../data/faqs';
import { BRAND, CONTACT } from '../lib/constants';

export default function ContactPage() {
  return (
    <>
      <Helmet><title>Contact & Book Demo — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Book Your Free Demo Class"
            subtitle="Visit us at Guduvanchery or Kelambakkam. We'll confirm your slot within 24 hours."
          />
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <DemoBookingForm />
            </div>
            <div className="space-y-4">
              {[
                { Icon: Mail, text: CONTACT.email },
                { Icon: Phone, text: CONTACT.phone },
                { Icon: MapPin, text: CONTACT.address },
              ].map(({ Icon, text }) => (
                <div key={text} className="glass rounded-xl p-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-amber-400" />
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
