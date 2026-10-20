import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { bookingsApi } from '../../lib/api';
import Button from '../ui/Button';
import { WHATSAPP } from '../../lib/constants';

const schema = z.object({
  studentName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(8, 'Valid phone required'),
  role: z.string().optional(),
  courseInterest: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export default function DemoBookingForm() {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: bookingsApi.createDemo,
    onSuccess: () => {
      setSuccess(true);
      reset();
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (success) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <h3 className="font-heading text-2xl font-bold text-emerald-400 mb-2">Demo Booked!</h3>
        <p className="text-slate-400 mb-4">We&apos;ll confirm your slot within 24 hours.</p>
        <Button href={`https://wa.me/${WHATSAPP}`} variant="secondary">
          Chat on WhatsApp
        </Button>
        <button type="button" className="block mx-auto mt-4 text-sm text-slate-500 hover:text-white" onClick={() => setSuccess(false)}>
          Book another demo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 md:p-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-400 block mb-1">Full Name *</label>
          <input {...register('studentName')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
          {errors.studentName && <p className="text-red-400 text-xs mt-1">{errors.studentName.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">Email *</label>
          <input {...register('email')} type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">Phone *</label>
          <input {...register('phone')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">I am a</label>
          <select {...register('role')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none">
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="engineering">Engineering Student</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">Course Interest</label>
          <input {...register('courseInterest')} placeholder="e.g. Class 12 PCM, MERN Stack" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
        </div>
        <div>
          <label className="text-sm text-slate-400 block mb-1">Preferred Date</label>
          <input {...register('preferredDate')} type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-400 block mb-1">Preferred Time</label>
        <input {...register('preferredTime')} placeholder="e.g. 6:00 PM IST" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none" />
      </div>
      <div>
        <label className="text-sm text-slate-400 block mb-1">Notes</label>
        <textarea {...register('notes')} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none resize-none" />
      </div>
      {mutation.isError && <p className="text-red-400 text-sm">{mutation.error.message}</p>}
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? 'Booking...' : 'Book Free Demo'}
      </Button>
    </form>
  );
}
