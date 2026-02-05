/**
 * REPS Egypt Chatbot Decision Tree
 * 
 * Nodes Structure:
 * - id: Unique identifier
 * - text: Message displayed to user
 * - options: Array of choices
 *   - label: Button text
 *   - nextNode: ID of the node to jump to
 *   - action: (Optional) client-side action (e.g., 'link', 'reset')
 *   - href: (Optional) URL for link action
 *   - requiredRole: (Optional) 'admin', 'trainer', 'trainee' - hidden if not matching
 */

export const chatbotFlow = {
    root: {
        text: "Welcome to REPS Egypt! How can I assist you today?",
        options: [
            { label: "Determining My Verification Status", nextNode: "verification_status" },
            { label: "Registration & Membership", nextNode: "registration_menu" },
            { label: "Standards & Ethics", nextNode: "standards_menu" },
            { label: "Contact Support", nextNode: "contact_info" },
        ]
    },

    // --- Verification Logic ---
    verification_status: {
        text: "I can help explain your status. Are you a Trainer or a Trainee?",
        options: [
            { label: "I am a Trainer", nextNode: "trainer_verification" },
            { label: "I am a Trainee", nextNode: "trainee_verification" },
            { label: "What is the difference?", nextNode: "role_explanation" }
        ]
    },
    trainer_verification: {
        text: "As a Trainer, 'Pending' means your documents (Certificates, CV) are being reviewed. 'Approved' means you are listed on the public register. 'Rejected' usually means missing documents.",
        options: [
            { label: "How long does it take?", nextNode: "timeline_faq" },
            { label: "Update my documents", nextNode: "update_docs_guide" },
            { label: "Back to Menu", nextNode: "root" }
        ]
    },
    trainee_verification: {
        text: "As a Trainee, verification confirms your enrollment in an accredited course. Your status remains 'Active' as long as your membership is valid.",
        options: [
            { label: "Upgrade to Trainer", nextNode: "upgrade_guide" },
            { label: "Back to Menu", nextNode: "root" }
        ]
    },

    // --- Registration ---
    registration_menu: {
        text: "What would you like to know about registration?",
        options: [
            { label: "How to Register", nextNode: "how_to_register" },
            { label: "Membership Fees", nextNode: "fees_info" },
            { label: "Required Documents", nextNode: "docs_info" },
            { label: "Back to Menu", nextNode: "root" }
        ]
    },
    how_to_register: {
        text: "To register, click 'Register' in the top right. You'll need to create an account, complete your profile, and upload required certifications.",
        options: [
            { label: "Go to Register Page", action: "link", href: "/register", nextNode: "root" }, // Frontend will handle routing
            { label: "Back", nextNode: "registration_menu" }
        ]
    },
    fees_info: {
        text: "Membership fees conform to the fiscal year. Current rates are available on the 'Member Benefits' page.",
        options: [
            { label: "View Benefits", action: "link", href: "/member-benefits", nextNode: "root" },
            { label: "Back", nextNode: "registration_menu" }
        ]
    },

    // --- Standards ---
    standards_menu: {
        text: "REPS Egypt enforces strict ethical and professional standards.",
        options: [
            { label: "Code of Ethics", nextNode: "ethics_info" },
            { label: "ICREP Standards", nextNode: "icreps_info" },
            { label: "Report a Violation", nextNode: "report_violation" },
            { label: "Back to Menu", nextNode: "root" }
        ]
    },
    ethics_info: {
        text: "Our Code of Ethics ensures safety and professionalism. All members must pledge to uphold these values.",
        options: [
            { label: "Read Code of Ethics", action: "link", href: "/code-of-ethics", nextNode: "root" },
            { label: "Back", nextNode: "standards_menu" }
        ]
    },

    // --- Contact ---
    contact_info: {
        text: "You can reach our human support team via email or phone.",
        options: [
            { label: "Email Support", action: "link", href: "mailto:support@repsegypt.org", nextNode: "root" },
            { label: "Back to Menu", nextNode: "root" }
        ]
    },

    // --- Generic Leaves ---
    timeline_faq: {
        text: "Verification typically takes 3-5 business days after all documents are submitted.",
        options: [ { label: "Back to Menu", nextNode: "root" } ]
    },
    update_docs_guide: {
        text: "Go to your Profile and select 'Edit'. You can upload new certificates there. They will be sent for re-approval.",
        options: [ 
            { label: "Go to Profile", action: "link", href: "/profile", nextNode: "root", requiredRole: ["trainer", "trainee"] },
            { label: "Back to Menu", nextNode: "root" } 
        ]
    },
    upgrade_guide: {
        text: "To upgrade from Trainee to Trainer, you must complete your accredited qualification and upload the final certificate in your Profile.",
        options: [ { label: "Back to Menu", nextNode: "root" } ]
    },
    docs_info: {
        text: "Trainers need: valid Personal Trainer certification, CPR/First Aid cert, and a recent photo. Trainees need: Enrollment proof.",
        options: [ { label: "Back", nextNode: "registration_menu" } ]
    },
    icreps_info: {
        text: "REPS Egypt is a member of ICREPs, ensuring your portability to other national registers.",
        options: [ { label: "Back", nextNode: "standards_menu" } ]
    },
    report_violation: {
        text: "Please email complaints@repsegypt.org with details of the violation.",
        options: [ { label: "Back", nextNode: "root" } ]
    },
    role_explanation: {
        text: "Trainers are qualified professionals. Trainees are students currently studying an accredited course.",
        options: [ { label: "Back", nextNode: "verification_status" } ]
    }
};
