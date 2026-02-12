"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { usePageSettings } from "@/context/PageSettingsContext";
import dynamic from 'next/dynamic';
import GalleryDashboard from './GalleryDashboard';
import PartnersDashboard from './PartnersDashboard';

// Dynamic import for recharts - only loads when Analytics tab is viewed (~8.3MB saved on initial load)
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function AdminDashboard({ dictionary }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState({ totalUsers: 0, activeTrainers: 0, pendingApprovals: 0, totalNews: 0 });
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
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
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [articleImages, setArticleImages] = useState([]);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAlerts, setUserAlerts] = useState([]);
  const [newAlertText, setNewAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [newNoteText, setNewNoteText] = useState("");
  const fileInputRef = useRef(null);
  const { refreshPages } = usePageSettings();
  const fetchedTabs = useRef(new Set()); // Track which tabs have been fetched
  
  // Email management state
  const [organizationEmails, setOrganizationEmails] = useState([]);
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [newEmailLabel, setNewEmailLabel] = useState("");
  const [selectedFromEmail, setSelectedFromEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailFilters, setEmailFilters] = useState({ roles: [], ageMin: "", ageMax: "", idMin: "", idMax: "" });
  const [recipientCount, setRecipientCount] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Job management state
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobGovernorate, setJobGovernorate] = useState("");
  const [jobType, setJobType] = useState("full_time");
  const [jobSalary, setJobSalary] = useState("");
  const [jobCurrency, setJobCurrency] = useState("EGP");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLogo, setJobLogo] = useState("");
  const [jobLogoPreview, setJobLogoPreview] = useState(null);
  const [jobFeatured, setJobFeatured] = useState(false);
  const [jobPublished, setJobPublished] = useState(true);
  const [uploadingJobLogo, setUploadingJobLogo] = useState(false);

  // Fetch stats on mount (always needed for header)
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch tab-specific data when tab changes
  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) setStats(await res.json());
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchTabData = async (tab) => {
    // Skip if already fetched this tab's data (unless it's a refresh)
    if (fetchedTabs.current.has(tab)) return;
    
    setLoading(true);
    try {
      switch (tab) {
        case "Overview":
          const pendingRes = await fetch("/api/admin/pending");
          if (pendingRes.ok) setPending((await pendingRes.json()).pending || []);
          break;
          
        case "Approvals":
          if (!fetchedTabs.current.has("Overview")) {
            const pendingRes2 = await fetch("/api/admin/pending");
            if (pendingRes2.ok) setPending((await pendingRes2.json()).pending || []);
          }
          break;
          
        case "Users":
          const usersRes = await fetch("/api/admin/users");
          if (usersRes.ok) setUsers((await usersRes.json()).users || []);
          break;
          
        case "News":
          const newsRes = await fetch("/api/admin/news");
          if (newsRes.ok) setNews((await newsRes.json()).articles || []);
          break;
          
        case "Pages":
          const pagesRes = await fetch("/api/admin/pages");
          if (pagesRes.ok) {
            const pagesData = await pagesRes.json();
            setPageSettings(pagesData.grouped || { main: [], footer: [], legal: [] });
          }
          break;

        case "Jobs":
          const jobsRes = await fetch("/api/admin/jobs");
          if (jobsRes.ok) setJobs((await jobsRes.json()).jobs || []);
          break;
          
        case "Analytics":
          const analyticsRes = await fetch("/api/admin/analytics");
          if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
          break;
          
        case "Gallery":
          // Gallery component handles its own data fetching
          break;
          
        case "Emails":
          const emailsRes = await fetch("/api/admin/emails");
          if (emailsRes.ok) {
            const emailsData = await emailsRes.json();
            setOrganizationEmails(emailsData.emails || []);
            // Set default selected email
            const defaultEmail = emailsData.emails?.find(e => e.isDefault);
            if (defaultEmail) setSelectedFromEmail(defaultEmail.id);
          }
          break;
      }
      fetchedTabs.current.add(tab);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Force refresh all data (for manual refresh button)
  const refreshAllData = async () => {
    fetchedTabs.current.clear();
    await fetchStats();
    await fetchTabData(activeTab);
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
        refreshAllData();
        toast.error("Action failed - reverted");
      }
    } catch { 
      refreshAllData();
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
        refreshAllData();
      }
    } catch { toast.error("Delete failed"); }
  };

  // View User Profile
  const handleViewUserProfile = async (user) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        // userData comes as { user: {...} } from API
        setSelectedUser(data.user || data);
        // Load alerts and notes
        setUserAlerts(data.user?.alerts || data.alerts || []);
        setNewAlertText("");
        setNewNoteText("");
      } else {
        toast.error("Failed to load user profile");
      }
    } catch (error) {
      toast.error("Failed to load user profile");
      console.error(error);
    }
  };

  // Add Alert to User
  const handleAddAlert = async () => {
    if (!newAlertText.trim() || !selectedUser) return;
    
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newAlertText,
          severity: alertSeverity,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setUserAlerts(data.alerts);
        setNewAlertText("");
        toast.success(dictionary?.admin?.users?.profile?.alert_added || "Alert added successfully");
      } else {
        toast.error(dictionary?.admin?.users?.profile?.alert_failed || "Failed to add alert");
      }
    } catch (error) {
      toast.error(dictionary?.common?.error || "An error occurred");
      console.error(error);
    }
  };

  // Add Activity Note to User
  const handleAddNote = async () => {
    if (!newNoteText.trim() || !selectedUser) return;
    
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newNoteText,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setSelectedUser(prev => ({
          ...prev,
          activityNotes: data.notes
        }));
        setNewNoteText("");
        toast.success(dictionary?.admin?.users?.profile?.note_added || "Note added successfully");
      } else {
        toast.error(dictionary?.admin?.users?.profile?.note_failed || "Failed to add note");
      }
    } catch (error) {
      toast.error(dictionary?.common?.error || "An error occurred");
      console.error(error);
    }
  };

  // Delete User Profile Photo
  const handleDeleteUserPhoto = async () => {
    if (!selectedUser) return;
    
    if (!confirm("Are you sure you want to delete this user's profile photo?")) return;
    
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}/photo`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        setSelectedUser(prev => ({
          ...prev,
          profilePhoto: null
        }));
        toast.success(dictionary?.admin?.users?.profile?.photo_deleted || "Photo deleted successfully");
      } else {
        toast.error(dictionary?.admin?.users?.profile?.photo_delete_failed || "Failed to delete photo");
      }
    } catch (error) {
      toast.error(dictionary?.admin?.users?.profile?.error || "An error occurred");
      console.error(error);
    }
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
        refreshAllData();
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
    
    // Parse images array from JSON string
    try {
      if (data.images && typeof data.images === 'string') {
        data.images = JSON.parse(data.images);
      }
    } catch (err) {
      data.images = [];
    }
    
    // Ensure imageUrl is set correctly
    if (coverImagePreview) {
      data.imageUrl = coverImagePreview;
    } else if (editItem?.imageUrl) {
      data.imageUrl = editItem.imageUrl;
    } else if (editItem?.image) {
      data.imageUrl = editItem.image;
    } else {
      data.imageUrl = '';
    }
    
    // Close modal immediately for better UX
    setShowModal(null);
    setEditItem(null);
    setCoverImagePreview(null);
    setArticleImages([]);
    
    toast.success(editItem ? (dictionary?.admin?.news?.updated || "Article updated") : (dictionary?.admin?.news?.created || "Article created"));
    
    try {
      const url = editItem ? `/api/admin/news/${editItem.id}` : "/api/admin/news";
      const res = await fetch(url, {
        method: editItem ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        refreshAllData();
      } else {
        toast.error(dictionary?.admin?.news?.save_failed || "Save failed");
      }
    } catch { toast.error(dictionary?.admin?.news?.save_failed || "Save failed"); }
  };

  // Handle cover image upload (single image)
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingCover(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result);
      setUploadingCover(false);
      toast.success(dictionary?.admin?.news?.cover_uploaded || "Cover image uploaded");
    };
    reader.onerror = () => {
      toast.error(dictionary?.admin?.news?.upload_failed || "Image upload failed");
      setUploadingCover(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle gallery images upload (multiple images)
  const handleGalleryImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImage(true);
    const newImages = [];
    let uploadedCount = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        uploadedCount++;
        
        if (uploadedCount === files.length) {
          setArticleImages(prev => [...prev, ...newImages]);
          setUploadingImage(false);
          toast.success(`${files.length} ${dictionary?.admin?.news?.images_uploaded || "images uploaded"}`);
        }
      };
      reader.onerror = () => {
        toast.error(dictionary?.admin?.news?.upload_failed || "Image upload failed");
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = (index) => {
    setArticleImages(prev => prev.filter((_, i) => i !== index));
  };

  // Delete news
  const handleDeleteNews = async (id) => {
    if (!confirm("Delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Article deleted");
        refreshAllData();
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
        refreshAllData();
      }
    } catch {
      // Revert on network error
      toast.error("Network error - reverted");
      refreshAllData();
    }
  };

  // Email Management Functions
  const handleAddOrganizationEmail = async () => {
    if (!newEmailAddress || !newEmailAddress.includes('@')) {
      toast.error(dictionary?.admin?.emails?.invalid_email || "Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: newEmailAddress, 
          label: newEmailLabel || newEmailAddress.split('@')[0],
          isDefault: organizationEmails.length === 0 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrganizationEmails(prev => [...prev, {
          id: data.id,
          email: newEmailAddress.toLowerCase(),
          label: newEmailLabel || newEmailAddress.split('@')[0],
          isDefault: organizationEmails.length === 0
        }]);
        setNewEmailAddress("");
        setNewEmailLabel("");
        toast.success(dictionary?.admin?.emails?.email_added || "Email added successfully");
        if (organizationEmails.length === 0) setSelectedFromEmail(data.id);
      } else {
        toast.error(dictionary?.admin?.emails?.add_failed || "Failed to add email");
      }
    } catch {
      toast.error(dictionary?.admin?.emails?.add_failed || "Failed to add email");
    }
  };

  const handleDeleteOrganizationEmail = async (id) => {
    try {
      const res = await fetch(`/api/admin/emails/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrganizationEmails(prev => prev.filter(e => e.id !== id));
        if (selectedFromEmail === id) setSelectedFromEmail("");
        toast.success(dictionary?.admin?.emails?.email_deleted || "Email deleted");
      } else {
        toast.error(dictionary?.admin?.emails?.delete_failed || "Failed to delete email");
      }
    } catch {
      toast.error(dictionary?.admin?.emails?.delete_failed || "Failed to delete email");
    }
  };

  const handleSetDefaultEmail = async (id) => {
    try {
      const res = await fetch(`/api/admin/emails/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDefault: true }),
      });
      if (res.ok) {
        setOrganizationEmails(prev => prev.map(e => ({ ...e, isDefault: e.id === id })));
        toast.success(dictionary?.admin?.emails?.default_set || "Default email updated");
      }
    } catch {
      toast.error("Failed to set default email");
    }
  };

  // Fetch recipient count when filters change
  const fetchRecipientCount = async () => {
    try {
      const params = new URLSearchParams();
      if (emailFilters.roles.length > 0) params.append('roles', emailFilters.roles.join(','));
      if (emailFilters.ageMin) params.append('ageMin', emailFilters.ageMin);
      if (emailFilters.ageMax) params.append('ageMax', emailFilters.ageMax);
      if (emailFilters.idMin) params.append('idMin', emailFilters.idMin);
      if (emailFilters.idMax) params.append('idMax', emailFilters.idMax);

      const res = await fetch(`/api/admin/emails/send?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecipientCount(data.count);
      }
    } catch {
      console.error("Failed to fetch recipient count");
    }
  };

  useEffect(() => {
    if (activeTab === "Emails") {
      fetchRecipientCount();
    }
  }, [emailFilters, activeTab]);

  const handleSendBulkEmail = async () => {
    if (!selectedFromEmail || !emailSubject || !emailContent) {
      toast.error(dictionary?.admin?.emails?.missing_fields || "Please fill in all required fields");
      return;
    }

    if (recipientCount === 0) {
      toast.error(dictionary?.admin?.emails?.no_recipients || "No recipients match your filters");
      return;
    }

    if (!confirm(`${dictionary?.admin?.emails?.send_confirm || "Send email to"} ${recipientCount} ${dictionary?.admin?.emails?.users || "users"}?`)) {
      return;
    }

    setSendingEmail(true);
    try {
      const res = await fetch("/api/admin/emails/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromEmailId: selectedFromEmail,
          subject: emailSubject,
          htmlContent: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>${emailSubject}</h2>
            <div style="white-space: pre-wrap;">${emailContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
            <p style="color: #888; font-size: 12px;">REPS Egypt</p>
          </div>`,
          textContent: emailContent,
          filters: emailFilters,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`${dictionary?.admin?.emails?.send_success || "Emails sent successfully"} (${data.sentCount})`);
        setEmailSubject("");
        setEmailContent("");
      } else {
        const data = await res.json();
        toast.error(data.error || dictionary?.admin?.emails?.send_failed || "Failed to send emails");
      }
    } catch {
      toast.error(dictionary?.admin?.emails?.send_failed || "Failed to send emails");
    } finally {
      setSendingEmail(false);
    }
  };

  const toggleRoleFilter = (role) => {
    setEmailFilters(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  // Job Management Functions
  const handleAddJob = async () => {
    if (!jobTitle || !jobCompany || !jobLocation || !jobGovernorate || !jobSalary || !jobDescription) {
      toast.error(dictionary?.admin?.jobs?.required_fields || "Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          governorate: jobGovernorate,
          type: jobType,
          salary: jobSalary,
          currency: jobCurrency,
          description: jobDescription,
          logo: jobLogo,
          featured: jobFeatured,
          isPublished: jobPublished,
        }),
      });

      if (res.ok) {
        toast.success(dictionary?.admin?.jobs?.job_added || "Job added successfully");
        setShowModal(null);
        resetJobForm();
        fetchedTabs.current.delete("Jobs");
        fetchTabData("Jobs");
      } else {
        toast.error(dictionary?.admin?.jobs?.add_failed || "Failed to add job");
      }
    } catch (error) {
      toast.error(dictionary?.admin?.jobs?.add_failed || "Failed to add job");
    }
  };

  const handleUpdateJob = async (jobId) => {
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          governorate: jobGovernorate,
          type: jobType,
          salary: jobSalary,
          currency: jobCurrency,
          description: jobDescription,
          logo: jobLogo,
          featured: jobFeatured,
          isPublished: jobPublished,
        }),
      });

      if (res.ok) {
        toast.success(dictionary?.admin?.jobs?.job_updated || "Job updated successfully");
        setShowModal(null);
        resetJobForm();
        fetchedTabs.current.delete("Jobs");
        fetchTabData("Jobs");
      } else {
        toast.error(dictionary?.admin?.jobs?.update_failed || "Failed to update job");
      }
    } catch (error) {
      toast.error(dictionary?.admin?.jobs?.update_failed || "Failed to update job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm(dictionary?.admin?.jobs?.delete_confirm || "Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(dictionary?.admin?.jobs?.job_deleted || "Job deleted successfully");
        fetchTabData("Jobs");
      } else {
        toast.error(dictionary?.admin?.jobs?.delete_failed || "Failed to delete job");
      }
    } catch (error) {
      toast.error(dictionary?.admin?.jobs?.delete_failed || "Failed to delete job");
    }
  };

  const resetJobForm = () => {
    setJobTitle("");
    setJobCompany("");
    setJobLocation("");
    setJobGovernorate("");
    setJobType("full_time");
    setJobSalary("");
    setJobCurrency("EGP");
    setJobDescription("");
    setJobLogo("");
    setJobLogoPreview(null);
    setJobFeatured(false);
    setJobPublished(true);
    setEditItem(null);
  };

  const handleJobLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingJobLogo(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setJobLogo(reader.result);
      setJobLogoPreview(reader.result);
      setUploadingJobLogo(false);
      toast.success(dictionary?.admin?.jobs?.logo_uploaded || "Company logo uploaded");
    };
    reader.onerror = () => {
      toast.error(dictionary?.admin?.jobs?.upload_failed || "Image upload failed");
      setUploadingJobLogo(false);
    };
    reader.readAsDataURL(file);
  };

  const tabs = ["Overview", "Approvals", "Users", "News", "Gallery", "Pages", "Partners", "Jobs", "Analytics", "Emails"];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{dictionary?.admin?.header_title || "Admin Dashboard"}</h1>
            <p className="text-muted">{dictionary?.admin?.header_subtitle || "Manage users, approvals, and content"}</p>
          </div>
          <button onClick={refreshAllData} className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-tertiary transition-colors flex items-center gap-2">
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
                    <button onClick={refreshAllData} className="p-4 bg-tertiary rounded-xl text-left hover:bg-background transition-colors">
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
                        <th className="pb-3 font-medium text-start w-12"></th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.name || "Name"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.email || "Email"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.jobs?.governorate || "Governorate"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.role || "Role"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.status || "Status"}</th>
                        <th className="pb-3 font-medium text-start">{dictionary?.admin?.users?.table?.actions || "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/50 hover:bg-tertiary/50 cursor-pointer transition-colors" onClick={() => handleViewUserProfile(user)}>
                          <td className="py-4">
                            <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center overflow-hidden flex-shrink-0 text-lg">
                              {user.profilePhoto ? (
                                <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                              ) : user.gender === 'female' ? (
                                <span>👩</span>
                              ) : user.gender === 'male' ? (
                                <span>👨</span>
                              ) : (
                                <svg className="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                              )}
                            </div>
                          </td>
                          <td className="py-4 font-medium">
                            <div>{user.name}</div>
                            <div className="text-xs text-muted">REPS #{user.repsId || user.id?.slice(0, 8)}</div>
                          </td>
                          <td className="py-4 text-muted">{user.email}</td>
                          <td className="py-4 text-sm">
                            {dictionary?.admin?.jobs?.governorates?.[user.governorate] || user.governorate || '-'}
                          </td>
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
                          <td className="py-4" onClick={(e) => e.stopPropagation()}>
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

            {/* Gallery Tab */}
            {activeTab === "Gallery" && (
              <div>
                <GalleryDashboard dictionary={dictionary} />
              </div>
            )}

            {/* News Tab */}
            {activeTab === "News" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{dictionary?.admin?.news?.title || "News Articles"} ({news.length})</h2>
                  <button onClick={() => { setEditItem(null); setArticleImages([]); setCoverImagePreview(null); setShowModal("news"); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 flex items-center gap-2">
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
                        <button onClick={() => { setViewItem(article); }} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full hover:bg-blue-500/20">{dictionary?.admin?.news?.view_full || "View Full"}</button>
                        <button onClick={() => { setEditItem(article); setArticleImages(article.images || []); setCoverImagePreview(article.imageUrl || article.image || null); setShowModal("news"); }} className="px-3 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full hover:bg-amber-500/20">{dictionary?.admin?.news?.edit || "Edit"}</button>
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
                            <span className="font-medium capitalize">{dictionary?.admin?.pages?.page_names?.[setting.pageId] || setting.name}</span>
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
                            <span className="font-medium capitalize">{dictionary?.admin?.pages?.page_names?.[setting.pageId] || setting.name}</span>
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
                            <span className="font-medium capitalize">{dictionary?.admin?.pages?.page_names?.[setting.pageId] || setting.name}</span>
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

            {/* Partners Tab */}
            {activeTab === "Partners" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">{dictionary?.admin?.partners?.title || "Partners Management"}</h2>
                  <p className="text-muted text-sm">{dictionary?.admin?.partners?.subtitle || "Add, manage, and organize your business partners"}</p>
                </div>
                <PartnersDashboard dictionary={dictionary?.admin?.partners} />
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === "Jobs" && (
              <div className="bg-secondary border border-border rounded-2xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">{dictionary?.admin?.jobs?.title || "Jobs Management"}</h2>
                  <p className="text-muted text-sm">{dictionary?.admin?.jobs?.subtitle || "Add, manage, and delete available job positions"}</p>
                </div>

                <button 
                  onClick={() => { resetJobForm(); setShowModal("job"); }} 
                  className="mb-6 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  {dictionary?.admin?.jobs?.add_job || "Add New Job"}
                </button>

                <div className="space-y-4">
                  {jobs.length === 0 ? (
                    <p className="text-muted text-center py-8">{dictionary?.admin?.jobs?.no_jobs || "No jobs available"}</p>
                  ) : (
                    jobs.map((job) => (
                      <div key={job._id || job.id} className="bg-tertiary border border-border rounded-xl p-5 flex justify-between items-center">
                        <div className="flex-1 flex items-center gap-4">
                          {job.logo && (
                            <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold">{job.title}</h3>
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                job.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {job.isPublished ? (dictionary?.admin?.jobs?.published || 'Published') : (dictionary?.admin?.jobs?.draft || 'Draft')}
                              </span>
                              {job.featured && (
                                <span className="px-2 py-0.5 bg-red-600/20 text-red-400 rounded text-xs font-bold">Featured</span>
                              )}
                            </div>
                            <p className="text-sm text-muted">{job.company} • {job.location} • {job.salary} {dictionary?.admin?.jobs?.currencies?.[job.currency] || job.currency}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setJobTitle(job.title);
                              setJobCompany(job.company);
                              setJobLocation(job.location);
                              setJobGovernorate(job.governorate || "");
                              setJobType(job.type);
                              setJobSalary(job.salary);
                              setJobCurrency(job.currency || "EGP");
                              setJobDescription(job.description);
                              setJobLogo(job.logo);
                              setJobLogoPreview(job.logo);
                              setJobFeatured(job.featured || false);
                              setJobPublished(job.isPublished !== false);
                              setEditItem(job);
                              setShowModal("job");
                            }}
                            className="px-3 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full hover:bg-amber-500/20"
                          >
                            {dictionary?.admin?.jobs?.edit || "Edit"}
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job._id || job.id)} 
                            className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-full hover:bg-red-500/20"
                          >
                            {dictionary?.admin?.jobs?.delete || "Delete"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Job Modal */}
                {showModal === "job" && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-secondary border border-border rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">{editItem ? (dictionary?.admin?.jobs?.edit || "Edit Job") : (dictionary?.admin?.jobs?.add_job || "Add New Job")}</h3>
                        <button onClick={() => { setShowModal(null); resetJobForm(); }} className="text-muted hover:text-foreground">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Job Title */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.job_title || "Job Title"}</label>
                          <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                            placeholder="e.g., Senior Personal Trainer"
                          />
                        </div>

                        {/* Company Name */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.company_name || "Company Name"}</label>
                          <input
                            type="text"
                            value={jobCompany}
                            onChange={(e) => setJobCompany(e.target.value)}
                            className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                            placeholder="e.g., Gold's Gym"
                          />
                        </div>

                        {/* Location */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.location || "Location"}</label>
                          <input
                            type="text"
                            value={jobLocation}
                            onChange={(e) => setJobLocation(e.target.value)}
                            className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                            placeholder="e.g., New Cairo"
                          />
                        </div>

                        {/* Governorate */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.governorate || "Governorate"}</label>
                          <select
                            value={jobGovernorate}
                            onChange={(e) => setJobGovernorate(e.target.value)}
                            className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                          >
                            <option value="">{dictionary?.admin?.jobs?.select_governorate || "Select a governorate"}</option>
                            {Object.entries(dictionary?.admin?.jobs?.governorates || {}).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Salary & Currency & Type */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.salary || "Salary"}</label>
                            <input
                              type="text"
                              value={jobSalary}
                              onChange={(e) => setJobSalary(e.target.value)}
                              className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                              placeholder="e.g., 15,000 - 20,000"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.currency || "Currency"}</label>
                            <select
                              value={jobCurrency}
                              onChange={(e) => setJobCurrency(e.target.value)}
                              className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                            >
                              <option value="EGP">EGP</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="AED">AED</option>
                              <option value="SAR">SAR</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.job_type || "Job Type"}</label>
                            <select
                              value={jobType}
                              onChange={(e) => setJobType(e.target.value)}
                              className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                            >
                              <option value="full_time">{dictionary?.admin?.jobs?.type_full_time || "Full-time"}</option>
                              <option value="part_time">{dictionary?.admin?.jobs?.type_part_time || "Part-time"}</option>
                              <option value="contract">{dictionary?.admin?.jobs?.type_contract || "Contract"}</option>
                            </select>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.description || "Job Description"}</label>
                          <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 resize-none"
                            placeholder="Describe the job position..."
                          />
                        </div>

                        {/* Logo Upload */}
                        <div>
                          <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.jobs?.logo || "Company Logo"}</label>
                          <div className="flex items-center gap-4">
                            {jobLogoPreview && (
                              <img src={jobLogoPreview} alt="Logo preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
                            )}
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploadingJobLogo}
                              className="flex-1 px-4 py-2.5 bg-tertiary border border-border rounded-lg text-sm hover:border-red-500 transition-colors disabled:opacity-50"
                            >
                              {uploadingJobLogo ? "Uploading..." : (dictionary?.admin?.jobs?.logo || "Upload Logo")}
                            </button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleJobLogoUpload}
                              className="hidden"
                            />
                          </div>
                        </div>

                        {/* Featured & Published */}
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={jobFeatured}
                              onChange={(e) => setJobFeatured(e.target.checked)}
                              className="w-4 h-4 rounded"
                            />
                            <span className="text-sm font-medium">{dictionary?.admin?.jobs?.featured || "Featured"}</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={jobPublished}
                              onChange={(e) => setJobPublished(e.target.checked)}
                              className="w-4 h-4 rounded"
                            />
                            <span className="text-sm font-medium">{dictionary?.admin?.jobs?.published || "Published"}</span>
                          </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end mt-6">
                          <button
                            onClick={() => { setShowModal(null); resetJobForm(); }}
                            className="px-4 py-2 bg-tertiary border border-border rounded-lg hover:bg-secondary transition-colors"
                          >
                            {dictionary?.admin?.jobs?.cancel_btn || "Cancel"}
                          </button>
                          <button
                            onClick={() => {
                              if (editItem) {
                                handleUpdateJob(editItem._id || editItem.id);
                              } else {
                                handleAddJob();
                              }
                            }}
                            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                          >
                            {editItem ? (dictionary?.admin?.jobs?.save_btn || "Save Changes") : (dictionary?.admin?.jobs?.add_btn || "Add Job")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Emails Tab */}
            {activeTab === "Emails" && (
              <div className="space-y-8">
                {/* Header */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-2">{dictionary?.admin?.emails?.title || "Email Management"}</h2>
                  <p className="text-muted text-sm">{dictionary?.admin?.emails?.subtitle || "Send bulk emails to users and manage organization email addresses"}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Organization Emails */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <span className="text-xl">📧</span>
                      {dictionary?.admin?.emails?.organization_emails || "Organization Emails"}
                    </h3>
                    
                    {/* Add New Email */}
                    <div className="flex flex-col gap-2 mb-4">
                      <input
                        type="email"
                        placeholder={dictionary?.admin?.emails?.email_placeholder || "email@organization.com"}
                        value={newEmailAddress}
                        onChange={(e) => setNewEmailAddress(e.target.value)}
                        className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={dictionary?.admin?.emails?.label_placeholder || "Label (e.g., Support)"}
                          value={newEmailLabel}
                          onChange={(e) => setNewEmailLabel(e.target.value)}
                          className="flex-1 bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                        />
                        <button
                          onClick={handleAddOrganizationEmail}
                          className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 text-sm whitespace-nowrap"
                        >
                          {dictionary?.admin?.emails?.add_email || "Add Email"}
                        </button>
                      </div>
                    </div>

                    {/* Email List */}
                    <div className="space-y-2">
                      {organizationEmails.length === 0 ? (
                        <p className="text-muted text-sm text-center py-4">{dictionary?.admin?.emails?.no_emails || "No organization emails configured"}</p>
                      ) : (
                        organizationEmails.map((email) => (
                          <div key={email.id} className="flex items-center justify-between p-3 bg-tertiary rounded-lg border border-border">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{email.label}</p>
                              <p className="text-xs text-muted">{email.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {email.isDefault ? (
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                                  {dictionary?.admin?.emails?.default || "Default"}
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSetDefaultEmail(email.id)}
                                  className="text-xs text-blue-400 hover:underline"
                                >
                                  {dictionary?.admin?.emails?.set_default || "Set Default"}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteOrganizationEmail(email.id)}
                                className="text-red-500 hover:text-red-400 p-1"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recipient Filters */}
                  <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      {dictionary?.admin?.emails?.filters || "Recipient Filters"}
                    </h3>

                    {/* Role Filter */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.filter_role || "Role"}</label>
                      <div className="flex flex-wrap gap-2">
                        {['trainer', 'trainee', 'admin'].map((role) => (
                          <button
                            key={role}
                            onClick={() => toggleRoleFilter(role)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              emailFilters.roles.includes(role)
                                ? 'bg-red-600 text-white'
                                : 'bg-tertiary text-muted hover:text-foreground border border-border'
                            }`}
                          >
                            {dictionary?.admin?.users?.roles?.[role] || role}
                          </button>
                        ))}
                        {emailFilters.roles.length === 0 && (
                          <span className="text-xs text-muted italic px-2 py-1">{dictionary?.admin?.emails?.all_roles || "All roles"}</span>
                        )}
                      </div>
                    </div>

                    {/* Age Range */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.filter_age_range || "Age Range"}</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          placeholder={dictionary?.admin?.emails?.filter_age_min || "Min"}
                          value={emailFilters.ageMin}
                          onChange={(e) => setEmailFilters(prev => ({ ...prev, ageMin: e.target.value }))}
                          className="w-24 bg-tertiary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                        />
                        <span className="text-muted">—</span>
                        <input
                          type="number"
                          placeholder={dictionary?.admin?.emails?.filter_age_max || "Max"}
                          value={emailFilters.ageMax}
                          onChange={(e) => setEmailFilters(prev => ({ ...prev, ageMax: e.target.value }))}
                          className="w-24 bg-tertiary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    {/* ID Range */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.filter_id_range || "REPS ID Range"}</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          placeholder={dictionary?.admin?.emails?.filter_id_min || "Min ID"}
                          value={emailFilters.idMin}
                          onChange={(e) => setEmailFilters(prev => ({ ...prev, idMin: e.target.value }))}
                          className="w-28 bg-tertiary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                        />
                        <span className="text-muted">—</span>
                        <input
                          type="number"
                          placeholder={dictionary?.admin?.emails?.filter_id_max || "Max ID"}
                          value={emailFilters.idMax}
                          onChange={(e) => setEmailFilters(prev => ({ ...prev, idMax: e.target.value }))}
                          className="w-28 bg-tertiary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    {/* Recipient Count Preview */}
                    <div className="bg-tertiary rounded-xl p-4 text-center border border-border">
                      <p className="text-3xl font-bold text-red-500">{recipientCount}</p>
                      <p className="text-sm text-muted">{dictionary?.admin?.emails?.recipients || "recipients match filters"}</p>
                    </div>
                  </div>
                </div>

                {/* Email Composer */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">✉️</span>
                    {dictionary?.admin?.emails?.compose || "Compose Email"}
                  </h3>

                  <div className="space-y-4">
                    {/* From Email */}
                    <div>
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.from || "From"}</label>
                      <select
                        value={selectedFromEmail}
                        onChange={(e) => setSelectedFromEmail(e.target.value)}
                        className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                      >
                        <option value="">{dictionary?.admin?.emails?.select_email || "Select sender email..."}</option>
                        {organizationEmails.map((email) => (
                          <option key={email.id} value={email.id}>{email.label} ({email.email})</option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.subject || "Subject"}</label>
                      <input
                        type="text"
                        placeholder={dictionary?.admin?.emails?.subject_placeholder || "Email subject..."}
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="text-xs font-bold text-muted uppercase mb-2 block">{dictionary?.admin?.emails?.content || "Content"}</label>
                      <textarea
                        placeholder={dictionary?.admin?.emails?.content_placeholder || "Write your email content..."}
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        rows={8}
                        className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 resize-none"
                      />
                    </div>

                    {/* Send Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSendBulkEmail}
                        disabled={sendingEmail || !selectedFromEmail || !emailSubject || !emailContent || recipientCount === 0}
                        className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {sendingEmail ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            {dictionary?.admin?.emails?.sending || "Sending..."}
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            {dictionary?.admin?.emails?.send || "Send Email"} ({recipientCount})
                          </>
                        )}
                      </button>
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
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-lg p-6 max-h-[90vh] flex flex-col">
              <h3 className="text-xl font-bold mb-6">{editItem ? (dictionary?.admin?.news?.modal?.edit_title || "Edit Article") : (dictionary?.admin?.news?.modal?.new_title || "New Article")}</h3>
              <form id="newsForm" onSubmit={handleSaveNews} className="space-y-4 overflow-y-auto flex-1 pr-2">
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
                  <textarea name="description" defaultValue={editItem?.description} rows={3} required className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.content_label || "Full Article Content"}</label>
                  <textarea name="content" defaultValue={editItem?.content} rows={5} placeholder="Write the full article content here..." className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
                </div>

                {/* صورة الغلاف الرئيسية */}
                <div className="border-2 border-dashed border-red-600/50 rounded-lg p-4 bg-red-600/5">
                  <label className="text-xs font-bold text-red-500 uppercase mb-3 block">
                    {dictionary?.admin?.news?.modal?.cover_image_label || "Cover Image"}
                    <span className="text-xs text-muted font-normal block mt-1">{dictionary?.admin?.news?.modal?.cover_image_desc || "(appears on card and popup)"}</span>
                  </label>
                  
                  {/* معاينة الصورة الأساسية */}
                  {(coverImagePreview || editItem?.imageUrl || editItem?.image) && (
                    <div className="mb-4">
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-red-600 bg-black/20">
                        <img src={coverImagePreview || editItem?.imageUrl || editItem?.image} alt="Cover Image" className="w-full h-full object-cover" />
                      </div>
                      {coverImagePreview && (
                        <button
                          type="button"
                          onClick={() => setCoverImagePreview(null)}
                          className="mt-2 text-xs text-red-500 hover:text-red-600 font-bold"
                        >
                          {dictionary?.admin?.news?.modal?.cover_image_remove || "✕ Remove Image"}
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* زر تحميل صورة الغلاف */}
                  <label className="cursor-pointer block bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-3 rounded-lg text-center transition-colors">
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{uploadingCover ? (dictionary?.admin?.news?.modal?.uploading || "Uploading...") : (dictionary?.admin?.news?.modal?.cover_image_btn || "Choose Cover Image")}</span>
                    <input type="file" accept="image/*" onChange={handleCoverImageUpload} disabled={uploadingCover} className="hidden" />
                  </label>
                </div>

                {/* الصور الإضافية */}
                <div>
                  <label className="text-xs font-bold text-muted uppercase">{dictionary?.admin?.news?.modal?.gallery_label || "Additional Gallery Images"}</label>
                  <input type="hidden" name="images" value={JSON.stringify(articleImages)} />
                  
                  {/* معرض الصور المضافة */}
                  {articleImages.length > 0 && (
                    <div className="mt-3 mb-4">
                      <p className="text-xs text-muted mb-2">{dictionary?.admin?.news?.modal?.gallery_list || "Added Images"} ({articleImages.length})</p>
                      <div className="grid grid-cols-3 gap-3">
                        {articleImages.map((img, idx) => (
                          <div key={idx} className="relative w-full aspect-square rounded-lg overflow-hidden border border-border hover:border-red-600 transition-colors">
                            <img src={img} alt={`صورة ${idx+1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 shadow-lg"
                            >
                              {dictionary?.admin?.news?.modal?.gallery_remove_hint || "✕"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* زر تحميل الصور الإضافية */}
                  <label className="cursor-pointer block bg-secondary hover:bg-tertiary border border-border text-foreground text-sm font-bold px-4 py-2.5 rounded-lg text-center transition-colors mt-2">
                    <svg className="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span>{uploadingImage ? (dictionary?.admin?.news?.modal?.uploading || "Uploading...") : (dictionary?.admin?.news?.modal?.gallery_add_btn || "Add Gallery Images")}</span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryImageUpload} disabled={uploadingImage} className="hidden" />
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isPublished" defaultChecked={editItem?.isPublished} id="isPublished" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <label htmlFor="isPublished" className="text-sm text-muted">{dictionary?.admin?.news?.modal?.publish_immediate || "Publish immediately"}</label>
                </div>
              </form>
              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
                <button type="button" onClick={() => { setShowModal(null); setArticleImages([]); setCoverImagePreview(null); }} className="px-4 py-2 text-muted hover:text-white transition-colors">{dictionary?.admin?.news?.modal?.cancel || "الإلغاء"}</button>
                <button type="submit" form="newsForm" disabled={uploadingImage || uploadingCover} className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {uploadingImage || uploadingCover ? "..." : (editItem ? (dictionary?.admin?.news?.modal?.update || "تحديث") : (dictionary?.admin?.news?.modal?.confirm || "تأكيد"))}
                </button>
              </div>
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
                    <input name="fullName" defaultValue={editItem.fullName || editItem.name} className="w-full bg-tertiary border border-border rounded-lg px-4 py-2.5 mt-1 focus:outline-none focus:border-red-500" />
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
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Check if this is an article or approval */}
              {viewItem.title ? (
                // Article View
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{viewItem.title}</h2>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{viewItem.category}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${viewItem.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {viewItem.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setViewItem(null)} className="text-muted hover:text-foreground text-xl">✕</button>
                  </div>
                  
                  {/* Article Image */}
                  {(viewItem.imageUrl || viewItem.image) && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-border">
                      <img src={viewItem.imageUrl || viewItem.image} alt={viewItem.title} className="w-full h-96 object-cover" />
                    </div>
                  )}
                  
                  {/* Article Images Gallery */}
                  {viewItem.images && viewItem.images.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-muted uppercase font-bold mb-3">صور المقال ({viewItem.images.length})</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {viewItem.images.map((img, idx) => (
                          <div key={idx} className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer">
                            <img src={img} alt={`Article ${idx+1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Description */}
                  <div className="mb-6 p-4 bg-tertiary rounded-xl border border-border">
                    <p className="text-sm text-muted uppercase font-bold mb-2">Description</p>
                    <p className="text-foreground leading-relaxed">{viewItem.description}</p>
                  </div>
                  
                  {/* Full Content */}
                  {viewItem.content && (
                    <div className="mb-6 p-4 bg-tertiary rounded-xl border border-border">
                      <p className="text-sm text-muted uppercase font-bold mb-2">Full Article</p>
                      <div className="prose prose-invert max-w-none text-foreground leading-relaxed whitespace-pre-wrap">{viewItem.content}</div>
                    </div>
                  )}
                  
                  {/* Article Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      onClick={() => { setEditItem(viewItem); setShowModal("news"); setViewItem(null); }}
                      className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600"
                    >
                      Edit Article
                    </button>
                    <button
                      onClick={() => { handleDeleteNews(viewItem.id); setViewItem(null); }}
                      className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
                    >
                      Delete Article
                    </button>
                  </div>
                </>
              ) : (
                // Approval Request View - Full Details
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center overflow-hidden">
                        {viewItem.profilePhoto ? (
                          <img src={viewItem.profilePhoto} alt={viewItem.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-8 h-8 text-muted" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{viewItem.name}</h3>
                        <p className="text-muted text-sm">{viewItem.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setViewItem(null)} className="text-muted hover:text-foreground text-xl">✕</button>
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${viewItem.actionType === 'qualification' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {viewItem.actionType === 'qualification' ? 'Qualification Change' : 'New Registration'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                      {viewItem.role || 'trainer'}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-tertiary rounded-xl p-4">
                      <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.table?.role || "Role"}</p>
                      <p className="font-medium capitalize">{viewItem.role || "trainer"}</p>
                    </div>
                    {viewItem.specialization && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.specialization || "Specialization"}</p>
                        <p className="font-medium">{viewItem.specialization}</p>
                      </div>
                    )}
                    {viewItem.phone && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.phone || "Phone"}</p>
                        <p className="font-medium" dir="ltr">{viewItem.phone}</p>
                      </div>
                    )}
                    {viewItem.birthDate && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.birth_date || "Birth Date"}</p>
                        <p className="font-medium">{new Date(viewItem.birthDate).toLocaleDateString()}{viewItem.age ? ` (${viewItem.age} yrs)` : ''}</p>
                      </div>
                    )}
                    {viewItem.gender && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.gender || "Gender"}</p>
                        <p className="font-medium capitalize">{viewItem.gender === 'male' ? (dictionary?.profile_page?.gender_male || 'Male') : (dictionary?.profile_page?.gender_female || 'Female')}</p>
                      </div>
                    )}
                    {viewItem.governorate && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.jobs?.governorate || "Governorate"}</p>
                        <p className="font-medium">{dictionary?.admin?.jobs?.governorates?.[viewItem.governorate] || viewItem.governorate}</p>
                      </div>
                    )}
                    {viewItem.repsId && (
                      <div className="bg-tertiary rounded-xl p-4">
                        <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.reps_id || "REPS ID"}</p>
                        <p className="font-medium">{viewItem.repsId}</p>
                      </div>
                    )}
                    <div className="bg-tertiary rounded-xl p-4">
                      <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.member_since || "Request Date"}</p>
                      <p className="font-medium">{viewItem.date || "N/A"}</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  {viewItem.socialMedia && Object.values(viewItem.socialMedia).some(v => v) && (
                    <div className="bg-tertiary rounded-xl p-4 mb-6">
                      <p className="text-xs text-muted uppercase font-bold mb-2">{dictionary?.profile_page?.social_media || "Social Media"}</p>
                      <div className="space-y-1">
                        {Object.entries(viewItem.socialMedia).map(([key, value]) => (
                          value && <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm block capitalize">{key}: {value}</a>
                        ))}
                      </div>
                    </div>
                  )}

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
                            {typeof file === 'string' ? (
                              file.startsWith('data:') || file.startsWith('http') ? (
                                <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Document {idx + 1}</a>
                              ) : <span>{file}</span>
                            ) : (
                              <a href={file.url || file.data || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{file.name || `Document ${idx + 1}`}</a>
                            )}
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
                      {dictionary?.admin?.overview?.approve || "Approve"}
                    </button>
                    <button
                      onClick={() => handleApprovalAction(viewItem, "rejected")}
                      className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      {dictionary?.admin?.overview?.reject || "Reject"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* User Profile Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
            <div className="bg-secondary border border-border rounded-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-tertiary flex items-center justify-center overflow-hidden">
                    {selectedUser.profilePhoto ? (
                      <img src={selectedUser.profilePhoto} alt={selectedUser.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-10 h-10 text-muted" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.fullName}</h2>
                    <p className="text-muted text-sm">{selectedUser.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-muted hover:text-foreground text-xl">✕</button>
              </div>

              {/* User Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.table?.role || "Role"}</p>
                  <p className="font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.table?.status || "Status"}</p>
                  <span className={`px-2 py-1 rounded text-xs font-bold inline-block ${selectedUser.status === 'approved' ? 'bg-green-500/20 text-green-400' : selectedUser.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div className="bg-tertiary rounded-xl p-4">
                  <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.table?.phone || "Phone"}</p>
                  <p className="font-medium" dir="ltr">{selectedUser.phone || "N/A"}</p>
                </div>
                {selectedUser.specialization && (
                  <div className="bg-tertiary rounded-xl p-4">
                    <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.users?.specialization || "Specialization"}</p>
                    <p className="font-medium">{selectedUser.specialization}</p>
                  </div>
                )}
                {selectedUser.birthDate && (
                  <div className="bg-tertiary rounded-xl p-4">
                    <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.birth_date || "Birth Date"}</p>
                    <p className="font-medium">{new Date(selectedUser.birthDate).toLocaleDateString()}{selectedUser.age ? ` (${selectedUser.age} yrs)` : ''}</p>
                  </div>
                )}
                {selectedUser.gender && (
                  <div className="bg-tertiary rounded-xl p-4">
                    <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.gender || "Gender"}</p>
                    <p className="font-medium capitalize">{selectedUser.gender === 'male' ? (dictionary?.profile_page?.gender_male || 'Male') : (dictionary?.profile_page?.gender_female || 'Female')}</p>
                  </div>
                )}
                {selectedUser.governorate && (
                  <div className="bg-tertiary rounded-xl p-4">
                    <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.admin?.jobs?.governorate || "Governorate"}</p>
                    <p className="font-medium">{dictionary?.admin?.jobs?.governorates?.[selectedUser.governorate] || selectedUser.governorate}</p>
                  </div>
                )}
                {selectedUser.repsId && (
                  <div className="bg-tertiary rounded-xl p-4">
                    <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.reps_id || "REPS ID"}</p>
                    <p className="font-medium">{selectedUser.repsId}</p>
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <div className="bg-tertiary rounded-xl p-4 mb-6">
                  <p className="text-xs text-muted uppercase font-bold mb-2">{dictionary?.profile_page?.bio || "Bio"}</p>
                  <p className="text-sm">{selectedUser.bio}</p>
                </div>
              )}

              {/* Location & Social */}
              {(selectedUser.location || selectedUser.socialLinks || (selectedUser.socialMedia && Object.values(selectedUser.socialMedia).some(v => v))) && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedUser.location && (
                    <div className="bg-tertiary rounded-xl p-4">
                      <p className="text-xs text-muted uppercase font-bold mb-1">{dictionary?.profile_page?.location || "Location"}</p>
                      <p className="text-sm">{selectedUser.location}</p>
                    </div>
                  )}
                  {selectedUser.socialMedia && Object.values(selectedUser.socialMedia).some(v => v) && (
                    <div className="bg-tertiary rounded-xl p-4">
                      <p className="text-xs text-muted uppercase font-bold mb-2">{dictionary?.profile_page?.social_media || "Social Media"}</p>
                      <div className="space-y-1">
                        {Object.entries(selectedUser.socialMedia).map(([key, value]) => (
                          value && <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm block capitalize">{key}: {value}</a>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedUser.socialLinks && Object.keys(selectedUser.socialLinks).length > 0 && (
                    <div className="bg-tertiary rounded-xl p-4">
                      <p className="text-xs text-muted uppercase font-bold mb-2">Social Links</p>
                      <div className="space-y-1">
                        {Object.entries(selectedUser.socialLinks).map(([key, value]) => (
                          value && <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm block">{key}</a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Member Since */}
              {selectedUser.createdAt && (
                <div className="bg-tertiary rounded-xl p-4 mb-6">
                  <p className="text-xs text-muted uppercase font-bold mb-1">Member Since</p>
                  <p className="text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              )}

              {/* Alerts Section */}
              <div className="mb-6">
                <div className="bg-tertiary rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">⚠️ {dictionary?.admin?.users?.profile?.alerts || "Alerts"}</h3>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">{userAlerts.length}</span>
                  </div>
                  
                  {/* Add New Alert */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                    <textarea
                      value={newAlertText}
                      onChange={(e) => setNewAlertText(e.target.value)}
                      placeholder={dictionary?.admin?.users?.profile?.alert_placeholder || "Add an alert about this user..."}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-500"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <select
                        value={alertSeverity}
                        onChange={(e) => setAlertSeverity(e.target.value)}
                        className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-red-500"
                      >
                        <option value="info">{dictionary?.admin?.users?.profile?.alert_severity?.info || "Info 🔵"}</option>
                        <option value="warning">{dictionary?.admin?.users?.profile?.alert_severity?.warning || "Warning ⚠️"}</option>
                        <option value="danger">{dictionary?.admin?.users?.profile?.alert_severity?.danger || "Danger 🔴"}</option>
                      </select>
                      <button
                        onClick={handleAddAlert}
                        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 text-sm"
                      >
                        {dictionary?.admin?.users?.profile?.add_alert || "Add Alert"}
                      </button>
                    </div>
                  </div>

                  {/* Existing Alerts */}
                  {userAlerts.length === 0 ? (
                    <p className="text-muted text-sm">{dictionary?.admin?.users?.profile?.no_alerts || "No alerts"}</p>
                  ) : (
                    <div className="space-y-2">
                      {userAlerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-l-4 ${
                            alert.severity === 'danger'
                              ? 'bg-red-500/10 border-red-500 text-red-400'
                              : alert.severity === 'warning'
                              ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                              : 'bg-blue-500/10 border-blue-500 text-blue-400'
                          }`}
                        >
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(alert.timestamp).toLocaleString('en-US')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Notes Section */}
              <div className="mb-6">
                <div className="bg-tertiary rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">📝 {dictionary?.admin?.users?.profile?.activity_log || "Activity Log"}</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {selectedUser?.activityNotes?.length || 0}
                    </span>
                  </div>

                  {/* Add New Note */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-border">
                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder={dictionary?.admin?.users?.profile?.note_placeholder || "Write a note about this user..."}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted focus:outline-none focus:border-blue-500"
                      rows="2"
                    />
                    <button
                      onClick={handleAddNote}
                      className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-sm"
                    >
                      {dictionary?.admin?.users?.profile?.add_note || "Add Note"}
                    </button>
                  </div>

                  {/* Existing Notes */}
                  {(!selectedUser?.activityNotes || selectedUser.activityNotes.length === 0) ? (
                    <p className="text-muted text-sm">{dictionary?.admin?.users?.profile?.no_notes || "No notes yet"}</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedUser.activityNotes.map((note, idx) => (
                        <div key={idx} className="bg-background rounded-lg p-3 border border-border/50">
                          <p className="text-sm text-foreground">{note.message}</p>
                          <p className="text-xs text-muted mt-2">
                            {new Date(note.timestamp).toLocaleString('en-US')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border flex-wrap">
                {selectedUser.profilePhoto && (
                  <button
                    onClick={handleDeleteUserPhoto}
                    className="flex-1 min-w-[150px] py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    {dictionary?.admin?.users?.profile?.delete_photo || "Delete Photo"}
                  </button>
                )}
                <button
                  onClick={() => { setSelectedUser(null); setEditItem(selectedUser); setShowModal("user"); }}
                  className="flex-1 min-w-[150px] py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600"
                >
                  {dictionary?.admin?.users?.profile?.edit_user || "Edit User"}
                </button>
                <button
                  onClick={() => { handleDeleteUser(selectedUser.id); setSelectedUser(null); }}
                  className="flex-1 min-w-[150px] py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
                >
                  {dictionary?.admin?.users?.profile?.delete_user || "Delete User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
