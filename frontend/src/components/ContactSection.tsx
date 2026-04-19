import React from 'react';

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-black" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-left space-y-4">
            <p className="text-zinc-400">Ready to start your next project? Let's talk about your sound.</p>
            <div className="text-orange-500 font-medium">deVee Music Production</div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:border-orange-500 outline-none"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:border-orange-500 outline-none"
            />
            <textarea 
              placeholder="Your Message" 
              rows={4} 
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:border-orange-500 outline-none"
            ></textarea>
            <button 
              type="submit" 
              className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}