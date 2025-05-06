import React from 'react';
import { useState, useEffect } from 'react';
import { format, isBefore, isToday, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const NewsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Hardcoded news data
  const newsData = {
    '2023-11-15': [
      { 
        id: 1, 
        title: 'Global Summit Addresses Climate Change', 
        excerpt: 'World leaders agree on historic emissions reduction targets.',
        category: 'World',
        image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      { 
        id: 2, 
        title: 'Tech Giant Unveils Revolutionary AI', 
        excerpt: 'New artificial intelligence understands complex human emotions.',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1677442135136-760c813cd6d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ],
    '2023-11-14': [
      { 
        id: 3, 
        title: 'Breakthrough in Renewable Energy', 
        excerpt: 'New battery technology could solve intermittency issues.',
        category: 'Science',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ]
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (day) => {
    if (isBefore(day, new Date()) || isToday(day)) {
      setIsAnimating(true);
      setSelectedDate(day);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const changeMonth = (increment) => {
    setCurrentMonth(addMonths(currentMonth, increment));
  };

  // Set today as default selected date
  useEffect(() => {
    setSelectedDate(new Date());
    
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
      {/* Full-width Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <div className="mx-auto px-4 py-6 max-w-7xl">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              NewsChronicle
            </h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                Sign In
              </button>
            </div>
          </div>
          <nav className="mt-6">
            <ul className="flex space-x-6 text-lg">
              {['Home', 'World', 'Tech', 'Sports', 'Health', 'Business'].map((item) => (
                <li 
                  key={item}
                  className="relative group pb-2 cursor-pointer"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Section - 70% width */}
          <div className="w-full lg:max-w-[70%]">
            <div className="rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/80">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => changeMonth(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <button 
                    onClick={() => changeMonth(1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-center font-semibold text-blue-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12"></div>
                  ))}

                  {monthDays.map(day => {
                    const isPast = isBefore(day, new Date()) && !isToday(day);
                    const isCurrent = isToday(day);
                    const hasNews = newsData[format(day, 'yyyy-MM-dd')];
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => handleDateClick(day)}
                        disabled={!isPast && !isCurrent}
                        className={`h-12 rounded-lg flex flex-col items-center justify-center text-sm transition-all duration-200
                          ${isCurrent ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-md' : ''}
                          ${isPast ? 'hover:bg-blue-100 cursor-pointer' : 'text-gray-400'}
                          ${hasNews ? 'relative after:absolute after:bottom-2 after:w-2 after:h-2 after:rounded-full after:bg-blue-500' : ''}
                          ${isSelected ? 'ring-2 ring-blue-500 scale-105 bg-blue-50' : ''}
                          ${isAnimating && isSelected ? 'animate-pulse' : ''}
                        `}
                      >
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* News Cards Section - takes remaining space */}
          <div className="w-full lg:flex-1">
            {selectedDate ? (
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    News from {format(selectedDate, 'MMMM d, yyyy')}
                  </span>
                </h2>
                <div className="space-y-6">
                  {newsData[format(selectedDate, 'yyyy-MM-dd')]?.map(news => (
                    <div 
                      key={news.id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
                          {news.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{news.title}</h3>
                        <p className="text-gray-600 mb-4">{news.excerpt}</p>
                        <button className="flex items-center text-blue-600 font-semibold group">
                          <span className="mr-2 group-hover:underline">Read full story</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )) || (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No news today</h3>
                      <p className="text-gray-500">Check other dates for news stories</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Select a date to view news</h3>
                <p className="text-gray-500">Click on any past or present date in the calendar</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Full-width Footer */}
      <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>NewsChronicle</h3>
              <p className="text-blue-100">Delivering accurate and timely news since 2023.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-blue-100">
                {['About Us', 'Careers', 'Contact', 'Advertise'].map(item => (
                  <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Subscribe</h4>
              <p className="text-blue-100 mb-4">Get daily news updates straight to your inbox</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-3 rounded-l-lg text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-white text-blue-600 px-4 py-3 rounded-r-lg font-semibold hover:bg-blue-50 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-500 mt-8 pt-8 text-center text-blue-200">
            <p>© 2023 NewsChronicle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsCalendar;