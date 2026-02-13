# Coach Contact System - Code Examples

## 1. Integration into Coach Profile Page

### Current Coach Profile Structure
```jsx
// src/app/[lang]/coaches/[id]/page.js

import { notFound } from "next/navigation";
import { findUserById } from "@/lib/user";
import MessageCoachForm from "@/components/coaches/MessageCoachForm";
import ImageLightbox from "@/components/ImageLightbox";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }) {
    const { id, lang } = await params;
    const coach = await findUserById(id);
    if (!coach) return { title: "Coach Not Found" };
    
    return {
        title: `${coach.fullName} | REPS Egypt`,
        description: coach.bio || `Connect with ${coach.fullName}`,
    };
}

export default async function CoachProfilePage({ params }) {
    const { id, lang } = await params;
    const coach = await findUserById(id);
    const dictionary = await getDictionary(lang);

    if (!coach || coach.role !== 'trainer') {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Section */}
            <div>{/* ... existing hero code ... */}</div>
            
            {/* Coach Info Section */}
            <div>{/* ... existing coach info ... */}</div>
            
            {/* NEW: Contact Coach Form (for all visitors, no login required) */}
            <MessageCoachForm
                coachId={coach._id.toString()}  // Convert ObjectId to string
                coachName={coach.fullName}
                dictionary={dictionary.coach_contact || {}}  // i18n dict
            />
            
            {/* Other sections */}
        </div>
    );
}
```

## 2. API Testing Examples

### Using cURL (Command Line)

#### Test Valid Message
```bash
# Replace coach-id with actual MongoDB ObjectId
curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 192.168.1.1" \
  -d '{
    "senderName": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Interested in Personal Training",
    "message": "I would like to inquire about your personal training programs. I am especially interested in fitness coaching."
  }'
```

#### Test Invalid Email
```bash
curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "senderName": "John Doe",
    "email": "invalid-email",
    "subject": "Test",
    "message": "Message with enough content here for testing purposes."
  }'
# Returns 400 with: { error: "Validation failed", details: { email: "Invalid email format" } }
```

#### Test Rate Limiting
```bash
#!/bin/bash
# Send 6 messages - the 6th should be rate limited
for i in {1..6}; do
  echo "Message $i:"
  curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 192.168.1.100" \
    -d "{
      \"senderName\": \"Test User $i\",
      \"email\": \"test$i@example.com\",
      \"subject\": \"Test Message $i\",
      \"message\": \"This is test message number $i with enough content to be valid.\"
    }"
  echo ""
  sleep 1
done
# 6th request returns 429: Too many requests
```

#### Test Header Injection Prevention
```bash
curl -X POST http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "senderName": "Attacker",
    "email": "attacker@example.com\r\nCc: victim@example.com",
    "subject": "Injection Test",
    "message": "Trying to inject headers with newlines in email field."
  }'
# Returns 400: Invalid email format
```

### Using JavaScript/Fetch

#### Frontend Example (in React/Next.js)
```javascript
// Example fetch call
async function sendMessageToCoach(coachId, formData) {
    try {
        const response = await fetch(`/api/contact-coach/${coachId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderName: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error:', data);
            
            if (response.status === 429) {
                throw new Error('Too many messages. Please wait 1 hour before sending another.');
            } else if (response.status === 400) {
                throw new Error(`Validation failed: ${JSON.stringify(data.details)}`);
            } else if (response.status === 404) {
                throw new Error('Coach not found');
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        }

        return { success: true, data };
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

// Usage
try {
    const result = await sendMessageToCoach('507f1f77bcf86cd799439011', {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Training Program Inquiry',
        message: 'I am interested in learning more about your training programs.',
    });
    console.log('Message sent:', result);
} catch (error) {
    console.error('Error sending message:', error.message);
}
```

## 3. Backend Testing (Node.js/Jest)

```javascript
// __tests__/api/contact-coach.test.js

import { POST } from '@/app/api/contact-coach/[coachId]/route';
import { findUserById } from '@/lib/user';
import { sendCoachMessage } from '@/lib/email';

// Mock dependencies
jest.mock('@/lib/user');
jest.mock('@/lib/email');

describe('POST /api/contact-coach/[coachId]', () => {
    const mockCoach = {
        _id: '507f1f77bcf86cd799439011',
        fullName: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        role: 'trainer',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        findUserById.mockResolvedValue(mockCoach);
        sendCoachMessage.mockResolvedValue({ success: true, id: 'email-id' });
    });

    test('sends message successfully', async () => {
        const request = new Request('http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderName: 'John Doe',
                email: 'john@example.com',
                subject: 'Test Subject',
                message: 'This is a test message with enough content.',
            }),
        });

        const response = await POST(request, { params: { coachId: '507f1f77bcf86cd799439011' } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(sendCoachMessage).toHaveBeenCalled();
    });

    test('validates email format', async () => {
        const request = new Request('http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderName: 'John Doe',
                email: 'invalid-email',
                subject: 'Test',
                message: 'This is a test message.',
            }),
        });

        const response = await POST(request, { params: { coachId: '507f1f77bcf86cd799439011' } });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.details.email).toBeDefined();
    });

    test('returns 404 if coach not found', async () => {
        findUserById.mockResolvedValue(null);

        const request = new Request('http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderName: 'John',
                email: 'john@example.com',
                subject: 'Test',
                message: 'This is a test message.',
            }),
        });

        const response = await POST(request, { params: { coachId: '507f1f77bcf86cd799439011' } });

        expect(response.status).toBe(404);
    });

    test('returns 404 if user is not a trainer', async () => {
        findUserById.mockResolvedValue({ ...mockCoach, role: 'trainee' });

        const request = new Request('http://localhost:3000/api/contact-coach/507f1f77bcf86cd799439011', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderName: 'John',
                email: 'john@example.com',
                subject: 'Test',
                message: 'This is a test message.',
            }),
        });

        const response = await POST(request, { params: { coachId: '507f1f77bcf86cd799439011' } });

        expect(response.status).toBe(404);
    });
});
```

## 4. Database Schema Examples

### MongoDB Coach Document
```javascript
// Example coach document in MongoDB
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",  // Real email - kept secure
    password: "$2b$10$...",              // Hashed password
    phone: "+20123456789",
    specialization: "Fitness Training",
    bio: "Certified fitness coach with 10 years experience",
    role: "trainer",                    // IMPORTANT: Must be 'trainer'
    status: "approved",
    profilePhoto: "https://...",
    createdAt: ISODate("2024-01-15"),
    updatedAt: ISODate("2024-02-13")
}
```

## 5. Environment Variables Setup

### .env.local Example
```env
# Email Service
RESEND_API_KEY=re_1234567890abcdef_test_key
RESEND_FROM_EMAIL=noreply@reps-egypt.com

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=reps-egypt

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 6. i18n Dictionary Structure

### English Dictionary
```json
// src/dictionaries/en.json
{
  "coach_contact": {
    "title": "Send a Message to",
    "subtitle": "Connect with this coach",
    "email_note": "Your email address will be shared with the coach so they can reply to you directly.",
    "your_name": "Your Name",
    "your_email": "Your Email Address",
    "message_subject": "Message Subject",
    "message_body": "Your Message",
    "placeholder": "Hi {name}, I'm interested in your training programs...",
    "send_btn": "Send Message",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error_generic": "Failed to send message. Please try again.",
    "error_rate_limit": "You've sent too many messages. Please wait before sending another.",
    "error_long": "Message is too long (max 2000 characters)",
    "error_required": "This field is required",
    "error_invalid_email": "Please enter a valid email address",
    "char_count": "Characters"
  }
}
```

### Arabic Dictionary
```json
// src/dictionaries/ar.json
{
  "coach_contact": {
    "title": "ارسل رسالة الى",
    "subtitle": "تواصل مع هذا المدرب",
    "email_note": "سيتم مشاركة عنوان بريدك الإلكتروني مع المدرب حتى يتمكن من الرد عليك.",
    "your_name": "اسمك",
    "your_email": "بريدك الإلكتروني",
    "message_subject": "موضوع الرسالة",
    "message_body": "الرسالة",
    "placeholder": "أنا مهتم ببرامجك التدريبية...",
    "send_btn": "إرسال الرسالة",
    "sending": "جاري الإرسال...",
    "success": "تم إرسال الرسالة بنجاح!",
    "error_generic": "فشل إرسال الرسالة. حاول مرة أخرى.",
    "error_rate_limit": "أرسلت عدد كبير جدا من الرسائل. انتظر قليلا.",
    "error_long": "الرسالة طويلة جدا (الحد الأقصى 2000 حرف)",
    "error_required": "هذا الحقل مطلوب",
    "error_invalid_email": "الرجاء إدخال بريد إلكتروني صحيح",
    "char_count": "أحرف"
  }
}
```

## 7. Advanced Usage Examples

### Custom Error Handler
```javascript
// src/utils/apiErrorHandler.js

export function handleApiError(response, data) {
    const errorMap = {
        400: 'Please check your input and try again.',
        404: 'The requested coach was not found.',
        429: 'You have been sending too many messages. Wait 1 hour before trying again.',
        500: 'An error occurred on our server. Please try again later.',
    };

    return {
        status: response.status,
        message: errorMap[response.status] || 'An unexpected error occurred.',
        details: data.details || {},
    };
}

// Usage in component
try {
    const response = await fetch(...);
    const data = await response.json();
    
    if (!response.ok) {
        const error = handleApiError(response, data);
        toast.error(error.message);
    }
} catch (err) {
    toast.error('Network error. Try again.');
}
```

### Rate Limit Bypass for Testing (Development Only)
```javascript
// config/development-overrides.js - DO NOT USE IN PRODUCTION

export const DEV_SETTINGS = {
    SKIP_RATE_LIMIT: false,  // Set true to bypass rate limiting in dev
    SKIP_EMAIL: false,       // Set true to skip actual email sending
    DEBUG_API: true,         // Log API details
};

// In route.js (dev only)
if (process.env.NODE_ENV === 'development' && DEV_SETTINGS.SKIP_RATE_LIMIT) {
    // Skip rate limiting
    // console.log('[DEV] Rate limiting skipped');
} else {
    // Apply rate limiting normally
}
```

## 8. Monitoring & Error Logging

```javascript
// src/lib/logger.js

class ContactLogger {
    log(level, action, data = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            action,
            ...data,
        };
        
        console.log(JSON.stringify(logEntry));
        
        // In production, send to monitoring service
        if (process.env.NODE_ENV === 'production') {
            sendToMonitoringService(logEntry);
        }
    }

    success(action, data) {
        this.log('INFO', action, { ...data, status: 'success' });
    }

    error(action, error, data = {}) {
        this.log('ERROR', action, {
            ...data,
            error: error.message,
            stack: error.stack,
        });
    }

    warn(action, data) {
        this.log('WARN', action, data);
    }
}

export const contactLogger = new ContactLogger();
```

---

These examples cover:
- ✅ Integration into existing coach pages
- ✅ API testing with curl and JavaScript
- ✅ Backend testing with Jest
- ✅ Database schema examples
- ✅ Environment variable setup
- ✅ i18n dictionary structure
- ✅ Advanced usage patterns
- ✅ Error handling and logging

Use these as reference when implementing or troubleshooting the feature.
