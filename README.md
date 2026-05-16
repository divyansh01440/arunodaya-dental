# Arunodaya Dental Clinic — Website (Convex Edition)

Complete website for Arunodaya Dental Clinic in Napier Town, Jabalpur.

- **Frontend:** React + Vite + TypeScript + Tailwind + shadcn/ui
- **Backend & Database:** Convex (real-time, serverless, free tier)
- **Email confirmations:** EmailJS (200 free emails/month)
- **Hosting:** Vercel (frontend) + Convex Cloud (backend, automatic)

## What's included

- Public website (home, services, full pricing chart, about, testimonials, contact, booking)
- 5-step booking flow: Service → Doctor → Date → Time → Details
- After booking: confirmation toast + redirect to home, plus email confirmations to BOTH the patient and the clinic (arunodayadentalclinic@gmail.com)
- Patient self-service: lookup by phone, cancel pending bookings
- Two doctors with their respective hours:
  - **Dr. Prathmesh Rai** — Mon–Sat, 10:30 AM – 3:30 PM AND 5:30 PM – 8:30 PM
  - **Dr. Kalpana Sharma Rai** — Mon–Sat, 10:30 AM – 3:30 PM only (morning)
- Admin dashboard at `/admin/login` with stats, appointments table, calendar, blocked dates
- All pricing matches the official clinic price chart
- Real clinic info, photos, doctor profiles throughout

---

## Quick start (local development)

You need **Node.js 18 or newer**. Check with `node -v`.

### Step 1: Sign up for Convex (free)

1. Go to https://convex.dev and sign up with GitHub
2. You won't need to create a project manually — `npx convex dev` does that

### Step 2: Sign up for EmailJS (free, optional but recommended)

1. Go to https://www.emailjs.com → Sign Up Free
2. Add an Email Service:
   - Email Services → Add New Service
   - Choose **Gmail** → Connect Account (sign in with `arunodayadentalclinic@gmail.com`)
   - Copy the **Service ID** (looks like `service_xxxxxxx`)
3. Create the patient confirmation template:
   - Email Templates → Create New Template
   - Subject: `Your Appointment is Confirmed — Arunodaya Dental Clinic`
   - To Email: `{{patient_email}}`
   - Body (paste this):
     ```
     Dear {{patient_name}},

     Your appointment at Arunodaya Dental Clinic has been confirmed.

     Details:
     - Service: {{service}}
     - Doctor: {{doctor_name}}
     - Date: {{appointment_date}}
     - Time: {{appointment_time}}
     - Notes: {{notes}}

     Clinic Address:
     {{clinic_address}}

     Phone: {{clinic_phone}}

     If you need to reschedule or cancel, please call us or visit our website.

     Thank you,
     Team Arunodaya Dental Clinic
     ```
   - Save → copy the **Template ID** (looks like `template_xxxx`)
4. Create the clinic notification template:
   - Same flow as above, new template
   - To Email: `arunodayadentalclinic@gmail.com`
   - Subject: `New Appointment Booking — {{patient_name}}`
   - Body:
     ```
     A new appointment has been booked:

     Patient: {{patient_name}}
     Phone: {{patient_phone}}
     Email: {{patient_email}}

     Service: {{service}}
     Doctor: {{doctor_name}}
     Date: {{appointment_date}}
     Time: {{appointment_time}}
     Notes: {{notes}}

     Manage this booking in the admin dashboard.
     ```
   - Save → copy the **Template ID**
5. Account → API Keys → copy your **Public Key**

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Set up Convex (one-time)

```bash
npx convex dev
```

The first time:
- It opens a browser window — log in to your Convex account
- Pick "Create a new project" → name it `arunodaya-dental-clinic`
- It will print your `VITE_CONVEX_URL` (looks like `https://something-name-123.convex.cloud`)
- It will also create a real `.env.local` file with `CONVEX_DEPLOYMENT=...`
- Keep this terminal running — it syncs your Convex functions live as you edit them

### Step 5: Seed the database (one-time)

In a **second terminal** (leave `convex dev` running in the first):

```bash
npx convex run seed:run
```

You should see:
```
{ ok: true, message: "Seed complete" }
```

This creates the admin user and both doctors.

### Step 6: Create your `.env` file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `VITE_CONVEX_URL` — the URL Convex showed you in Step 4
- `VITE_EMAILJS_SERVICE_ID` — from Step 2
- `VITE_EMAILJS_PUBLIC_KEY` — from Step 2
- `VITE_EMAILJS_PATIENT_TEMPLATE` — patient template ID
- `VITE_EMAILJS_CLINIC_TEMPLATE` — clinic template ID

### Step 7: Run the dev server

In a **third terminal**:

```bash
npm run dev
```

Open http://localhost:8080 — your site is live locally.

### Admin login

- URL: http://localhost:8080/admin/login
- Email: `arunodayadentalclinic@gmail.com`
- Password: `dental@1234`

⚠️ Change the password by editing `convex/seed.ts` and re-running the seed, or by editing the admin record directly in the Convex dashboard.

---

## Deploying to production

### Step 1: Push your code to GitHub

Create a new private repo at https://github.com, then:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arunodaya-dental-clinic.git
git push -u origin main
```

Make sure `.gitignore` is excluding `.env` and `.env.local` — verify with `git status` (those files should NOT appear in the list to commit).

### Step 2: Deploy Convex to production

```bash
npx convex deploy
```

This creates a **production** Convex deployment separate from your dev one. It will print a different production URL like `https://your-deployment-prod.convex.cloud`. Copy this URL — you'll need it for Vercel.

Now seed production:

```bash
npx convex run seed:run --prod
```

### Step 3: Deploy the frontend to Vercel

1. Go to https://vercel.com → sign up with GitHub
2. Click **Add New → Project**
3. Import your GitHub repo
4. Framework: should auto-detect as **Vite**
5. **Environment Variables** — add all of these:
   - `VITE_CONVEX_URL` = your **production** Convex URL from Step 2
   - `VITE_EMAILJS_SERVICE_ID` = same as local
   - `VITE_EMAILJS_PUBLIC_KEY` = same as local
   - `VITE_EMAILJS_PATIENT_TEMPLATE` = same as local
   - `VITE_EMAILJS_CLINIC_TEMPLATE` = same as local
6. Click **Deploy** — wait 2 minutes
7. Your site is now live at `https://your-project.vercel.app`

### Step 4: Test it

- Visit your Vercel URL
- Try booking an appointment — you should get a confirmation email
- Log in at `/admin/login` and verify the booking shows up

### Step 5: (Optional) Custom domain

In Vercel: Project Settings → Domains → Add your domain. Vercel gives you DNS records to add at your registrar.

---

## Project structure

```
.
├── convex/                    # Backend (Convex functions + schema)
│   ├── schema.ts              # Database schema
│   ├── auth.ts                # Admin login / sessions
│   ├── doctors.ts             # Doctor list / lookup
│   ├── appointments.ts        # Booking & admin management
│   ├── blockedDates.ts        # Holiday closures
│   ├── stats.ts               # Dashboard stats
│   └── seed.ts                # One-time setup (admin + doctors)
├── src/
│   ├── components/
│   │   ├── admin/             # Admin dashboard sections
│   │   ├── booking/           # Booking system
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Header, Footer, WhatsApp button
│   │   └── ui/                # shadcn/ui primitives
│   ├── hooks/                 # Convex hooks (auth, appointments, etc)
│   ├── lib/                   # Convex client, email, clinic constants
│   └── pages/                 # Route components
├── public/photos/             # Clinic photos
├── .env.example               # Template — copy to .env
└── README.md
```

## Updating doctor info / pricing later

- **Doctor schedule changes** → edit `convex/seed.ts` and run `npx convex run seed:run` (works on prod too with `--prod`)
- **Add a new pricing item** → edit `src/pages/Pricing.tsx`
- **Block a date** → use the admin dashboard at `/admin` → Blocked Dates tab

## Where to see your data

Two ways:

1. **Convex dashboard** — go to https://dashboard.convex.dev → your project → Data tab. You'll see tables `admins`, `appointments`, `doctors`, `blockedDates`. Click any row to view/edit.
2. **Your admin dashboard** at `/admin` — the prettier option for daily use.

## Troubleshooting

**"VITE_CONVEX_URL is not set"** in the browser console
→ You haven't created `.env` yet, or you forgot to restart `npm run dev` after creating it.

**Admin login fails with "Invalid credentials"**
→ The database isn't seeded. Run `npx convex run seed:run` (or `--prod` for production).

**Booking page stuck on "Choose your doctor"**
→ Same — database isn't seeded with doctors. Run the seed.

**Emails not arriving**
→ Check your EmailJS dashboard → "Email History" tab. If it says rate limit, you've hit the free 200/month cap. Otherwise check that all four `VITE_EMAILJS_*` env vars match exactly.

**Anything weird after editing convex/ files**
→ `npx convex dev` must be running to push changes. Restart it.

---

## Clinic info

| Field | Value |
|---|---|
| **Phone** | +91 79745 19062 |
| **Alt phone** | +91 98934 14797 |
| **WhatsApp** | +91 79745 19062 |
| **Email** | arunodayadentalclinic@gmail.com |
| **Address** | #1140, Opposite Commercial Auto, Besides Shastri Bridge, Napier Town, Jabalpur — 482001, MP |
| **Coordinates** | 23.15909724036924, 79.92969252169132 |
| **Hours** | Mon–Sat 10:30 AM – 3:30 PM & 5:30 PM – 8:30 PM. Sundays closed. |
| **Established** | 2012 |

Built with care for Arunodaya Dental Clinic.
