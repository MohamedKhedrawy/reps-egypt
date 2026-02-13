# Coach Contact System - Implementation Guide

## 📋 Overview

This document describes the secure coach contact system that allows unauthenticated visitors to send messages to coaches without exposing the coach's real email address.

## ✨ Features

- ✅ **No Authentication Required** - Visitors can contact coaches without logging in
- ✅ **Secure Email Communication** - Coach's real email never exposed to frontend
- ✅ **Rate Limiting** - Prevents spam and abuse
- ✅ **Input Validation** - Comprehensive validation on both client and server
- ✅ **XSS/Injection Prevention** - Multiple layers of security
- ✅ **Email Header Injection Prevention** - Blocks malicious headers
- ✅ **Error Handling** - User-friendly error messages
- ✅ **i18n Support** - Multi-language support ready
- ✅ **Accessible Form** - WCAG compliant form fields

## 🔐 Security Architecture

### 1. **Rate Limiting**
- **File**: `src/lib/rate-limiter.js`
- **Strategy**: In-memory rate limiter tracking IP addresses
- **Limits**: 5 messages per IP address per hour
- **Note**: For distributed production, upgrade to Redis-based rate limiting

```javascript
// Example: 5 requests per 3600000ms (1 hour)
const rateLimitResult = isRateLimited(
    ipAddress,
    5,              // max requests
    3600000         // time window in ms
);
```

### 2. **Input Validation**
- **File**: `src/lib/validate-contact.js`
- **Validations**:
  - Email format (RFC 5322 simplified)
  - Subject length: 3-200 characters
  - Message length: 10-2000 characters
  - Sender name: 2-100 characters
  - Coach ID: Valid MongoDB ObjectId
  - Prevents null bytes and control characters
  - Blocks newlines in email/subject (header injection prevention)

### 3. **Security Sanitization**
- **File**: `src/lib/security.js`
- **Protections**:
  - XSS pattern detection (scripts, event handlers, etc.)
  - SQL/NoSQL injection pattern detection
  - HTML entity escaping
  - Safe email content preparation

### 4. **Backend Validation**
- **File**: `src/app/api/contact-coach/[coachId]/route.js`
- **Steps**:
  1. Extract and validate client IP
  2. Apply rate limiting
  3. Parse and validate request body
  4. Additional security sanitization
  5. Verify coach exists and is a trainer
  6. Send email to coach's real email
  7. Return success without exposing sensitive data

## 📁 File Structure

```
src/
├── lib/
│   ├── rate-limiter.js           # Rate limiting middleware
│   ├── validate-contact.js        # Input validation functions
│   ├── security.js                # Sanitization & XSS prevention
│   ├── email.js                   # UPDATED: Email sending with subject
│   └── user.js
├── app/
│   └── api/
│       └── contact-coach/
│           └── [coachId]/
│               └── route.js       # API endpoint
└── components/
    └── coaches/
        └── MessageCoachForm.jsx   # UPDATED: Contact form component
```

## 🚀 API Endpoint

### POST `/api/contact-coach/:coachId`

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
    "email": "visitor@example.com",
    "subject": "Interested in your coaching",
    "message": "I'd like to learn more about your training programs.",
    "senderName": "John Doe"
}
```

#### Response Success (200)
```json
{
    "success": true,
    "message": "Your message has been sent successfully!",
    "data": {
        "coachName": "Ahmed Hassan",
        "timestamp": "2024-02-13T10:30:00.000Z"
    }
}
```

#### Response Validation Error (400)
```json
{
    "error": "Validation failed",
    "details": {
        "email": "Invalid email format",
        "subject": "Subject must be at least 3 characters"
    }
}
```

#### Response Rate Limited (429)
```json
{
    "error": "Too many requests. Please try again later.",
    "message": "You have exceeded the maximum number of messages you can send in one hour."
}
```
With header: `Retry-After: 3600` (seconds until they can send again)

#### Response Coach Not Found (404)
```json
{
    "error": "Coach not found"
}
```

#### Response Server Error (500)
```json
{
    "error": "An unexpected error occurred",
    "message": "Please try again or contact support."
}
```

## 💻 Frontend Component

### MessageCoachForm Component

**Location**: `src/components/coaches/MessageCoachForm.jsx`

**Props**:
```typescript
{
    coachId: string;        // MongoDB coach ID
    coachName: string;      // Coach's display name
    dictionary: object;     // i18n translations (optional)
}
```

**Usage**:
```jsx
import MessageCoachForm from "@/components/coaches/MessageCoachForm";

export default function CoachPage({ coach }) {
    return (
        <MessageCoachForm
            coachId={coach._id}
            coachName={coach.fullName}
            dictionary={i18nDictionary}
        />
    );
}
```

**Features**:
- Client-side validation with error display
- Loading state during submission
- Character counter for subject and message
- Cancel button to close form
- Multi-language support through dictionary prop
- Error handling for all HTTP status codes
- Rate limit feedback to users

## 📧 Email Template

The email sent to the coach includes:

1. **Header**: Visual indicator showing new message
2. **Sender Info**: Name of the visitor
3. **Message Subject**: Visitor's subject line
4. **Message Body**: Full message content
5. **Reply Information**: 
   - Visitor's email in reply-to header
   - Direct email address for manual reply
6. **Footer**: REPS Egypt branding

### Email Headers
```
From: REPS Egypt <no-reply@reps-egypt.com>
To: coach@example.com (coach's real email - kept secure)
Reply-To: visitor@example.com
Subject: [REPS Contact] Interested in your coaching
```

## 🔧 Configuration

### Environment Variables Required

```env
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Database
MONGODB_URI=mongodb+srv://...
MONGODB_DB=reps-egypt
```

### Rate Limiting Configuration

In `src/app/api/contact-coach/[coachId]/route.js`:

```javascript
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;    // 5 messages per window
```

## 🧪 Testing

### Test Valid Message
```bash
curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message with enough content.",
    "senderName": "Test User"
  }'
```

### Test Rate Limiting
```bash
# Send 6 messages in a row - the 6th should be rejected
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test'$i'@example.com",
      "subject": "Test Subject '$i'",
      "message": "This is test message '$i' with enough content.",
      "senderName": "Test User '$i'"
    }'
done
```

### Test Validation
```bash
# Invalid email
curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "subject": "Test",
    "message": "Message with enough characters here.",
    "senderName": "Test"
  }'
```

## 🛡️ Security Best Practices

### 1. **Coach Real Email Security**
- ✅ Coach's real email is stored in the database
- ✅ Coach's email is never returned to frontend
- ✅ Email is only used internally to send messages
- ❌ Never expose email in API responses
- ❌ Never include email in frontend variables

### 2. **Email Header Injection Prevention**
- ✅ Strip newlines and carriage returns from email fields
- ✅ Validate email format strictly
- ✅ Subject is checked for CRLF characters
- ❌ Don't use user input directly in email headers

### 3. **XSS Prevention**
- ✅ HTML content is escaped in emails
- ✅ Frontend component sanitizes before sending
- ✅ Backend detects XSS patterns
- ✅ Email template uses plain text and safe HTML
- ❌ Don't render user content without escaping

### 4. **Rate Limiting**
- ✅ 5 messages per IP per hour prevents spam
- ✅ Uses client IP from request headers
- ✅ Handles proxies and forwarding headers
- ❌ Don't increase limits without reason
- ⚠️ Use Redis in production for multi-server

### 5. **Error Handling**
- ✅ Generic error messages to users
- ✅ Detailed logs for developers
- ✅ No sensitive data in responses
- ❌ Don't expose database errors to frontend
- ❌ Don't reveal email service details

### 6. **Input Validation**
- ✅ Validation on both client and server
- ✅ Length limits prevent buffer attacks
- ✅ Format validation prevents injection
- ✅ Null byte detection
- ❌ Never trust client-side validation alone

## 📊 Monitoring & Logging

### What to Monitor
1. Failed rate limit checks
2. Validation failures
3. Security pattern detections
4. Email sending failures
5. Database errors

### Recommended Logging
```javascript
// Security incident
console.warn('[SECURITY] Suspicious message detected:', {
    ip: clientIp,
    coachId,
    errors: securityCheck.errors,
});

// Email failure
console.error('Email sending failed:', {
    coachId,
    visitorEmail: email,
    error: errorMessage,
});
```

## 🚀 Production Deployment

### Checklist
- [ ] Update `.env.local` with production credentials
- [ ] Set `NODE_ENV=production`
- [ ] Use Redis for rate limiting (not in-memory)
- [ ] Enable error tracking (Sentry, etc.)
- [ ] Set up email logging and monitoring
- [ ] Configure CORS for frontend domain
- [ ] Use HTTPS only
- [ ] Enable security headers (CSP, X-Frame-Options, etc.)
- [ ] Set up alerts for spam detection
- [ ] Test email delivery to multiple providers
- [ ] Document support procedures for coaches

## 🔄 Future Enhancements

1. **Redis Rate Limiter** - For distributed systems
2. **Email Verification** - Verify visitor email before sending
3. **Spam Filter** - ML-based content filtering
4. **Message Dashboard** - Coaches can view messages
5. **Auto-Reply** - Coaches can set auto-response
6. **Attachments** - Allow file attachments
7. **Message Archive** - Store message history
8. **Analytics** - Track message submissions
9. **Captcha** - Add Google reCAPTCHA
10. **Multi-Coach Messages** - Message to multiple coaches

## ❓ Troubleshooting

### Emails not sending
1. Check `RESEND_API_KEY` is valid
2. Verify sender domain is verified in Resend
3. Check MongoDB for coach email address
4. Review email service logs
5. Test with curl command

### Rate limiting not working
1. Check IP extraction logic for your deployment
2. Verify `x-forwarded-for` header is set correctly
3. Clear rate limit store if needed
4. Check for reverse proxy issues

### Form validation failing
1. Check console for error details
2. Verify client-side validation matches backend
3. Test with curl to isolate frontend issues
4. Check network tab for API response

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial implementation
- Rate limiting (in-memory)
- Input validation
- XSS/injection prevention
- Email header injection prevention
- MessageCoachForm component
- API endpoint

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error logs
3. Test with curl command
4. Check browser console for frontend errors
5. Contact development team

---

**Last Updated**: February 13, 2024
**Created by**: Development Team
**Status**: Production Ready
