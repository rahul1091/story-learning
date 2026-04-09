"use client";
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import { useState } from 'react';

export default function ContactForm({ blok }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({}); // Track validation messages
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper to validate individual fields
  const validateField = (name, value, type) => {
    let error = "";
    if (!value && value !== 0) return "Required field";
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Please enter a valid email address";
    }
    if (name === 'phone' && value.length < 10) {
      error = "Phone number must be 10 digits";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    // Phone: strictly numbers only
    if (name === 'phone') {
      finalValue = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({ ...formData, [name]: finalValue });
    // Clear error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Final validation check
    const newErrors = {};
    blok.form_fields?.forEach((field) => {
      const error = validateField(field.name, formData[field.name], field.type);
      if (error) newErrors[field.name] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission
    }
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_id: "escapetravels" 
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({});
        e.target.reset();
      }
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className='contact-us-main flex flex-col items-center max-w-[1520] px-4 py-4 mx-auto xl:flex-row xl:py-10'>
      <div className='contact-us-description p-4 max-w-[800] mx-auto mb-6 xl:mb-0 xl:max-w-1/2'>
        <StoryblokServerRichText doc={blok.description} />
      </div>
      <div {...storyblokEditable(blok)} className="container max-w-[800] mx-auto min-h-96 px-4 mb-6 xl:mb-0 xl:max-w-1/2">
        {submitted && (
          <div className="bg-green-100 p-4 mb-6 border-2 border-green-700 rounded-xl text-lg text-green-800">
            {blok.message || "Thank you! Your message has been sent."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form border-2 border-solid border-black rounded-xl p-8 bg-slate-300 shadow-sm">
          {blok.form_fields?.map((field) => (
            <div key={field._uid} className="flex flex-col mb-4">
              <label className='text-xl mb-2 font-medium text-slate-800' htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`border-2 border-solid rounded-md p-2 outline-none bg-white transition-colors ${
                  errors[field.name] ? 'border-red-400 bg-red-50' : 'border-teal-900 focus:border-teal-500'
                }`}
              />
              {errors[field.name] && (
                <span className="text-red-600 text-sm mt-1 font-semibold">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          <button 
            type="submit" 
            disabled={loading}
            className="text-xl bg-teal-200 px-6 py-2 border-2 border-solid border-teal-900 rounded-xl mt-4 cursor-pointer hover:bg-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : blok.button_label}
          </button>
        </form>
      </div>
    </div>
  );
}
