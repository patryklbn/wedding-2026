'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const DIETARY_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'nut-allergy', label: 'Nut allergy' },
  { id: 'other', label: 'Other' },
] as const;

interface FormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guestCount: '1' | '2' | '';
  dietaryRequirements: string[];
  otherDietary: string;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    guestCount: '',
    dietaryRequirements: [],
    otherDietary: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.attending) {
      newErrors.attending = 'Please let us know if you can attend';
    }

    if (formData.attending === 'yes' && !formData.guestCount) {
      newErrors.guestCount = 'Please select number of guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDietaryChange = (optionId: string) => {
    setFormData((prev) => {
      const current = prev.dietaryRequirements;

      if (optionId === 'none') {
        return { ...prev, dietaryRequirements: current.includes('none') ? [] : ['none'] };
      }

      const withoutNone = current.filter((id) => id !== 'none');

      if (current.includes(optionId)) {
        return { ...prev, dietaryRequirements: withoutNone.filter((id) => id !== optionId) };
      } else {
        return { ...prev, dietaryRequirements: [...withoutNone, optionId] };
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const firestore = db();
      const submitData = {
        name: formData.name,
        email: formData.email,
        attending: formData.attending,
        guestCount: formData.attending === 'yes' ? formData.guestCount : null,
        dietaryRequirements: formData.attending === 'yes' ? formData.dietaryRequirements : [],
        otherDietary: formData.attending === 'yes' && formData.dietaryRequirements.includes('other')
          ? formData.otherDietary
          : null,
        message: formData.message,
        submittedAt: serverTimestamp(),
      };

      if (firestore) {
        await addDoc(collection(firestore, 'rsvps'), submitData);
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        attending: '',
        guestCount: '',
        dietaryRequirements: [],
        otherDietary: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAttendingFields = formData.attending === 'yes';

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-sage-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading !text-white">RSVP</h2>
        <p className="section-subheading !text-sage-200">Kindly respond by 1st October 2026</p>

        {submitStatus === 'success' ? (
          <div className="card text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-sage-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-stone-700 mb-2">Thank You!</h3>
            <p className="text-stone-600">
              Your RSVP has been received.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="input-label">
                Full Name <span className="text-rust-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'border-rust-400 focus:ring-rust-400' : ''}`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-rust-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="input-label">
                Email Address <span className="text-rust-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-rust-400 focus:ring-rust-400' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-rust-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Attending */}
            <fieldset>
              <legend className="input-label">
                Will you be attending? <span className="text-rust-500">*</span>
              </legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500"
                    aria-describedby={errors.attending ? 'attending-error' : undefined}
                  />
                  <span className="text-stone-700">Yes, I&apos;ll be there</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500"
                  />
                  <span className="text-stone-700">Sorry, I can&apos;t make it</span>
                </label>
              </div>
              {errors.attending && (
                <p id="attending-error" className="mt-1 text-sm text-rust-600" role="alert">
                  {errors.attending}
                </p>
              )}
            </fieldset>

            {/* Fields shown only when attending */}
            {showAttendingFields && (
              <>
                {/* Number of Guests */}
                <div>
                  <label htmlFor="guestCount" className="input-label">
                    Number of Guests Attending <span className="text-rust-500">*</span>
                  </label>
                  <select
                    id="guestCount"
                    name="guestCount"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.guestCount}
                    aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
                    value={formData.guestCount}
                    onChange={handleChange}
                    className={`input-field ${errors.guestCount ? 'border-rust-400 focus:ring-rust-400' : ''}`}
                  >
                    <option value="">Please select</option>
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                  </select>
                  {errors.guestCount && (
                    <p id="guestCount-error" className="mt-1 text-sm text-rust-600" role="alert">
                      {errors.guestCount}
                    </p>
                  )}
                </div>

                {/* Dietary Requirements */}
                <fieldset>
                  <legend className="input-label">Dietary Requirements</legend>
                  <p className="text-sm text-stone-500 mb-3">Select all that apply</p>
                  <div className="grid grid-cols-2 gap-2">
                    {DIETARY_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.dietaryRequirements.includes(option.id)}
                          onChange={() => handleDietaryChange(option.id)}
                          className="w-4 h-4 text-sage-600 border-stone-300 rounded focus:ring-sage-500"
                          aria-label={option.label}
                        />
                        <span className="text-stone-700 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.dietaryRequirements.includes('other') && (
                    <div className="mt-3">
                      <label htmlFor="otherDietary" className="sr-only">
                        Please specify other dietary requirements
                      </label>
                      <input
                        type="text"
                        id="otherDietary"
                        name="otherDietary"
                        value={formData.otherDietary}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Please specify..."
                      />
                    </div>
                  )}
                </fieldset>
              </>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="input-label">
                Message for the Couple
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
                placeholder="Share your well wishes (optional)"
                aria-describedby="message-hint"
              />
              <p id="message-hint" className="mt-1 text-xs text-stone-400">
                Optional
              </p>
            </div>

            {/* Error message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-rust-100 border border-rust-300 rounded-lg text-rust-700 text-sm" role="alert">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
