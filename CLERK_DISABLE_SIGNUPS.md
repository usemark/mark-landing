# Disable Public Sign-ups in Clerk

To lock down Mark so only you can log in (no one else can sign up):

## Option 1: Disable Sign-ups Entirely (Recommended)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your "Mark" application
3. Go to **User & Authentication** → **Email, Phone, Username**
4. **Disable all sign-up options:**
   - Turn OFF "Email address" under Sign-up
   - Turn OFF "Phone number" under Sign-up
   - Turn OFF "Username" under Sign-up
5. Go to **User & Authentication** → **Social Connections**
6. **Disable all social sign-ups:**
   - Turn OFF "Sign up" toggle for Google
   - Turn OFF "Sign up" toggle for Facebook
   - Keep "Sign in" enabled so you can still log in
7. Click **Save** on each section

**Result:** No one can sign up. Only existing users (you) can sign in.

---

## Option 2: Allowlist Only Your Email (More Restrictive)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your "Mark" application
3. Go to **User & Authentication** → **Restrictions**
4. Enable **Allowlist** mode
5. Add your email address to the allowlist
6. Click **Save**

**Result:** Only email addresses on the allowlist can sign up or sign in.

---

## Option 3: Remove Sign-up Page Entirely (Cleanest)

Since you've already updated `middleware.ts` to remove `/sign-up(.*)` from public routes, users won't be able to access the sign-up page at all.

You can also:
1. Delete `/app/sign-up/[[...sign-up]]/page.tsx` if it exists
2. Or redirect `/sign-up` to `/sign-in` in your routing

**Result:** Sign-up page doesn't exist. Only sign-in is available.

---

## Current Setup

✅ **Landing page (/)** - Public (no auth required)  
✅ **Sign-in page (/sign-in)** - Public (you can log in)  
✅ **App routes (/app/*)** - Protected (requires authentication)  
⚠️ **Sign-ups** - Need to disable in Clerk Dashboard (see options above)

---

## Recommended Action

**Do Option 1** - This is the simplest and most effective:
- Go to Clerk Dashboard
- Disable all sign-up toggles (email, phone, username, social)
- Keep sign-in enabled
- Done! Only you can access the app.

When you're ready to allow users, just re-enable sign-ups in the Clerk Dashboard.
