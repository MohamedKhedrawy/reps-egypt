"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { usePageSettings } from "@/context/PageSettingsContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard({ dictionary }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState({ totalUsers: 0, activeTrainers: 0, pendingApprovals: 0, totalNews: 0 });
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [pageSettings, setPageSettings] = useState({ main: [], footer: [], legal: [] });
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    approvalStats: { approved: 0, rejected: 0, pending: 0, approvalRate: 0 },
    growthPercentage: 0,
    registrationsByRole: { trainers: 0, trainees: 0 },
    recentRegistrations: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null); // For viewing full details
  const [userFilter, setUserFilter] = useState("all"); // "all" or "pending"
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { refreshPages } = usePageSettings();

  // Fetch data on mount and tab change
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, pendingRes, usersRes, newsRes, pagesRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/pending"),
        fetch("/api/admin/users"),
        fetch("/api/admin/news"),
        fetch("/api/admin/pages"),
        fetch("/api/admin/analytics"),
      ]);
      
      if (statsRes.ok) setStats(await statsRes.json());
      if (pendingRes.ok) setPending((await pendingRes.json()).pending || []);
      if (usersRes.ok) setUsers((await usersRes.json()).users || []);
      if (newsRes.ok) setNews((await newsRes.json()).articles || []);
      if (pagesRes.ok) {
        const pagesData = await pagesRes.json();
        setPageSettings(pagesData.grouped || { main: [], footer: [], legal: [] });
      }
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Approve/Reject item (user or qualification) - INSTANT with optimistic update
  const handleApprovalAction = async (item, status) => {
    // Optimistic update - immediately remove from pending list
    setPending(prev => prev.filter(p => p.id !== item.id));
    
    // Also update stats optimistically
    setStats(prev => ({
      ...prev, 
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1)
    }));
    
    // Close detail modal if open
    if (viewItem?.id === item.id) setViewItem(null);
    
    toast.success(`Request ${status} successfully`);

    try {
      const endpoint = item.actionType === 'qualification' 
        ? `/api/admin/qualifications/${item.id}`
        : `/api/admin/users/${item.id}`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      
      if (!res.ok) {
        // Revert on error
        fetchData();
        toast.error("Action failed - reverted");
      }
    } catch { 
      fetchData();
      toast.error("Network error - reverted"); 
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("User deleted");
        fetchData();
      }
    } catch { toast.error("Delete failed"); }
  };

  // Update user details
  const handleSaveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const res = await fetch(`/api/admin/users/${editItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("User updated successfully");
        setShowModal(null);
        setEditItem(null);
        fetchData();
      } else {
        toast.error("Update failed");
      }
    } catch { toast.error("Network error"); }
  };

  // Create/Update news with image upload
  const handleSaveNews = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.isPublished = formData.get("isPublished") === "on";
    
    // Use uploaded image URL if available
    if (imagePreview) {
      data.imageUrl = imagePreview;
    }
    
    // Close modal immediately for better UX
    setShowModal(null);
    setEditItem(null);
    setImagePreview(null);
    
    toast.success(editItem ? "Article updated" : "Article created");
    
    try {
      const url = editItem ? `/api/admin/news/${editItem.id}` : "/api/admin/news";
      const res = await fetch(url, {
        method: editItem ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchData();
      } else {
        toast.error("Save failed");
      }
    } catch { toast.error("Save failed"); }
  };

  // Handle image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // For now, we'll use a data URL (in production, upload to cloud storage)
    setUploadingImage(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setUploadingImage(false);
    };
    reader.onerror = () => {
      toast.error("Failed to read image");
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  // Delete news
  const handleDeleteNews = async (id) => {
    if (!confirm("Delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Article deleted");
        fetchData();
      }
    } catch { toast.error("Delete failed"); }
  };

  // Filter users by search and status
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === "all" || u.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingUsersCount = users.filter(u => u.status === "pending").length;

  // Toggle page visibility with OPTIMISTIC UPDATE
  const handleTogglePageVisibility = async (pageId, currentVisibility) => {
    const newVisibility = !currentVisibility;
    
    // OPTIMISTIC UPDATE: Update local state immediately for instant UI feedback
    setPageSettings(prev => ({
      main: prev.main.map(p => p.pageId === pageId ? { ...p, isVisible: newVisibility } : p),
      footer: prev.footer.map(p => p.pageId === pageId ? { ...p, isVisible: newVisibility } : p),
      legal: prev.legal.map(p => p.pageId === pageId ? { ...p, isVisible: newVisibility } : p),
    }));
    
    toast.success(`Page ${newVisibility ? 'shown' : 'hidden'} in navigation`);

    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: newVisibility }),
      });
      
      if (res.ok) {
        // Refresh navbar/footer context
        await refreshPages();
      } else {
        // Revert on error
        toast.error("Failed to update - reverted");
        fetchData();
      }
    } catch {
      // Revert on network error
      toast.error("Network error - reverted");
      fetchData();
    }
  };

  const tabs = ["Overview", "Approvals", "Users", "News", "Pages", "Analytics"];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{dictionary?.admin?.header_title || "Admin Dashboard"}</h1>
            <p className="text-muted">{dictionary?.admin?.header_subtitle || "Manage users, approvals, and content"}</p>
          </div>
          <button onClick={fetchData} className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-tertiary transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            {dictionary?.admin?.refresh || "Refresh"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: dictionary?.admin?.stats?.total_users || "Total Users", value: stats.totalUsers, icon: "👥", color: "red" },
            { label: dictionary?.admin?.stats?.active_trainers || "Active Trainers", value: stats.activeTrainers, icon: "🏋️", color: "green" },
            { label: dictionary?.admin?.stats?.pending_approvals || "Pending Approvals", value: stats.pendingApprovals, icon: "⏳", color: "amber", urgent: stats.pendingApprovals > 0 },
            { label: dictionary?.admin?.stats?.news_articles || "News Articles", value: stats.totalNews, icon: "📰", color: "blue" },
          ].map((stat, i) => (
            <div key={i} className={`bg-secondary border ${stat.urgent ? 'border-amber-500/50' : 'border-border'} rounded-2xl p-6`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{stat.icon}</span>
                {stat.urgent && <span className="text-xs font-bold bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">{dictionary?.admin?.stats?.action_needed || "Action Needed"}</span>}
              </div>
              <div className="text-3xl font-bold mb-1">{loading ? "..." : stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab ? "text-red-500" : "text-muted hover:text-foreground"}`}>
                {dictionary?.admin?.tabs?.[tab.toLowerCase()] || tab}
                {tab === "Approvals" && stats.pendingApprovals > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{stats.pendingApprovals}</span>
                )}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-t-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="text-center py-20 text-muted">Loading...</div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "Overview" && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Pending */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6">{dictionary?.admin?.overview?.recent_pending || "Recent Pending Approvals"}</h2>
                  {pending.length === 0 ? (
                    <p className="text-muted text-sm">{dictionary?.admin?.overview?.no_pending || "No pending approvals"}</p>
                  ) : (
                    <div className="space-y-4">
                      {pending.slice(0, 3).map((item) => (
                        <div key={item.id} className="bg-tertiary rounded-xl p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-xs text-muted">{item.specialization} • {item.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleApprovalAction(item, "approved")} className="px-3 py-1.5 bg-green-500/10 text-green-500 text-xs font-bold rounded-full hover:bg-green-500/20">{dictionary?.admin?.overview?.approve || "Approve"}</button>
                            <button onClick={() => handleApprovalAction(item, "rejected")} className="px-3 py-1.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full hover:bg-red-500/20">{dictionary?.admin?.overview?.reject || "Reject"}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6">{dictionary?.admin?.overview?.quick_actions || "Quick Actions"}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab("Approvals")} className="p-4 bg-tertiary rounded-xl text-left hover:bg-background transition-colors">
                      <span className="text-2xl mb-2 block">✅</span>
                      <span className="font-bold">{dictionary?.admin?.overview?.review_approvals || "Review Approvals"}</span>
                    </button>
                    <button onClick={() => setActiveTab("Users")} className="p-4 bg-tertiary rounded-xl text-left hover:bg-background transition-colors">
                      <span className="text-2xl mb-2 block">👤</span>
                      <span className="font-bold">{dictionary?.admin?.overview?.manage_users || "Manage Users"}</span>
                    </button>
                    <button onClick={() => setActiveTab("News")} className="p-4 bg-tertiary rounded-xl text-left hover:bg-background transition-colors">
                      <span className="text-2xl mb-2 block">📝</span>
                      <span className="font-bold">{dictionary?.admin?.overview?.manage_news || "Manage News"}</span>
                    </button>
                    <button onClick={fetchData} className="p-4 bg-tertiary rounded-xl text-left hover:bg-background transition-colors">
                      <span className="text-2xl mb-2 block">🔄</span>
                      <span className="font-bold">{dictionary?.admin?.overview?.refresh_data || "Refresh Data"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Approvals Tab */}
            {activeTab === "Approvals" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">{dictionary?.admin?.stats?.pending_approvals || "Pending Approvals"} ({pending.length})</h2>
                {pending.length === 0 ? (
                  <p className="text-muted">{dictionary?.admin?.overview?.no_pending || "No pending applications"}</p>
                ) : (
                  <div className="space-y-4">
                    {pending.map((item) => (
                      <div key={item.id} className="bg-tertiary border border-border rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted">{item.email}</p>
                          <div className="flex gap-3 mt-2 text-xs text-muted">
                            <span className="bg-background px-2 py-1 rounded">{item.type || (item.newSpecialization ? 'Specialization Request' : 'Qualification Request')}</span>
                            {item.newSpecialization && (
                                <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded border border-amber-500/30">
                                    Target: {item.newSpecialization}
                                </span>
                            )}
                            <span className="bg-background px-2 py-1 rounded">{item.specialization || "Trainer"}</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setViewItem(item)} className="px-4 py-2 bg-blue-500/10 text-blue-400 font-bold rounded-full hover:bg-blue-500/20">
                            View Details
                          </button>
                          <button onClick={() => handleApprovalAction(item, "approved")} className="px-5 py-2 bg-green-500/10 text-green-500 font-bold rounded-full hover:bg-green-500/20 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {dictionary?.admin?.overview?.approve || "Approve"}
                          </button>
                          <button onClick={() => handleApprovalAction(item, "rejected")} className="px-5 py-2 bg-red-500/10 text-red-500 font-bold rounded-full hover:bg-red-500/20 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            {dictionary?.admin?.overview?.reject || "Reject"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "Users" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">{dictionary?.admin?.users?.title || "Users"}</h2>
                    {/* Filter Tabs */}
                    <div className="flex bg-tertiary rounded-lg p-1">
                      <button
                        onClick={() => setUserFilter("all")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${userFilter === "all" ? "bg-red-600 text-white" : "text-muted hover:text-foreground"}`}
                      >
                        {dictionary?.admin?.users?.all_users || "All Users"} ({users.length})
                      </button>
                      <button
                        onClick={() => setUserFilter("pending")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${userFilter === "pending" ? "bg-amber-500 text-white" : "text-muted hover:text-foreground"}`}
                      >
                        {dictionary?.admin?.users?.pending || "Pending"} ({pendingUsersCount})
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder={dictionary?.admin?.users?.search_placeholder || "Search users..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-tertiary border border-border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-start text-muted">
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.name || "Name"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.email || "Email"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.role || "Role"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.status || "Status"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.actions || "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/50 hover:bg-tertiary/50">
                          <td className="py-4 font-medium">{user.name}</td>
                          <td className="py-4 text-muted">{user.email}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : user.role === 'trainer' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {dictionary?.admin?.users?.roles?.[user.role] || user.role}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'approved' ? 'bg-green-500/20 text-green-400' : user.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              {dictionary?.admin?.users?.status?.[user.status] || user.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              {user.status === 'pending' && (
                                <>
                                  <button onClick={() => handleApprovalAction({ id: user.id, actionType: 'user' }, "approved")} className="text-green-500 hover:underline text-xs">{dictionary?.admin?.users?.actions?.approve || "Approve"}</button>
                                  <button onClick={() => handleApprovalAction({ id: user.id, actionType: 'user' }, "rejected")} className="text-red-500 hover:underline text-xs">{dictionary?.admin?.users?.actions?.reject || "Reject"}</button>
                                </>
                              )}
                              <button onClick={() => { setEditItem(user); setShowModal("user"); }} className="text-blue-400 hover:underline text-xs">{dictionary?.admin?.users?.actions?.edit || "Edit"}</button>
                              <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:underline text-xs">{dictionary?.admin?.users?.actions?.delete || "Delete"}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* News Tab */}
            {activeTab === "News" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{dictionary?.admin?.news?.title || "News Articles"} ({news.length})</h2>
                  <button onClick={() => { setEditItem(null); setShowModal("news"); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    {dictionary?.admin?.news?.add_article || "Add Article"}
                  </button>
                </div>
                <div className="space-y-4">
                  {news.map((article) => (
                    <div key={article.id} className="bg-tertiary border border-border rounded-xl p-5 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold">{article.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs ${article.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {article.isPublished ? (dictionary?.admin?.news?.published || 'Published') : (dictionary?.admin?.news?.draft || 'Draft')}
                          </span>
                        </div>
                        <p className="text-sm text-muted">{article.category} • {article.description?.slice(0, 80)}...</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditItem(article); setShowModal("news"); }} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full hover:bg-blue-500/20">{dictionary?.admin?.news?.edit || "Edit"}</button>
                        <button onClick={() => handleDeleteNews(article.id)} className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-full hover:bg-red-500/20">{dictionary?.admin?.news?.delete || "Delete"}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "Analytics" && (
              <div className="space-y-8">
                {/* Analytics Header */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-2">{dictionary?.admin?.analytics?.title || "Platform Analytics"}</h2>
                  <p className="text-muted text-sm">{dictionary?.admin?.analytics?.subtitle || "Real-time insights and metrics for your platform performance"}</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* User Growth Chart */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4">{dictionary?.admin?.analytics?.user_growth || "User Growth (Last 6 Months)"}</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.userGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} />
                          <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="users" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-tertiary rounded-lg">
                        <div className={`text-2xl font-bold ${analytics.growthPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {analytics.growthPercentage >= 0 ? '+' : ''}{analytics.growthPercentage}%
                        </div>
                        <div className="text-xs text-muted">{dictionary?.admin?.analytics?.this_month || "This Month"}</div>
                      </div>
                      <div className="text-center p-3 bg-tertiary rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{stats.totalUsers}</div>
                        <div className="text-xs text-muted">{dictionary?.admin?.stats?.total_users || "Total Users"}</div>
                      </div>
                      <div className="text-center p-3 bg-tertiary rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{stats.activeTrainers}</div>
                        <div className="text-xs text-muted">{dictionary?.admin?.stats?.active_trainers || "Active Trainers"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Approval Metrics with Circular Progress */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4">{dictionary?.admin?.analytics?.approval_rate || "Approval Rate"}</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative">
                        {/* Circular Progress */}
                        <svg className="w-48 h-48 transform -rotate-90">
                          <circle 
                            cx="96" cy="96" r="80" 
                            fill="none" 
                            stroke="#333" 
                            strokeWidth="12"
                          />
                          <circle 
                            cx="96" cy="96" r="80" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="12"
                            strokeDasharray={`${analytics.approvalStats.approvalRate * 5.03} 503`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-green-400">{analytics.approvalStats.approvalRate}%</div>
                            <p className="text-muted text-sm mt-1">{dictionary?.admin?.analytics?.approval_rate || "Approval Rate"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                        <div className="text-xl font-bold text-green-400">{analytics.approvalStats.approved}</div>
                        <div className="text-xs text-muted">{dictionary?.admin?.analytics?.approved || "Approved"}</div>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                        <div className="text-xl font-bold text-red-400">{analytics.approvalStats.rejected}</div>
                        <div className="text-xs text-muted">{dictionary?.admin?.analytics?.rejected || "Rejected"}</div>
                      </div>
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
                        <div className="text-xl font-bold text-amber-400">{analytics.approvalStats.pending}</div>
                        <div className="text-xs text-muted">{dictionary?.admin?.analytics?.pending || "Pending"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Stats */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4">{dictionary?.admin?.analytics?.content_overview || "Content Overview"}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📰</span>
                          <span>{dictionary?.admin?.analytics?.labels?.news_articles || "News Articles"}</span>
                        </div>
                        <span className="text-2xl font-bold">{stats.totalNews}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">✅</span>
                          <span>{dictionary?.admin?.analytics?.labels?.published || "Published"}</span>
                        </div>
                        <span className="text-2xl font-bold text-green-400">{news.filter(n => n.isPublished).length}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📝</span>
                          <span>{dictionary?.admin?.analytics?.labels?.drafts || "Drafts"}</span>
                        </div>
                        <span className="text-2xl font-bold text-amber-400">{news.filter(n => !n.isPublished).length}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <span>{dictionary?.admin?.analytics?.labels?.trainers || "Trainers"}</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-400">{analytics.registrationsByRole.trainers}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-tertiary rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">👤</span>
                          <span>{dictionary?.admin?.analytics?.labels?.trainees || "Trainees"}</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-400">{analytics.registrationsByRole.trainees}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Registrations */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4">{dictionary?.admin?.analytics?.recent_registrations || "Recent Registrations"}</h3>
                    <div className="space-y-3">
                      {analytics.recentRegistrations.length === 0 ? (
                        <p className="text-muted text-sm text-center py-8">{dictionary?.admin?.analytics?.no_recent || "No recent registrations"}</p>
                      ) : (
                        analytics.recentRegistrations.map((reg) => (
                          <div key={reg.id} className="p-4 bg-tertiary rounded-xl flex justify-between items-center">
                            <div>
                              <p className="font-medium">{reg.name}</p>
                              <p className="text-sm text-muted">{reg.email}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded text-xs capitalize ${
                                reg.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                reg.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                'bg-amber-500/20 text-amber-400'
                              }`}>
                                {dictionary?.admin?.users?.status?.[reg.status] || reg.status}
                              </span>
                              <p className="text-xs text-muted mt-1">{dictionary?.admin?.users?.roles?.[reg.role] || reg.role}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === "Pages" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">{dictionary?.admin?.pages?.title || "Pages Control"}</h2>
                  <p className="text-muted text-sm">{dictionary?.admin?.pages?.subtitle || "Show or hide pages from the website navigation. Hidden pages are still accessible via direct URL."}</p>
                </div>
                
                <div className="space-y-8">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 border-b border-border pb-2">{dictionary?.admin?.pages?.main_nav || "Main Navigation"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pageSettings.main?.map((setting) => (
                          <div key={setting.pageId} className="flex items-center justify-between p-4 bg-tertiary rounded-xl border border-border">
                            <span className="font-medium capitalize">{setting.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={setting.isVisible} onChange={() => handleTogglePageVisibility(setting.pageId, setting.isVisible)} className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div>
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 border-b border-border pb-2">{dictionary?.admin?.pages?.footer_nav || "Footer Quick Links"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pageSettings.footer?.map((setting) => (
                          <div key={setting.pageId} className="flex items-center justify-between p-4 bg-tertiary rounded-xl border border-border">
                            <span className="font-medium capitalize">{setting.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={setting.isVisible} onChange={() => handleTogglePageVisibility(setting.pageId, setting.isVisible)} className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  {/* Legal Pages */}
                  <div>
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 border-b border-border pb-2">{dictionary?.admin?.pages?.legal_nav || "Legal Pages"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pageSettings.legal?.map((setting) => (
                          <div key={setting.pageId} className="flex items-center justify-between p-4 bg-tertiary rounded-xl border border-border">
                            <span className="font-medium capitalize">{setting.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={setting.isVisible} onChange={() => handleTogglePageVisibility(setting.pageId, setting.isVisible)} className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <h4 className="font-bold text-blue-400 text-sm mb-1">{dictionary?.admin?.pages?.note_title || "Note about hidden pages"}</h4>
                      <p className="text-sm text-blue-200/80">{dictionary?.admin?.pages?.note_desc || "Hidden pages are only removed from the navigation menus. Users can still access them directly via URL. Use this to temporarily hide pages without affecting direct links."}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* News Modal */}
        {showModal === "news" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-lg p-6">
              <h3 className="text-xl font-bold mb-6">{editItem ? (dictionary?.admin?.news?.modal?.edit_title || "Edit Article") : (dictionary?.admin?.news?.modal?.new_title || "New Article")}</h3>
              <form onSubmit={handleSaveNews} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.title_label || "Title"}</label>
                  <input name="title" defaultValue={editItem?.title} required className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.category_label || "Category"}</label>
                  <select name="category" defaultValue={editItem?.category} required className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500">
                    <option value="">Select category</option>
                    <option value="Announcement">{dictionary?.admin?.news?.modal?.categories?.Announcement || "Announcement"}</option>
                    <option value="Article">{dictionary?.admin?.news?.modal?.categories?.Article || "Article"}</option>
                    <option value="Community">{dictionary?.admin?.news?.modal?.categories?.Community || "Community"}</option>
                    <option value="Events">{dictionary?.admin?.news?.modal?.categories?.Events || "Events"}</option>
                    <option value="Partnership">{dictionary?.admin?.news?.modal?.categories?.Partnership || "Partnership"}</option>
                    <option value="Trends">{dictionary?.admin?.news?.modal?.categories?.Trends || "Trends"}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.desc_label || "Description"}</label>
                  <textarea name="description" defaultValue={editItem?.description} rows={4} required className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.image_label || "Image"}</label>
                  <div className="mt-1 flex items-center gap-4">
                    {(imagePreview || editItem?.image) && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                        <img src={imagePreview || editItem.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="cursor-pointer bg-tertiary border border-border hover:bg-white/5 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
                       <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                       <span className="text-sm font-medium">{uploading ? (dictionary?.admin?.news?.modal?.uploading || "Uploading...") : (dictionary?.admin?.news?.modal?.upload_btn || "Upload Image")}</span>
                       <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isPublished" defaultChecked={editItem?.isPublished} id="isPublished" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <label htmlFor="isPublished" className="text-sm text-muted">{dictionary?.admin?.news?.modal?.publish_immediate || "Publish immediately"}</label>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 text-muted hover:text-white transition-colors">{dictionary?.admin?.news?.modal?.cancel || "Cancel"}</button>
                  <button type="submit" disabled={uploading} className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {uploading ? "..." : (editItem ? (dictionary?.admin?.news?.modal?.update || "Update") : (dictionary?.admin?.news?.modal?.create || "Create"))}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Modal */}
        {showModal === "user" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-lg p-6">
              <h3 className="text-xl font-bold mb-6">{dictionary?.admin?.users?.edit || "Edit"} {dictionary?.admin?.users?.table?.role || "User"}</h3>
              {editItem && (
                <form onSubmit={handleSaveUser} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.users?.table?.name || "Name"}</label>
                    <input name="name" defaultValue={editItem.name} className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.users?.table?.email || "Email"}</label>
                    <input name="email" defaultValue={editItem.email} className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.users?.table?.role || "Role"}</label>
                    <select name="role" defaultValue={editItem.role} className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500">
                      <option value="user">User</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.users?.table?.status || "Status"}</label>
                    <select name="status" defaultValue={editItem.status} className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <button type="button" onClick={() => setShowModal(null)} className="px-4 py-2 text-muted hover:text-white transition-colors">{dictionary?.admin?.news?.modal?.cancel || "Cancel"}</button>
                    <button type="submit" className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">{dictionary?.admin?.news?.modal?.update || "Update"}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {viewItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">{viewItem.name}</h3>
                  <p className="text-muted text-sm">{viewItem.email}</p>
                </div>
                <button onClick={() => setViewItem(null)} className="text-muted hover:text-foreground text-xl">✕</button>
              </div>
              
              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">Type</p>
                  <p className="font-medium">{viewItem.type || "User Registration"}</p>
                </div>
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">Specialization</p>
                  <p className="font-medium">{viewItem.specialization || "N/A"}</p>
                </div>
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">Request Date</p>
                  <p className="font-medium">{viewItem.date || "N/A"}</p>
                </div>
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">Action Type</p>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${viewItem.actionType === 'qualification' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {viewItem.actionType === 'qualification' ? 'Qualification Change' : 'New Registration'}
                  </span>
                </div>
              </div>

              {/* Additional Details */}
              {viewItem.details && (
                <div className="bg-tertiary rounded-xl p-4 mb-6">
                  <p className="text-xs text-muted uppercase font-bold mb-2">Additional Details</p>
                  <p className="text-sm">{typeof viewItem.details === 'string' ? viewItem.details : JSON.stringify(viewItem.details, null, 2)}</p>
                </div>
              )}

              {/* Uploaded Files */}
              {viewItem.uploadedFiles && viewItem.uploadedFiles.length > 0 && (
                <div className="bg-tertiary rounded-xl p-4 mb-6">
                  <p className="text-xs text-muted uppercase font-bold mb-2">Uploaded Documents</p>
                  <div className="space-y-2">
                    {viewItem.uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span>{typeof file === 'string' ? file : file.name || 'Document'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => handleApprovalAction(viewItem, "approved")}
                  className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Approve
                </button>
                <button
                  onClick={() => handleApprovalAction(viewItem, "rejected")}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
