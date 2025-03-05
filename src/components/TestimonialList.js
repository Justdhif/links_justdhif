'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      setTestimonials(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-300 text-center mb-4">
        Testimonials
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-gray-400 text-center">No testimonials yet.</p>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, // Tetap lanjut setelah interaksi
          }}
          pagination={{ clickable: true }}
          navigation
          className="w-full max-w-3xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div
                className="p-6 bg-gray-800 border border-gray-100 rounded-lg text-center text-gray-200 shadow-lg"
                onMouseEnter={(e) =>
                  e.target.closest('.swiper').swiper.autoplay.stop()
                }
                onMouseLeave={(e) =>
                  e.target.closest('.swiper').swiper.autoplay.start()
                }
              >
                {/* Image avatars UI */}
                <div className="flex items-center justify-center mb-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      testimonial.name
                    )}&background=random`}
                    alt={`Avatar of ${testimonial.name}`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>

                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-gray-400">{testimonial.message}</p>
                <div className="text-yellow-400 text-xl mt-2">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="text-center mt-6">
        <Link href="/testimonials">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Add Testimonial
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TestimonialList;