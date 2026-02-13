# Coach Contact System - Deployment & Verification Checklist

## ✅ Pre-Deployment Checklist

### Environment Setup
- [ ] `.env.local` file created with all required variables
- [ ] `RESEND_API_KEY` is valid and active
- [ ] `MONGODB_URI` and `MONGODB_DB` are correct
- [ ] All database credentials are correct
- [ ] Test connection to MongoDB
- [ ] Test Resend email service with test email

### Code Review
- [ ] All new files are created in correct locations
  - [ ] `src/lib/rate-limiter.js`
  - [ ] `src/lib/validate-contact.js`
  - [ ] `src/lib/security.js`
  - [ ] `src/app/api/contact-coach/[coachId]/route.js`
  - [ ] Updated `src/lib/email.js`
  - [ ] Updated `src/components/coaches/MessageCoachForm.jsx`
- [ ] No syntax errors in any file
- [ ] No import errors in any file
- [ ] All dependencies are installed (`npm install`)

### Component Integration
- [ ] Coach profile page imports `MessageCoachForm`
- [ ] Coach profile page passes correct props:
  - [ ] `coachId` as string (converted from ObjectId)
  - [ ] `coachName` as string
  - [ ] `dictionary` object (optional but recommended)
- [ ] i18n dictionaries updated (optional but recommended)
- [ ] Form appears when coach profile loads

### Database Verification
- [ ] At least one coach exists with:
  - [ ] `role: "trainer"`
  - [ ] `email` field populated
  - [ ] Status is "approved"
- [ ] Coach ID is valid MongoDB ObjectId format
- [ ] No coaches with `role: "trainee"` should receive messages

### Security Verification
- [ ] Rate limiting is working (test sending 6 messages)
- [ ] Input validation is working (test invalid inputs)
- [ ] Email header injection is blocked (newlines in email)
- [ ] XSS patterns are detected
- [ ] Coach email is NOT exposed in API response
- [ ] Error messages don't reveal sensitive info

## 🧪 Testing Checklist

### Unit Testing
- [ ] Rate limiter logic works correctly
- [ ] Validation functions work for all field types
- [ ] Security functions detect XSS patterns
- [ ] Security functions detect injection patterns
- [ ] Email escaping works properly

### Integration Testing
- [ ] Form displays on coach profile page
- [ ] Form validates all required fields
- [ ] Form rejects invalid email format
- [ ] Form rejects message < 10 characters
- [ ] Form rejects message > 2000 characters
- [ ] Form rejects subject > 200 characters
- [ ] Form rejects name > 100 characters
- [ ] API endpoint accepts valid request
- [ ] API endpoint returns 200 for valid message
- [ ] API endpoint returns 400 for invalid input
- [ ] API endpoint returns 404 for non-existent coach
- [ ] API endpoint returns 404 for non-trainer user
- [ ] API endpoint returns 429 for rate limit
- [ ] Rate limit resets after time window
- [ ] Email is sent to coach's email address
- [ ] Email contains all message details
- [ ] Reply-To header has visitor's email
- [ ] Form clears after successful send
- [ ] Success message displays to user
- [ ] Error messages display to user

### End-to-End Testing
- [ ] Visit coach profile page
- [ ] Click to expand message form
- [ ] Fill all form fields
- [ ] Click send message
- [ ] See loading state
- [ ] See success message
- [ ] Check coach's email inbox
- [ ] Verify email content and formatting
- [ ] Reply to coach's email
- [ ] Verify reply goes to visitor

### Security Testing
- [ ] Try email header injection (CRLF in email)
- [ ] Try XSS in message (script tags)
- [ ] Try SQL injection patterns
- [ ] Try NoSQL injection patterns
- [ ] Try very long inputs
- [ ] Try null bytes in inputs
- [ ] Try rapid requests (rate limiting)
- [ ] All attempts should be blocked/rejected

### Responsiveness Testing
- [ ] Form works on desktop (1920px)
- [ ] Form works on tablet (768px)
- [ ] Form works on mobile (375px)
- [ ] Form is readable on all sizes
- [ ] Buttons are clickable on mobile
- [ ] Error messages display properly
- [ ] Character counter works on mobile

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Internationalization Testing
- [ ] Form displays in English
- [ ] Form displays in Arabic
- [ ] All text is translated
- [ ] Form works with right-to-left layout
- [ ] Date formats are correct
- [ ] Character limits work with RTL text

## 🔧 Configuration Verification

### Resend Email Service
- [ ] Domain is verified in Resend dashboard
- [ ] From email is correct: `no-reply@reps-egypt.com`
- [ ] API key is valid and active
- [ ] Email quota is sufficient
- [ ] Email sending is not rate limited

### MongoDB
- [ ] Connection string is correct
- [ ] Database exists
- [ ] Collections exist
- [ ] At least one coach with valid data exists
- [ ] Can read coach data via findUserById()

### Next.js App
- [ ] App builds without errors: `npm run build`
- [ ] App starts without errors: `npm run dev`
- [ ] All routes are accessible
- [ ] API routes respond correctly

## 📊 Performance Testing

- [ ] Page load time is acceptable (< 3s)
- [ ] Form submission is fast (< 2s)
- [ ] Email delivery is prompt (< 30s)
- [ ] No memory leaks in rate limiter
- [ ] Rate limiter cleanup runs periodically
- [ ] Database queries are efficient

## 🚨 Error Handling Testing

- [ ] Invalid email shows error
- [ ] Too short message shows error
- [ ] Too long message shows error
- [ ] Missing fields show errors
- [ ] Rate limit shows Retry-After
- [ ] Non-existent coach shows 404
- [ ] Non-trainer user shows 404
- [ ] Email service down shows 500
- [ ] Database error shows 500
- [ ] All errors have helpful messages

## 📝 Documentation Verification

- [ ] `.env.example` is complete
- [ ] `COACH_CONTACT_SYSTEM.md` is complete
- [ ] `COACH_CONTACT_QUICK_REFERENCE.md` is complete
- [ ] `IMPLEMENTATION_SUMMARY.md` is complete
- [ ] `COACH_CONTACT_CODE_EXAMPLES.md` is complete
- [ ] All code has comments explaining security decisions
- [ ] API documentation is accurate
- [ ] Setup instructions are clear
- [ ] Troubleshooting guide covers common issues

## 🚀 Production Deployment

### Pre-Production (Staging)
- [ ] Deploy to staging environment
- [ ] Run full test suite on staging
- [ ] Test with real email addresses to staging
- [ ] Verify emails arrive in test inbox
- [ ] Performance test on staging
- [ ] Load test with multiple requests
- [ ] Security scan (OWASP, etc.)
- [ ] Code review by team lead

### Production
- [ ] Create backup of production database
- [ ] Deploy code to production
- [ ] Update environment variables
- [ ] Verify all systems are working
- [ ] Monitor error logs
- [ ] Monitor email delivery logs
- [ ] Test with real coach account
- [ ] Announce feature to coaches
- [ ] Document support procedures

### Post-Deployment
- [ ] Monitor error logs for 24 hours
- [ ] Check email delivery rates
- [ ] Monitor rate limiting hits
- [ ] Collect user feedback
- [ ] Fix any issues immediately
- [ ] Document lessons learned

## 🔍 Monitoring Setup

### Metrics to Track
- [ ] Messages sent per day
- [ ] Messages failed to send
- [ ] Rate limit hits per day
- [ ] Validation errors
- [ ] Security blocks
- [ ] Email delivery time
- [ ] API response time
- [ ] Error rate
- [ ] User satisfaction (feedback)

### Alerts to Configure
- [ ] Email service down
- [ ] High error rate (> 5%)
- [ ] High rate limit hits (potential attack)
- [ ] Database connection issues
- [ ] API endpoint down
- [ ] Suspicious patterns detected

### Logging Points
- [ ] Every successful send
- [ ] Every validation failure
- [ ] Every rate limit hit
- [ ] Every security block
- [ ] Every email failure
- [ ] Every error

## 👥 Team Coordination

- [ ] Notify support team about feature
- [ ] Brief coaches on how to use feature
- [ ] Set up support process for issues
- [ ] Create FAQ for common questions
- [ ] Document troubleshooting steps
- [ ] Assign on-call support person

## 📞 Rollback Plan

- [ ] Document rollback procedure
- [ ] Test rollback process
- [ ] Have database backup ready
- [ ] Have previous code version ready
- [ ] Communicate rollback process to team
- [ ] Plan for customer communication if needed

## ✨ Final Verification

### Day 1 After Deployment
- [ ] All systems operational
- [ ] No error spikes
- [ ] Emails delivering correctly
- [ ] Form working for users
- [ ] No performance issues
- [ ] Support team reports no issues

### Week 1 After Deployment
- [ ] All metrics look healthy
- [ ] No security incidents
- [ ] User feedback is positive
- [ ] No reported bugs
- [ ] Rate limiting effective
- [ ] Email service stable

### Month 1 After Deployment
- [ ] Feature is stable
- [ ] No critical issues
- [ ] User adoption is good
- [ ] Support load is manageable
- [ ] No security concerns
- [ ] Ready to plan enhancements

## 📋 Deployment Sign-Off

**Project**: Coach Contact System  
**Version**: 1.0.0  
**Deployment Date**: _______________  
**Deployed By**: _______________  
**Reviewed By**: _______________  
**Approved By**: _______________  

### Sign-Off Checklist
- [ ] All tests passed
- [ ] All security checks passed
- [ ] All documentation is complete
- [ ] No known issues
- [ ] Team is trained
- [ ] Monitoring is set up
- [ ] Rollback plan is ready
- [ ] Support is ready

**Comments**:
```
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
```

---

**Note**: Complete this checklist before deploying to production. Save
 a copy with dates and names for audit purposes.

**For Support**: Contact development team or review documentation files.

**Last Updated**: February 13, 2024  
**Status**: Ready for Deployment
