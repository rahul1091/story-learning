"use client";
import { useState } from 'react';
import { storyblokEditable } from '@storyblok/react';

export default function FrequentlyAskedQuestion({ blok }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = blok.ques_ans?.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-16 min-h-160">
      <h1 className="text-cyan-900 text-center text-4xl font-bold mb-8 md:text-5xl xl:text-6xl">
        {blok.heading}
      </h1>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs && filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-lg p-6 text-left text-cyan-900 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </button>
                
                {/* Smooth Height Container */}
                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500 italic">
            No matches found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}