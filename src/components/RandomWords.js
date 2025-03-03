'use client';

const words = [
  'Coding itu asik!',
  'Jangan lupa ngopi dulu ☕',
  'Error itu teman, bukan musuh 😆',
  'Debugging sambil nyemil 🍕',
  'Hidup butuh breakpoints 🔍',
  'Fullstack? Backend aja udah pusing 😵',
  'Kalau capek, refresh aja dulu 🔄',
  'React, Vue, atau Svelte? Yang penting ngoding!',
  'Senyum dulu, baru push code 😊',
  'Jangan lupa commit, biar ga hilang 😆',
  'Frontend gampang? Backend lebih santai? Fullstack aja! 🤯',
  'Malam minggu? Mending refactor code 💻',
  'Kecepatan coding ditentukan oleh kecepatan debugging ⚡',
  'Fix bug sekali langsung deploy? Mustahil! 😅',
  'Biar ngoding lancar, minum dulu ☕',
  'Push tanpa pull dulu? Siap-siap konflik! 😬',
  'Ngoding sambil dengerin lo-fi 🎵',
  'Belajar bahasa baru? JavaScript lagi aja! 😂',
  'Ngoding santai, yang penting deadline aman! ⏳',
  'Test case penting, tapi lebih penting kopi ☕',
];

const gradients = [
  'bg-gradient-to-r from-purple-500 to-pink-500',
  'bg-gradient-to-r from-blue-500 to-green-500',
  'bg-gradient-to-r from-yellow-400 to-orange-500',
  'bg-gradient-to-r from-red-500 to-purple-500',
  'bg-gradient-to-r from-indigo-500 to-blue-400',
  'bg-gradient-to-r from-green-400 to-teal-500',
  'bg-gradient-to-r from-pink-500 to-red-400',
  'bg-gradient-to-r from-cyan-500 to-blue-500',
  'bg-gradient-to-r from-purple-600 to-indigo-400',
  'bg-gradient-to-r from-gray-700 to-gray-900',
  'bg-gradient-to-r from-orange-500 to-yellow-300',
  'bg-gradient-to-r from-teal-400 to-cyan-500',
  'bg-gradient-to-r from-rose-400 to-pink-500',
  'bg-gradient-to-r from-blue-700 to-purple-600',
  'bg-gradient-to-r from-lime-400 to-green-500',
  'bg-gradient-to-r from-amber-500 to-orange-600',
  'bg-gradient-to-r from-fuchsia-500 to-rose-400',
  'bg-gradient-to-r from-sky-500 to-indigo-400',
  'bg-gradient-to-r from-violet-500 to-pink-500',
  'bg-gradient-to-r from-gray-600 to-gray-800',
];

const RandomWords = () => {
  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Gradient efek di kiri & kanan */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

      <div className="w-full flex flex-col gap-5">
        {/* Baris pertama (kanan ke kiri) */}
        <div className="flex w-full overflow-hidden relative">
          <div className="flex animat-marquee">
            {[...words, ...words].map((word, index) => (
              <div
                key={`row1-${index}`}
                className={`flex-shrink-0 py-2 px-4 flex items-center justify-center rounded-xl shadow-md mx-3 text-white ${
                  gradients[index % gradients.length]
                }`}
              >
                <p className="text-md font-semibold">{word}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Baris kedua (kiri ke kanan) */}
        <div className="flex w-full overflow-hidden relative">
          <div className="flex animat-marquee-reverse mt-2">
            {[...words, ...words].map((word, index) => (
              <div
                key={`row2-${index}`}
                className={`flex-shrink-0 py-2 px-4 flex items-center justify-center rounded-xl shadow-md mx-3 text-white ${
                  gradients[index % gradients.length]
                }`}
              >
                <p className="text-md font-semibold">{word}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomWords;
