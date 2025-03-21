import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl">Crafting premium fashion pieces since 2020</p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe in creating fashion that empowers individuals to express their unique style while maintaining the highest standards of quality and sustainability. Our commitment to ethical manufacturing and timeless design drives everything we do.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                description: 'We source the finest materials and work with skilled artisans to create pieces that last.'
              },
              {
                title: 'Sustainability',
                description: 'Our commitment to the environment guides our production and packaging decisions.'
              },
              {
                title: 'Innovation',
                description: 'We continuously explore new ways to bring modern design to traditional fashion.'
              }
            ].map((value) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}