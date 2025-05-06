import React from 'react';
import { useState } from 'react';
import { format, isBefore, isToday, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const NewsWebsite = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Hardcoded news data for demonstration
  const newsData = {
    '2023-11-15': [
      { id: 1, title: 'Global Summit Addresses Climate Change Concerns', excerpt: 'World leaders gather to discuss urgent environmental policies...' },
      { id: 2, title: 'Tech Giant Unveils Revolutionary AI Assistant', excerpt: 'New artificial intelligence can understand and respond to complex human emotions...' }
    ],
    '2023-11-14': [
      { id: 3, title: 'Major Breakthrough in Renewable Energy Storage', excerpt: 'Scientists develop battery technology that could transform green energy...' },
      { id: 4, title: 'National Team Wins International Championship', excerpt: 'Historic victory after decades of preparation and training...' }
    ],
    '2023-11-10': [
      { id: 5, title: 'New Study Reveals Benefits of Mediterranean Diet', excerpt: 'Research confirms significant health improvements for participants...' }
    ]
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (day) => {
    const today = new Date();
    if (isBefore(day, today) ){
      setSelectedDate(day);
    }
  };

  const changeMonth = (increment) => {
    setCurrentDate(addDays(currentDate, increment * 30));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Daily Chronicle</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition">
                Subscribe
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition">
                Sign In
              </button>
            </div>
          </div>
          <nav className="mt-6">
            <ul className="flex space-x-6 text-lg">
              <li className="border-b-2 border-white pb-2">Home</li>
              <li className="hover:border-b-2 hover:border-white pb-2">Politics</li>
              <li className="hover:border-b-2 hover:border-white pb-2">Technology</li>
              <li className="hover:border-b-2 hover:border-white pb-2">Sports</li>
              <li className="hover:border-b-2 hover:border-white pb-2">Health</li>
              <li className="hover:border-b-2 hover:border-white pb-2">Entertainment</li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Calendar Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => changeMonth(-1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {format(currentDate, 'MMMM yyyy')}
                  </h2>
                  <button 
                    onClick={() => changeMonth(1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12"></div>
                  ))}

                  {monthDays.map(day => {
                    const isPast = isBefore(day, new Date()) && !isToday(day);
                    const isCurrent = isToday(day);
                    const hasNews = newsData[format(day, 'yyyy-MM-dd')];
                    
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => handleDateClick(day)}
                        disabled={!isPast && !isCurrent}
                        className={`h-12 rounded-lg flex flex-col items-center justify-center text-sm
                          ${isCurrent ? 'bg-blue-100 text-blue-800 font-bold' : ''}
                          ${isPast ? 'hover:bg-gray-100 cursor-pointer' : 'text-gray-400'}
                          ${hasNews ? 'relative after:absolute after:bottom-1 after:w-1 after:h-1 after:rounded-full after:bg-blue-500' : ''}
                          ${selectedDate && isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : ''}
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

          {/* News Cards Section */}
          <div className="w-full lg:w-5/12">
            {selectedDate ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  News from {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
                <div className="space-y-6">
                  {newsData[format(selectedDate, 'yyyy-MM-dd')]?.map(news => (
                    <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{news.title}</h3>
                        <p className="text-gray-600 mb-4">{news.excerpt}</p>
                        <button className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center">
                          Read more
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )) || (
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                      <p className="text-gray-500">No news articles for this date</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Select a date to view news</h3>
                <p className="text-gray-500">Click on any past or present date in the calendar to see news articles from that day</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Featured News Banner */}
      {!selectedDate && (
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id: 1, title: 'Renewable Energy Investments Reach Record High', category: 'Business' },
                { id: 2, title: 'New Space Telescope Captures Stunning Images', category: 'Science' },
                { id: 3, title: 'Historic Peace Agreement Signed After Decades', category: 'World' }
              ].map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition flex items-center">
                      Read story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Daily Chronicle</h3>
              <p className="text-gray-400">Delivering accurate and timely news since 1985.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sections</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">World</li>
                <li className="hover:text-white cursor-pointer">Politics</li>
                <li className="hover:text-white cursor-pointer">Business</li>
                <li className="hover:text-white cursor-pointer">Technology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Ethics Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Get the latest news delivered to your inbox.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg text-gray-800 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Daily Chronicle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsWebsite;