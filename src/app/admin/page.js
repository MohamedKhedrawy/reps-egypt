"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Mock Data
  const stats = [
    {
      label: "Total Users",
      value: "10,247",
      growth: "+12%",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Active Coaches",
      value: "512",
      growth: "+8%",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.636A16.657 16.657 0 0 1 12 21.75c-2.33 0-4.512-.645-6.374-1.766a.75.75 0 0 1-.371-.636ZM16.611 15.468C18.025 16.59 18.9 18.23 18.9 20.08a16.551 16.551 0 0 1-1.353 3.655.75.75 0 0 1-1.29-.696A15.061 15.061 0 0 1 17.391 20.08c0-1.285-.59-2.452-1.528-3.253a.75.75 0 1 1 .948-1.159ZM5.42 16.927a15.061 15.061 0 0 1 1.133 3.153.75.75 0 1 1-1.291.696 16.553 16.553 0 0 1-1.352-3.655c0-1.85.875-3.49 2.29-4.612a.75.75 0 0 1 .947 1.16Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Pending Approvals",
      value: "23",
      growth: "Urgent",
      isPositive: false, // For styling logic
      isWarning: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Certifications Issued",
      value: "342",
      growth: "+15%",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
          <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const approvals = [
    {
      name: "Mohamed Khaled",
      type: "Coach Application",
      spec: "CrossFit Training",
      date: "Jan 25, 2026",
    },
    {
      name: "Nour Ahmed",
      type: "Program Submission",
      spec: "Yoga Instructor",
      date: "Jan 24, 2026",
    },
    {
      name: "Omar Hassan",
      type: "Certification Renewal",
      spec: "Sports Nutrition",
      date: "Jan 23, 2026",
    },
  ];

  const activity = [
    {
      action: "New coach registration",
      user: "Ahmed Salem",
      time: "2 hours ago",
      icon: "user",
    },
    {
      action: "Program enrollment",
      user: "Sara Mohamed",
      time: "4 hours ago",
      icon: "file",
    },
    {
      action: "Certification issued",
      user: "Karim Youssef",
      time: "5 hours ago",
      icon: "badge",
    },
    {
      action: "Profile updated",
      user: "Layla Ibrahim",
      time: "8 hours ago",
      icon: "edit",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/60">Manage users, approvals, and platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-[#121212] border ${stat.isWarning ? 'border-amber-500/30' : 'border-white/5'} rounded-2xl p-6 relative overflow-hidden`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.isWarning ? 'bg-amber-500/10' : 'bg-red-600/10'}`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  stat.isWarning ? 'bg-amber-500/10 text-amber-500' :
                  stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {stat.growth}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/10">
          <div className="flex gap-8">
            {["Overview", "Approvals", "Users", "Analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-colors relative ${
                  activeTab === tab ? "text-red-500" : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Pending Approvals */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Pending Approvals</h2>
              <span className="text-xs font-bold bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">3 pending</span>
            </div>

            <div className="space-y-4">
              {approvals.map((item, idx) => (
                <div key={idx} className="bg-white/5  border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-1">{item.type}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span>{item.spec}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 group">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      Approve
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 group">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {activity.map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {/* Timeline Line */}
                  {idx !== activity.length - 1 && (
                    <div className="absolute top-8 left-4 w-[1px] h-full bg-white/5 -z-0" />
                  )}
                  
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0 z-10 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                       <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A9.916 9.916 0 0 0 10 18c2.314 0 4.438-.784 6.131-2.1.43-.333-.604-2.435-1.338-3.51A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm text-white">{item.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.user}</p>
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* System Alerts */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-4">
          <div className="p-2 bg-amber-500/10 rounded-lg shrink-0 text-amber-500">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
               <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
             </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-500 mb-1">System Alerts</h3>
            <p className="text-xs text-amber-200/60 leading-relaxed">23 pending approvals require attention. Review and process applications to maintain platform quality.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
