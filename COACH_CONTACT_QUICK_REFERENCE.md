# Coach Contact System - Quick Reference

## 🎯 5-Minute Setup

### Step 1: Install Dependencies (if needed)
```bash
npm install resend sonner
```

Your project already has these installed.

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```env
RESEND_API_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
MONGODB_DB=reps-egypt
```

### Step 3: Files Created/Updated
1. ✅ `src/lib/rate-limiter.js` - Rate limiting
2. ✅ `src/lib/validate-contact.js` - Input validation
3. ✅ `src/lib/security.js` - Security sanitization
4. ✅ `src/lib/email.js` - UPDATED email function
5. ✅ `src/app/api/contact-coach/[coachId]/route.js` - API endpoint
6. ✅ `src/components/coaches/MessageCoachForm.jsx` - UPDATED form component
7. ✅ `.env.example` - Environment variable template
8. ✅ `COACH_CONTACT_SYSTEM.md` - Full documentation

### Step 4: Integrate into Coach Profile Page

Your coach profile page is at: `src/app/[lang]/coaches/[id]/page.js`

The `MessageCoachForm` component is already used there. Just verify:

```jsx
import MessageCoachForm from "@/components/coaches/MessageCoachForm";

export default async function CoachProfilePage({ params }) {
    const { id, lang } = await params;
    const coach = await findUserById(id);
    
    return (
        <div>
            {/* ... coach info ... */}
            
            <MessageCoachForm
                coachId={coach._id.toString()}  // Convert ObjectId to string
                coachName={coach.fullName}
                dictionary={dictionary.coach_contact} // or similar i18n key
            />
        </div>
    );
}
```

### Step 5: Test the Feature

1. Go to http://localhost:3000/en/coaches/[coach-id]
2. Scroll to "Send a Message to [Coach Name]"
3. Fill in all fields
4. Click "Send Message"
5. Check coach's email for message

## 📊 How It Works

```
┌─────────────────────────────────────────┐
│     Visitor on Coach Profile Page       │
└─────────────────────┬───────────────────┘
                      │
                      │ Fills in form:
                      │ - Name
                      │ - Email
                      │ - Subject
                      │ - Message
                      │
                      ▼
        ┌─────────────────────────────┐
        │  MessageCoachForm Component  │
        │  - Client-side validation   │
        │  - Loading state            │
        │  - Error display            │
        └──────────────┬──────────────┘
                       │
                       │ POST /api/contact-coach/:coachId
                       │ { email, subject, message, senderName }
                       │
                       ▼
        ┌──────────────────────────────┐
        │    API Route Handler          │
        │  1. Extract client IP         │
        │  2. Rate limit check (5/hour) │
        │  3. Validate inputs           │
        │  4. Security sanitization     │
        │  5. Verify coach exists       │
        │  6. Get coach's real email    │
        │  7. Send email to coach       │
        │  8. Return success            │
        └──────────────┬───────────────┘
        │
        ├─ (Secure) Coach's Real Email
        │
        ▼
    ┌──────────────────┐
    │  Coach's Inbox   │
    │   (via email)    │
    └──────────────────┘
        └─── Reply-To: visitor@example.com
```

## 🔐 Security Layers

| Layer | Component | Protection |
|-------|-----------|-----------|
| 1 | Rate Limiter | Max 5 messages per IP per hour |
| 2 | Input Validation | Email format, length limits, null bytes |
| 3 | Security Check | XSS patterns, injection detection, HTML escape |
| 4 | Coach Verification | Verify coach exists and is trainer |
| 5 | Email Security | Real email kept on backend, never exposed |
| 6 | Error Handling | Generic messages, no data leaks |

## 🚨 Error Handling

### Client Side (MessageCoachForm.jsx)
```javascript
// Validation errors
if (res.status === 400) {
    // Show field-specific errors
    setFormErrors(data.details);
}

// Rate limited
if (res.status === 429) {
    toast.error("Too many messages. Wait 1 hour.");
}

// Coach not found
if (res.status === 404) {
    toast.error("Coach not found");
}

// Server error
if (res.status === 500) {
    toast.error("Please try again later");
}
```

### Server Side (route.js)
```javascript
// Rate limit exceeded → 429
// Validation failed → 400
// Coach not found → 404
// Coach not a trainer → 404
// Email failed → 500
// Unknown error → 500
```

## ✅ Validation Rules

| Field | Min | Max | Rules |
|-------|-----|-----|-------|
| Name | 2 | 100 | letters, numbers, spaces, dashes |
| Email | 5 | 254 | valid email format, no CRLF |
| Subject | 3 | 200 | no newlines, no null bytes |
| Message | 10 | 2000 | plain text or simple HTML |

## 🌍 i18n Integration

Add to your translation files:

**English** (`src/dictionaries/en.json`):
```json
{
  "coach_contact": {
    "title": "Send a Message to",
    "subtitle": "Connect with this coach",
    "email_note": "Your email address will be shared with the coach so they can reply to you directly.",
    "your_name": "Your Name",
    "your_email": "Your Email Address",
    "message_subject": "Message Subject",
    "message_body": "Your Message",
    "send_btn": "Send Message",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error_generic": "Failed to send message. Please try again.",
    "error_rate_limit": "You've sent too many messages. Please wait before sending another.",
    "error_required": "This field is required",
    "error_invalid_email": "Please enter a valid email address",
    "char_count": "Characters"
  }
}
```

**Arabic** (`src/dictionaries/ar.json`):
```json
{
  "coach_contact": {
    "title": "ارسل رسالة الى",
    "subtitle": "تواصل مع هذا المدرب",
    "email_note": "سيتم مشاركة عنوان بريدك الإلكتروني مع المدرب حتى يتمكن من الرد عليك بشكل مباشر.",
    "your_name": "اسمك",
    "your_email": "بريدك الإلكتروني",
    "message_subject": "موضوع الرسالة",
    "message_body": "الرسالة",
    "send_btn": "إرسال الرسالة",
    "sending": "جاري الإرسال...",
    "success": "تم إرسال الرسالة بنجاح!",
    "error_generic": "فشل إرسال الرسالة. حاول مرة أخرى.",
    "error_rate_limit": "أرسلت عدد كبير من الرسائل. يرجى الانتظار.",
    "error_required": "هذا الحقل مطلوب",
    "error_invalid_email": "يرجى إدخال بريد إلكتروني صحيح",
    "char_count": "أحرف"
  }
}
```

Then use in component:
```jsx
import { getDictionary } from "@/lib/get-dictionary";

const dictionary = await getDictionary(lang);

<MessageCoachForm
    coachId={coach._id.toString()}
    coachName={coach.fullName}
    dictionary={dictionary.coach_contact}
/>
```

## 🧪 Testing Checklist

- [ ] Form displays on coach profile pages
- [ ] All fields validate correctly
- [ ] Character limits work (subject 200, message 2000)
- [ ] Client-side validation shows errors
- [ ] Can send valid message
- [ ] Email arrives in coach's inbox
- [ ] Subject line appears correctly
- [ ] Reply-To header has visitor's email
- [ ] Rate limit blocks 6th message
- [ ] Rate limit error shows properly
- [ ] Form clears after success
- [ ] Invalid emails are rejected
- [ ] XSS attempts are blocked
- [ ] Newlines in subject are rejected
- [ ] Loading state shows during send
- [ ] Success message appears
- [ ] Cancel button closes form
- [ ] Works on mobile view
- [ ] Works with i18n switching
- [ ] Works when not logged in

## 📞 Common Issues

### Email not arriving
**Check**:
1. RESEND_API_KEY is correct
2. Resend domain is verified
3. Coach has email address in database
4. Check spam folder
5. Check Resend dashboard logs

**Fix**:
```javascript
// Test email function
const result = await sendCoachMessage({
    fromName: "Test",
    fromEmail: "test@example.com",
    toEmail: "coach@example.com",
    subject: "Test",
    message: "Test message with enough characters here."
});
console.log(result);
```

### Rate limiting too strict
**Adjust** in `src/app/api/contact-coach/[coachId]/route.js`:
```javascript
const RATE_LIMIT_MAX_REQUESTS = 10;    // Increase from 5
const RATE_LIMIT_WINDOW_MS = 7200000;  // 2 hours instead of 1
```

### Form not showing on coach profile
**Check**:
1. Coach role is 'trainer' (not 'trainee' or 'user')
2. MessageCoachForm is imported and used
3. coachId is passed as string, not ObjectId
4. No JavaScript errors in console

### Validation too strict
**Update** in `src/lib/validate-contact.js`:
```javascript
if (trimmed.length < 5) {  // Change from 10
    return { valid: false, message: '...' };
}
```

## 🔧 Advanced Configuration

### Change Rate Limit Window
```javascript
// src/app/api/contact-coach/[coachId]/route.js

// 10 messages per 30 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 1800000;
```

### Custom Email Template
```javascript
// src/lib/email.js
// Modify the HTML template in sendCoachMessage()
// Update logo, colors, language, etc.
```

### Add Captcha (Future)
```javascript
// Add to form submission
const captchaToken = await grecaptcha.execute(...);
// Send in request body
```

## 📈 Monitoring

### Log Important Events
```javascript
// src/app/api/contact-coach/[coachId]/route.js

// Log successful sends
console.log('[CONTACT_COACH] Message sent', {
    coachId,
    visitorEmail: email,
    timestamp: new Date().toISOString(),
});

// Log rate limit hits
console.warn('[CONTACT_COACH] Rate limit', {
    ip: clientIp,
    timestamp: new Date().toISOString(),
});

// Log security attempts
console.warn('[CONTACT_COACH] Security blocked', {
    ip: clientIp,
    reason: securityCheck.errors,
});
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
# Access http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
```bash
vercel
# Environment variables auto-synced from .env.local
```

### Environment Variables in Vercel
Add to Vercel dashboard:
- `RESEND_API_KEY`
- `MONGODB_URI`
- `MONGODB_DB`
- `JWT_SECRET`

---

**Quick Links**:
- 📖 [Full Documentation](./COACH_CONTACT_SYSTEM.md)
- 🔗 [API Endpoint Docs](./COACH_CONTACT_SYSTEM.md#-api-endpoint)
- 🛡️ [Security Guide](./COACH_CONTACT_SYSTEM.md#-security-best-practices)
- 🧪 [Testing Guide](./COACH_CONTACT_SYSTEM.md#-testing)

**Questions?** Check the full documentation or review error logs.
