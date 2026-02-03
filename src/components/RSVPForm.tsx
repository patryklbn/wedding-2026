'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '@/lib/LanguageContext';
import { isEveningOnly } from '@/lib/siteVersion';

interface FormData {
  name: string;
  email: string;
  numberOfGuests: '' | '1' | '2' | '3' | '4';
  additionalNames: string;
  invitationType: '' | 'day' | 'evening';
  attending: '' | 'yes' | 'no';
  dietary: string;
  toastDrink: '' | 'alcoholic' | 'non-alcoholic';
  message: string;
}

type ErrorKey = keyof FormData;

export default function RSVPForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    numberOfGuests: '',
    additionalNames: '',
    invitationType: isEveningOnly ? 'evening' : '',
    attending: '',
    dietary: '',
    toastDrink: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (): boolean => {
    const e: Partial<Record<ErrorKey, string>> = {};

    if (!formData.name.trim()) e.name = t('rsvp.nameRequired');
    if (!formData.email.trim()) e.email = t('rsvp.emailRequired');
    else if (!validateEmail(formData.email)) e.email = t('rsvp.emailInvalid');
    if (!formData.numberOfGuests) e.numberOfGuests = t('rsvp.guestsRequired');
    if (Number(formData.numberOfGuests) > 1 && !formData.additionalNames.trim()) e.additionalNames = t('rsvp.additionalNamesRequired');
    if (!isEveningOnly && !formData.invitationType) e.invitationType = t('rsvp.invitationRequired');
    if (!formData.attending) e.attending = t('rsvp.attendingRequired');
    if (!isEveningOnly && formData.attending === 'yes' && formData.invitationType === 'day') {
      if (!formData.dietary.trim()) e.dietary = t('rsvp.dietaryRequired');
      if (!formData.toastDrink) e.toastDrink = t('rsvp.toastRequired');
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as ErrorKey]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'rsvps'), {
        name: formData.name,
        email: formData.email,
        numberOfGuests: formData.numberOfGuests,
        additionalNames: Number(formData.numberOfGuests) > 1 ? formData.additionalNames : null,
        invitationType: isEveningOnly ? 'evening' : formData.invitationType,
        attending: formData.attending,
        dietary: !isEveningOnly && formData.attending === 'yes' && formData.invitationType === 'day' ? formData.dietary : null,
        toastDrink: !isEveningOnly && formData.attending === 'yes' && formData.invitationType === 'day' ? formData.toastDrink : null,
        message: formData.message,
        submittedAt: serverTimestamp(),
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', numberOfGuests: '', additionalNames: '', invitationType: isEveningOnly ? 'evening' : '', attending: '', dietary: '', toastDrink: '', message: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDayFields = !isEveningOnly && formData.attending === 'yes' && formData.invitationType === 'day';
  const showAdditionalNames = Number(formData.numberOfGuests) > 1;

  const fieldError = (key: ErrorKey) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1 text-sm text-rust-600" role="alert">{errors[key]}</p>
    ) : null;

  const errorClass = (key: ErrorKey) => errors[key] ? 'border-rust-400 focus:ring-rust-400' : '';

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-sage-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading !text-white">{t('rsvp.heading')}</h2>
        <p className="section-subheading !text-sage-200">{t('rsvp.subtitle')}</p>

        {submitStatus === 'success' ? (
          <div className="card text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-sage-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-stone-700 mb-2">{t('rsvp.thankYou')}</h3>
            <p className="text-stone-600">{t('rsvp.received')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-6" noValidate>
            {/* Full Name(s) */}
            <div>
              <label htmlFor="name" className="input-label">{t('rsvp.fullName')} <span className="text-rust-500">*</span></label>
              <input type="text" id="name" name="name" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} value={formData.name} onChange={handleChange} className={`input-field ${errorClass('name')}`} placeholder={t('rsvp.fullNamePlaceholder')} />
              {fieldError('name')}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="input-label">{t('rsvp.email')} <span className="text-rust-500">*</span></label>
              <input type="email" id="email" name="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} value={formData.email} onChange={handleChange} className={`input-field ${errorClass('email')}`} placeholder={t('rsvp.emailPlaceholder')} />
              {fieldError('email')}
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="numberOfGuests" className="input-label">{t('rsvp.numberOfGuests')} <span className="text-rust-500">*</span></label>
              <select id="numberOfGuests" name="numberOfGuests" required aria-required="true" aria-invalid={!!errors.numberOfGuests} aria-describedby={errors.numberOfGuests ? 'numberOfGuests-error' : undefined} value={formData.numberOfGuests} onChange={handleChange} className={`input-field ${errorClass('numberOfGuests')}`}>
                <option value="">{t('rsvp.guestsSelect')}</option>
                <option value="1">1 {t('rsvp.guest')}</option>
                <option value="2">2 {t('rsvp.guests')}</option>
                <option value="3">3 {t('rsvp.guests')}</option>
                <option value="4">4 {t('rsvp.guests')}</option>
              </select>
              {fieldError('numberOfGuests')}
            </div>

            {/* Additional Guest Names */}
            <div className={`grid transition-all duration-300 ease-in-out ${showAdditionalNames ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pt-0">
                  <label htmlFor="additionalNames" className="input-label">{t('rsvp.additionalNames')} <span className="text-rust-500">*</span></label>
                  <input type="text" id="additionalNames" name="additionalNames" aria-required={showAdditionalNames} aria-invalid={!!errors.additionalNames} aria-describedby={errors.additionalNames ? 'additionalNames-error' : undefined} value={formData.additionalNames} onChange={handleChange} className={`input-field ${errorClass('additionalNames')}`} placeholder={t('rsvp.additionalNamesPlaceholder')} />
                  {fieldError('additionalNames')}
                </div>
              </div>
            </div>

            {/* Invitation Type -- hidden for evening-only version */}
            {!isEveningOnly && (
              <fieldset>
                <legend className="input-label">{t('rsvp.invitationType')} <span className="text-rust-500">*</span></legend>
                <div className="mt-2 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                    <input type="radio" name="invitationType" value="day" checked={formData.invitationType === 'day'} onChange={handleChange} className="w-5 h-5 mt-0.5 text-sage-600 border-stone-300 focus:ring-sage-500" aria-describedby={errors.invitationType ? 'invitationType-error' : undefined} />
                    <span className="text-stone-700 text-sm">{t('rsvp.dayGuest')}</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                    <input type="radio" name="invitationType" value="evening" checked={formData.invitationType === 'evening'} onChange={handleChange} className="w-5 h-5 mt-0.5 text-sage-600 border-stone-300 focus:ring-sage-500" />
                    <span className="text-stone-700 text-sm">{t('rsvp.eveningGuest')}</span>
                  </label>
                </div>
                {fieldError('invitationType')}
              </fieldset>
            )}

            {/* Attending */}
            <fieldset>
              <legend className="input-label">{t('rsvp.attending')} <span className="text-rust-500">*</span></legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                  <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500" aria-describedby={errors.attending ? 'attending-error' : undefined} />
                  <span className="text-stone-700">{t('rsvp.attendingYes')}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                  <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500" />
                  <span className="text-stone-700">{t('rsvp.attendingNo')}</span>
                </label>
              </div>
              {fieldError('attending')}
            </fieldset>

            {/* Day Guest Conditional Fields -- never shown for evening-only version */}
            {!isEveningOnly && (
              <div className={`grid transition-all duration-300 ease-in-out ${showDayFields ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden space-y-6">
                  {/* Dietary */}
                  <div>
                    <label htmlFor="dietary" className="input-label">{t('rsvp.dietary')} <span className="text-rust-500">*</span></label>
                    <textarea id="dietary" name="dietary" aria-required={showDayFields} aria-invalid={!!errors.dietary} aria-describedby={errors.dietary ? 'dietary-error' : undefined} value={formData.dietary} onChange={handleChange} rows={3} className={`input-field resize-none ${errorClass('dietary')}`} placeholder={t('rsvp.dietaryPlaceholder')} />
                    {fieldError('dietary')}
                  </div>

                  {/* Toast Drink */}
                  <fieldset>
                    <legend className="input-label">{t('rsvp.toastDrink')} <span className="text-rust-500">*</span></legend>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                        <input type="radio" name="toastDrink" value="alcoholic" checked={formData.toastDrink === 'alcoholic'} onChange={handleChange} className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500" aria-describedby={errors.toastDrink ? 'toastDrink-error' : undefined} />
                        <span className="text-stone-700">{t('rsvp.alcoholic')}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-stone-50 transition-colors">
                        <input type="radio" name="toastDrink" value="non-alcoholic" checked={formData.toastDrink === 'non-alcoholic'} onChange={handleChange} className="w-5 h-5 text-sage-600 border-stone-300 focus:ring-sage-500" />
                        <span className="text-stone-700">{t('rsvp.nonAlcoholic')}</span>
                      </label>
                    </div>
                    {fieldError('toastDrink')}
                  </fieldset>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="input-label">{t('rsvp.message')}</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} className="input-field resize-none" placeholder={t('rsvp.messagePlaceholder')} aria-describedby="message-hint" />
              <p id="message-hint" className="mt-1 text-xs text-stone-400">{t('rsvp.optional')}</p>
            </div>

            {submitStatus === 'error' && (
              <div className="p-4 bg-rust-100 border border-rust-300 rounded-lg text-rust-700 text-sm" role="alert">
                {t('rsvp.errorSubmit')}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed" aria-busy={isSubmitting}>
              {isSubmitting ? t('rsvp.sending') : t('rsvp.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
