import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  EyeOff,
  Heart,
  Inbox,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import famorieLogo from "./assets/famorie_logo.png";

const steps = [
  {
    number: "01",
    title: "Inbox",
    description: "Capture everything in one place.",
    icon: Inbox,
  },
  {
    number: "02",
    title: "Understand",
    description: "AI finds what actually matters.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Organize",
    description: "Everything in the right place.",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "Remind",
    description: "The right people, at the right time.",
    icon: Bell,
  },
  {
    number: "05",
    title: "Brief",
    description: "Start the day in sync.",
    icon: MessageCircle,
  },
];

const features = [
  {
    icon: Inbox,
    title: "AI Family Inbox",
    headline: "Nothing important gets buried.",
    description:
      "Famorie can help surface the dates, tasks and details hidden inside the information your family receives.",
  },
  {
    icon: CalendarDays,
    title: "Shared Family Calendar",
    headline: "Everyone remains informed.",
    description:
      "Your family gets a shared view of individual calendars to summarize effortlessly.",
  },
  {
    icon: ClipboardCheck,
    title: "AI Task Assignment",
    headline: "Responsibility becomes clearer.",
    description:
      "Famorie can identify tasks and suggest who they could be assigned to, whether that's Mom, Dad or a child.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    headline: "Reminders become useful.",
    description:
      "Famorie connects the task, timing and person responsible, with useful recommendations where they make sense.",
  },
  {
    icon: MessageCircle,
    title: "Daily Family Briefing",
    headline: "Start your day briefed.",
    description:
      "Instead of piecing together your family's day yourself, Famorie can bring the important parts together in a daily family briefing.",
  },
];

const faqs = [
  {
    question: "What exactly is Famorie?",
    answer:
      "Famorie is an AI-powered family management system designed to turn the information families already receive into a shared, organized system. Instead of asking everyone to remember everything, Famorie helps the family understand what matters and what needs to happen next.",
  },
  {
    question: "Who is Famorie for?",
    answer:
      "Famorie is designed especially for busy families balancing work, children, school schedules, extracurricular activities, appointments, childcare, meals, groceries, travel, and everything else that tends to live in someone's head.",
  },
  {
    question: "Does everyone in the family need to use it?",
    answer:
      "The goal is the opposite of adding another app everyone has to constantly manage. Famorie is designed to reduce coordination overhead by turning incoming information into useful actions and shared visibility.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Famorie is designed to interpret information your family is already receiving — such as emails, messages, screenshots, and documents — and identify useful events, tasks, reminders, and other information. The AI is the mechanism; the outcome is a calmer, more coordinated family.",
  },
  {
    question: "Is Famorie available yet?",
    answer:
      "We're currently building Famorie. We're inviting families to join our early-access list and be among the first to experience it.",
  },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Famorie";

    const existingFavicon = document.querySelector("link[rel='icon']");

    if (existingFavicon) {
      existingFavicon.href = famorieLogo;
    } else {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = famorieLogo;
      document.head.appendChild(favicon);
    }

    if (!document.querySelector("#famorie-fonts")) {
      const fonts = document.createElement("link");
      fonts.id = "famorie-fonts";
      fonts.rel = "stylesheet";
      fonts.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap";

      document.head.appendChild(fonts);
    }
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenuOpen(false);
  };

  const handleWaitlistSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setSubmitted(true);
        setShowModal(true);
        setEmail("");
      } else {
        console.error('Failed to join waitlist');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#F7F3EB] text-[#2F3A45]"
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {/* =========================================================
          GLOBAL BRAND STYLES
      ========================================================== */}

      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            background: #F7F3EB;
          }

          button,
          input {
            font: inherit;
          }

          ::selection {
            background: #9BC9A5;
            color: #1F5D4E;
          }

          .famorie-heading {
            font-family: "Manrope", sans-serif;
          }

          .famorie-body {
            font-family: "Source Sans 3", sans-serif;
          }

          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes scale-in {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            60% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between rounded-full border border-[#D9E3DC] bg-[#F7F3EB]/95 px-4 py-3 shadow-[0_10px_35px_rgba(47,58,69,0.08)] backdrop-blur-xl sm:px-6">
            <button
              onClick={() => scrollToSection("top")}
              className="flex items-center gap-3"
              aria-label="Go to Famorie home"
            >
              <img
                src={famorieLogo}
                alt="Famorie"
                className="h-10 w-10 rounded-xl object-cover"
              />

              <span className="famorie-heading text-xl font-bold tracking-[-0.04em] text-[#1F5D4E]">
                Famorie
              </span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-semibold text-[#526A63] transition hover:text-[#1F5D4E]"
              >
                How It Works
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-semibold text-[#526A63] transition hover:text-[#1F5D4E]"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-semibold text-[#526A63] transition hover:text-[#1F5D4E]"
              >
                FAQ
              </button>
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection("early-access")}
                className="group flex items-center gap-2 rounded-full bg-[#1F5D4E] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174B40]"
              >
                Get Early Access

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-[#1F5D4E] md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="mt-2 rounded-3xl border border-[#D9E3DC] bg-[#F7F3EB] p-4 shadow-xl md:hidden">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#2F3A45] hover:bg-white"
                >
                  How It Works
                </button>

                <button
                  onClick={() => scrollToSection("features")}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#2F3A45] hover:bg-white"
                >
                  Features
                </button>

                <button
                  onClick={() => scrollToSection("why-famorie")}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#2F3A45] hover:bg-white"
                >
                  Why Famorie
                </button>

                <button
                  onClick={() => scrollToSection("faq")}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#2F3A45] hover:bg-white"
                >
                  FAQ
                </button>

                <button
                  onClick={() => scrollToSection("early-access")}
                  className="mt-2 rounded-2xl bg-[#1F5D4E] px-4 py-3 text-left text-sm font-bold text-[#F7F3EB]"
                >
                  Get Early Access →
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main id="top">
        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative overflow-hidden bg-[#1F5D4E] pt-36 text-white sm:pt-40">
          <div className="absolute left-[-12%] top-20 h-96 w-96 rounded-full bg-[#9BC9A5]/10 blur-3xl" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7BB8E8]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
            <div className="mx-auto max-w-4xl text-center">

              <h1
                className="
                  famorie-heading
                  mx-auto
                  w-full
                  whitespace-nowrap
                  text-center
                  text-[clamp(3rem,4.2vw,6rem)]
                  font-bold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-[#F7F3EB]
                "
              >
                Family life, on autopilot.
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#D6E8DF] sm:text-xl">
                School emails, appointments, reminders, groceries, and everything in between organized in one shared place so your family can spend less time remembering and more time living.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToSection("early-access")}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#b8e9d4] px-10 py-5 text-lg font-bold text-[#10483e] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto"
                >
                  Get Early Access

                  <ArrowRight
                    size={21}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                
              </div>

              <p className="mt-5 text-sm text-[#B9D3CA]">
                Your family information stays private and secure.
              </p>
            </div>

            {/* Hero Product Mockup — Mobile First */}

<div className="relative mx-auto mt-20 max-w-6xl">
  {/* Soft background glow */}
  <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9BC9A5]/20 blur-3xl" />

  <div className="relative mx-auto mt-20 flex max-w-7xl items-end justify-center gap-24">

    {/* LEFT PHONE — AI INBOX */}
    <div className="hidden sm:block">
      <div className="w-[270px] rounded-[2.8rem] border-[6px] border-[#202B2A] bg-[#202B2A] p-1 shadow-2xl shadow-black/25">
        <div className="overflow-hidden rounded-[2rem] bg-[#FAF8F3]">

          {/* Dynamic Island */}
          <div className="flex justify-center pt-2">
            <div className="h-5 w-24 rounded-full bg-[#202B2A]" />
          </div>

          <div className="px-5 pb-8 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-[#7B8E88]">
                  Famorie
                </p>

                <h3 className="famorie-heading mt-1 text-xl font-bold text-[#2F3A45]">
                  Inbox
                </h3>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#1F5D4E] p-4 text-white">
              <div className="flex items-center gap-2">
                
                <p className="text-xs font-bold">
                  Famorie AI
                </p>
              </div>

              <p className="mt-2 text-[11px] leading-4 text-[#D1E3DB]">
                I found 3 things worth adding to your family schedule.
              </p>
            </div>

            <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#9AA9A3]">
              Recent
            </p>

            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-[#E0E7E2] bg-white p-3">
                <p className="text-[11px] font-semibold text-[#2F3A45]">
                  School newsletter
                </p>
                <p className="mt-1 text-[9px] leading-4 text-[#7B8E88]">
                  Permission slip due Friday
                </p>

                <div className="mt-2 inline-flex rounded-full bg-[#EAF2EB] px-2 py-1 text-[8px] font-bold text-[#1F5D4E]">
                  Add to calendar
                </div>
              </div>

              <div className="rounded-2xl border border-[#E0E7E2] bg-white p-3">
                <p className="text-[11px] font-semibold text-[#2F3A45]">
                  Dentist reminder
                </p>
                <p className="mt-1 text-[9px] text-[#7B8E88]">
                  Thursday · 4:30 PM
                </p>
              </div>

              <div className="rounded-2xl border border-[#E0E7E2] bg-white p-3">
                <p className="text-[11px] font-semibold text-[#2F3A45]">
                  Soccer update
                </p>
                <p className="mt-1 text-[9px] text-[#7B8E88]">
                  Practice moved to 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* CENTER PHONE — TODAY */}
    <div className="relative z-10">
      <div className="w-[310px] rounded-[3rem] border-[6px] border-[#202B2A] bg-[#202B2A] p-1 shadow-2xl shadow-black/30 sm:w-[330px]">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#FAF8F3]">

          {/* Dynamic Island */}
          <div className="flex justify-center pt-2">
            <div className="h-5 w-28 rounded-full bg-[#202B2A]" />
          </div>

          <div className="px-6 pb-10 pt-5">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#7B8E88]">
                  Tuesday, September 1
                </p>

                <h3 className="famorie-heading mt-1 text-[22px] font-bold tracking-tight text-[#2F3A45]">
                  Good morning 👋
                </h3>
              </div>
            </div>

            {/* Today summary */}
            <div className="mt-6 rounded-3xl bg-[#1F5D4E] p-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B9D8CA]">
                Today
              </p>

              <p className="famorie-heading mt-2 text-3xl font-bold">
                8 things
              </p>

              <p className="mt-1 text-[11px] text-[#D1E3DB]">
                for your family to stay on top of
              </p>
            </div>


            {/* Quick stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-white p-4">
                <CalendarDays
                  size={18}
                  className="text-[#1F5D4E]"
                />

                <p className="famorie-heading mt-3 text-2xl font-bold text-[#2F3A45]">
                  3
                </p>

                <p className="mt-1 text-[10px] text-[#7B8E88]">
                  Events today
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <ClipboardCheck
                  size={18}
                  className="text-[#1F5D4E]"
                />

                <p className="famorie-heading mt-3 text-2xl font-bold text-[#2F3A45]">
                  5
                </p>

                <p className="mt-1 text-[10px] text-[#7B8E88]">
                  Tasks
                </p>
              </div>

            </div>


            {/* Coming up */}
            <div className="mt-4 rounded-2xl border border-[#E0E7E2] bg-white p-4">

              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#899B94]">
                  Coming up
                </p>

                <CalendarDays
                  size={15}
                  className="text-[#1F5D4E]"
                />
              </div>

              <div className="mt-3 space-y-2">

                <div className="flex items-center justify-between rounded-xl bg-[#F7F3EB] px-3 py-3">
                  <div>
                    <p className="text-[10px] font-semibold text-[#2F3A45]">
                      Soccer practice
                    </p>

                    <p className="mt-1 text-[9px] text-[#7B8E88]">
                      Today
                    </p>
                  </div>

                  <p className="text-[9px] font-bold text-[#1F5D4E]">
                    5:30 PM
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F7F3EB] px-3 py-3">
                  <div>
                    <p className="text-[10px] font-semibold text-[#2F3A45]">
                      Permission slip
                    </p>

                    <p className="mt-1 text-[9px] text-[#7B8E88]">
                      Due tomorrow
                    </p>
                  </div>

                  <p className="text-[9px] font-bold text-[#1F5D4E]">
                    Due
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


    {/* RIGHT PHONE — CALENDAR */}
    <div className="hidden sm:block">
      <div className="w-[270px] rounded-[2.8rem] border-[6px] border-[#202B2A] bg-[#202B2A] p-1 shadow-2xl shadow-black/25">
        <div className="overflow-hidden rounded-[2rem] bg-[#FAF8F3]">

          {/* Dynamic Island */}
          <div className="flex justify-center pt-2">
            <div className="h-5 w-24 rounded-full bg-[#202B2A]" />
          </div>

          <div className="px-5 pb-8 pt-5">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#7B8E88]">
                  Family
                </p>

                <h3 className="famorie-heading mt-1 text-xl font-bold text-[#2F3A45]">
                  Calendar
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2EB] text-[#1F5D4E]">
                <CalendarDays size={17} />
              </div>
            </div>

            {/* Mini calendar */}
            <div className="mt-5 rounded-2xl bg-white p-4">

              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-[#2F3A45]">
                  September 2026
                </p>

                <span className="text-[9px] font-semibold text-[#1F5D4E]">
                  Today
                </span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-y-3 text-center text-[8px] text-[#899B94]">
                {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                  <span key={day} className="font-bold">
                    {day}
                  </span>
                ))}

                {[31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
                  (day, index) => (
                    <span
                      key={`${day}-${index}`}
                      className={
                        day === 1
                          ? "mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#1F5D4E] font-bold text-white"
                          : "text-[#536B63]"
                      }
                    >
                      {day}
                    </span>
                  ),
                )}
              </div>
            </div>

            <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#899B94]">
              Tuesday
            </p>

            <div className="mt-3 space-y-3">

              <div className="rounded-2xl border-l-4 border-[#1F5D4E] bg-white p-3">
                <p className="text-[10px] font-semibold text-[#2F3A45]">
                  School pickup
                </p>

                <p className="mt-1 text-[9px] text-[#7B8E88]">
                  3:15 PM · Mom
                </p>
              </div>

              <div className="rounded-2xl border-l-4 border-[#9BC9A5] bg-white p-3">
                <p className="text-[10px] font-semibold text-[#2F3A45]">
                  Soccer practice
                </p>

                <p className="mt-1 text-[9px] text-[#7B8E88]">
                  5:30 PM · Dad
                </p>
              </div>

              <div className="rounded-2xl border-l-4 border-[#D8C49A] bg-white p-3">
                <p className="text-[10px] font-semibold text-[#2F3A45]">
                  Grocery run
                </p>

                <p className="mt-1 text-[9px] text-[#7B8E88]">
                  6:00 PM · Dad
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>
        {/* =========================================================
            PROBLEM RECOGNITION
        ========================================================== */}

        <section className="relative overflow-hidden border-y border-[#E4DED3] bg-[#F3EEE4] px-6 py-28 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5D4E]">
                  The problem
                </p>

                <h2 className="famorie-heading mt-5 text-4xl font-bold leading-tight tracking-[-0.055em] text-[#2F3A45] sm:text-5xl">
                  Running a family shouldn't feel like running a company.
                </h2>
                
              </div>

              <div>
                <div className="space-y-2 text-lg leading-8 text-[#586D66]">
                  <p>One parent gets the school email.</p>
                  <p>Someone else gets the appointment reminder.</p>
                  <p>Soccer practice changes time.</p>
                  <p>There's a permission slip to sign.</p>
                  <p>You're running low on groceries.</p>
                  <p>And somehow, someone has to keep track of all of it.</p>
                  <p>Usually, that someone is already carrying too much.</p>
                </div>

                <div className="mt-10 border-l-2 border-[#BFD7C7] pl-6">
  <p className="famorie-heading text-xl font-semibold leading-relaxed text-[#5E746D]">
    It's not just the doing.
    <br />
    <span className="text-[#1F5D4E]">
      It's the remembering.
    </span>
  </p>
</div>     
              </div>
            </div>

          </div>
        </section>

{/* =========================================================
    THE SOLUTION
========================================================== */}

<section
  id="why-famorie"
  className="relative overflow-hidden bg-[#0f4f43] px-6 py-24 text-white lg:px-8 lg:py-32"
>
  <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9de0c4]/10" />
  <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9de0c4]/10" />
  <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9de0c4]/10" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

      {/* LEFT SIDE */}
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9be0c3]">
          The Solution
        </p>

        <h2 className="mt-5 text-5xl text-[27px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl text-[#F7F3EB]">
          One family.
          <br />
          One shared brain.
        </h2>

        <p className="mt-7 max-w-lg text-lg leading-8 text-[#c2ddd5]">
          Famorie takes the information your family is already
          receiving and turns it into something everyone can
          understand and act on.
        </p>

        <div className="mt-8 inline-flex w-fit max-w-full items-center gap-3 whitespace-nowrap rounded-2xl border border-[#8bd8ba]/25 bg-white/5 px-5 py-4 text-sm text-[#b9ecd6]">

      <span className="whitespace-nowrap">
        Capture → Understand → Organize → Coordinate
      </span>
    </div>

        {/* Incoming information */}
        <div className="relative mt-12 min-h-[280px]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#83b8aa]">
            Too many places. Too much to remember.
          </p>

          <div className="relative h-56">

            <div className="absolute left-2 top-4 rotate-[-7deg] rounded-2xl bg-[#eaf6ef] px-4 py-3 text-[#173f37] shadow-xl">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#55a68b]" />

                <div>
                  <p className="text-xs font-semibold">
                    School trip permission
                  </p>

                  <p className="text-[10px] text-[#8b9d98]">
                    Today, 9:12 AM
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-8 top-12 rotate-[5deg] rounded-2xl bg-[#eaf6ef] px-4 py-3 text-[#173f37] shadow-xl">
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-[#4eaf88]" />

                <div>
                  <p className="text-xs font-semibold">
                    Soccer practice
                  </p>

                  <p className="text-[10px] text-[#8b9d98]">
                    Don't forget!
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-10 rotate-[3deg] rounded-2xl bg-[#eaf6ef] px-4 py-3 text-[#173f37] shadow-xl">
              <div className="flex items-center gap-3">
                <CalendarDays
                  size={18}
                  className="text-[#55a68b]"
                />

                <div>
                  <p className="text-xs font-semibold">
                    Piano class
                  </p>

                  <p className="text-[10px] text-[#8b9d98]">
                    Tomorrow, 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-4 rotate-[-4deg] rounded-2xl bg-[#dcefe5] px-4 py-3 text-[#173f37] shadow-xl">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-[#55a68b]" />

                <div>
                  <p className="text-xs font-semibold">
                    Doctor appointment
                  </p>

                  <p className="text-[10px] text-[#8b9d98]">
                    Sep 28, 2:30 PM
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE — FAMORIE SHARED BRAIN */}
      <div className="relative mx-auto min-h-[580px] w-full max-w-[620px]">

        {/* Orbit lines */}
        <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#89d9ba]/20" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#89d9ba]/25" />

        {/* Connecting lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 620 580"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Inbox → Famorie */}
          <line
            x1="310"
            y1="130"
            x2="310"
            y2="260"
            stroke="#89d9ba"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />

          {/* Understand → Famorie */}
          <line
            x1="460"
            y1="236"
            x2="390"
            y2="236"
            stroke="#89d9ba"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />

          {/* Organize → Famorie */}
          <line
            x1="435"
            y1="448"
            x2="390"
            y2="335"
            stroke="#89d9ba"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />

          {/* Remind → Famorie */}
          <line
            x1="185"
            y1="448"
            x2="230"
            y2="335"
            stroke="#89d9ba"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />

          {/* Brief → Famorie */}
          <line
            x1="160"
            y1="236"
            x2="230"
            y2="236"
            stroke="#89d9ba"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </svg>

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2.5rem] border border-[#b4e8d1]/40 bg-[#dff1e4] shadow-[0_0_80px_rgba(135,220,183,0.25)]">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-[#0f4f43]">
            <img
              src={famorieLogo}
              alt="Famorie"
              className="h-20 w-20 rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
          <p className="text-sm text-[#b9dcd2]">
            Everyone sees what matters.
          </p>

          <p className="mt-1 text-sm font-semibold text-[#9ce5c5]">
            Everyone knows what's next.
          </p>
        </div>

        {/* Orbit nodes */}
{steps.map((step, index) => {
  const positions = [
    "left-1/2 top-0 -translate-x-1/2",
    "right-0 top-[27%]",
    "right-[4%] bottom-[9%]",
    "left-[4%] bottom-[9%]",
    "left-0 top-[27%]",
  ];

  return (
    <div
      key={step.title}
      className={`absolute ${positions[index]} w-36 sm:w-40`}
    >
      <div className="group rounded-[1.5rem] border border-[#8bd8ba]/35 bg-[#195c50]/70 p-5 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#a8e9cf]/70 hover:bg-[#21665a]">

        {/* Icon intentionally removed */}

        <p className="mt-3 text-xs font-bold text-[#88cbb3]">
          {step.number}
        </p>

        <p className="mt-1 font-semibold">
          {step.title}
        </p>

        <p className="mt-1 text-[11px] leading-4 text-[#b8d7ce]">
          {step.description}
        </p>
      </div>
    </div>
  );
})}

        {/* Bottom message */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
          <p className="text-sm text-[#b9dcd2]">
            Everyone sees what matters.
          </p>

          <p className="mt-1 text-sm font-semibold text-[#9ce5c5]">
            Everyone knows what's next.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>
{/* =========================================================
    FEATURES
========================================================== */}

<section
  id="features"
  className="bg-[#F7F3EB] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

      <div className="max-w-none">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5D4E]">
          Famorie
        </p>

        <h2 className="famorie-heading mt-4 whitespace-nowrap text-4xl font-bold tracking-[-0.055em] text-[#2F3A45] sm:text-5xl">
          Move from Chaos to{" "}
          <span className="text-[#1F5D4E]">
            Clarity
          </span>
        </h2>
      </div>

      <p className="max-w-sm leading-7 text-[#6D7E78]">
        Famorie is taking the information coming at you and turning it into
        a clearer picture of what matters.
      </p>

    </div>


    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <article
            key={feature.title}
            className={`group rounded-[2rem] border border-[#DCE5DF] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFD7C7] hover:bg-[#EAF2EB] hover:shadow-xl hover:shadow-[#1F5D4E]/5 ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >

            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2EB] text-[#1F5D4E] transition-all duration-300 group-hover:bg-[#1F5D4E] group-hover:text-white">
              <Icon size={22} />
            </div>


            {/* Feature Category */}
            <p className="mt-7 text-sm font-bold text-[#668D80]">
              {feature.title}
            </p>


            {/* Feature Heading */}
            <h3 className="famorie-heading mt-2 text-2xl font-bold tracking-tight text-[#2F3A45]">
              {feature.headline}
            </h3>


            {/* Feature Description */}
            <p className="mt-4 max-w-xl leading-7 text-[#71827C]">
              {feature.description}
            </p>

          </article>
        );
      })}

    </div>

  </div>
</section>

        {/* =========================================================
    HOW IT WORKS
========================================================== */}

<section
  id="how-it-works"
  className="bg-[#1F5D4E] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A8D4B2]">
        How it works
      </p>

      <h2 className="famorie-heading mt-4 text-4xl text-[27px] font-bold tracking-[-0.055em] text-[#F7F3EB] sm:text-5xl">
        Let Famorie do the thinking.
      </h2>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {[
        {
          number: "01",
          title: "Give it the information",
          description:
            "Email. Screenshot. PDF. Message. Bring in the information that's already part of your family's life.",
        },
        {
          number: "02",
          title: "Let Famorie make sense of it",
          description:
            "Famorie helps identify the important events, tasks, timing and responsibilities hidden inside it.",
        },
        {
          number: "03",
          title: "Know what happens next",
          description:
            "Your family gets a clearer view of the schedule, tasks, reminders and daily priorities.",
        },
      ].map((item) => {
        return (
          <div
            key={item.number}
            className="group rounded-[2rem] border border-white/15 bg-[#255F50] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#A8D4B2]/40 hover:bg-[#2A6656] hover:shadow-xl hover:shadow-black/10"
          >
            <span className="mt-7 block text-sm font-bold text-[#A8D4B2]">
              {item.number}
            </span>

            <h3 className="famorie-heading mt-3 text-2xl font-bold tracking-tight text-[#F7F3EB]">
              {item.title}
            </h3>

            <p className="mt-4 leading-7 text-[#D5E6DF]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>

  </div>
</section>

        {/* =========================================================
    PRIVACY
========================================================== */}

<section
  id="privacy"
  className="bg-[#F7F3EB] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F5D4E]">
          Your family's privacy
        </p>

        <h2 className="famorie-heading mt-4 max-w-3xl text-4xl font-bold tracking-[-0.055em] text-[#2F3A45] sm:text-5xl">
          Privacy comes first.
        </h2>
      </div>

      <p className="max-w-md leading-7 text-[#6D7E78] lg:justify-self-end">
        The information that helps Famorie serve your family is personal. We’ll treat it that way.
      </p>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {[
        {
          title: "Your Data, Your Control",
          text: "Your family's information stays in your hands.",
        },
        {
          title: "Privacy by Design",
          text: "We value and prioritize privacy from the start.",
        },
        {
          title: "Clear & Transparent",
          text: "We’ll be upfront about what we collect and why.",
        },
      ].map((item) => (
        <div
  key={item.title}
  className="group rounded-[2rem] border border-[#DCE5DF] bg-white p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFD7C7] hover:bg-[#EAF2EB] hover:shadow-xl hover:shadow-[#1F5D4E]/5"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2EB] text-[#1F5D4E] transition-all duration-300 group-hover:bg-[#1F5D4E] group-hover:text-white">
    <ShieldCheck size={20} />
  </div>

  <h3 className="famorie-heading mt-6 text-xl font-bold tracking-tight text-[#2F3A45]">
    {item.title}
  </h3>

  <p className="mt-3 leading-7 text-[#6D7E78]">
    {item.text}
  </p>
</div>
      ))}
    </div>

  </div>
</section>

{/* =========================================================
    WHY FAMORIE / COMPARISON
========================================================== */}

<section
  id="comparison"
  className="bg-[#1F5D4E] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-6xl">

    {/* Section Header */}
    <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9BC9A5]">
          Why Famorie
        </p>

        <h2 className="famorie-heading mt-5 max-w-3xl text-4xl font-bold tracking-[-0.055em] text-[#F7F3EB] sm:text-5xl lg:text-6xl">
          Stop juggling apps.
        </h2>
      </div>

    </div>


    {/* Comparison Table */}
    <div className="mx-auto mt-14 overflow-hidden rounded-[2rem] border border-[#9BC9A5]/30 bg-[#F7F3EB] shadow-2xl shadow-black/10">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[680px] border-collapse">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#DCE5DF]">

              <th className="w-[40%] px-6 py-7 text-left text-base font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                WHAT YOU NEED
              </th>

              <th className="w-[32%] border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-bold leading-6 text-[#6D7E78] sm:px-8 sm:py-8">
                WhatsApp + Calendar + Google Drive
              </th>

              <th className="w-[28%] border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold text-[#1F5D4E] sm:px-8 sm:py-8">
                Famorie
              </th>

            </tr>
          </thead>


          {/* Table Body */}
          <tbody>

            {/* Family messages */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Family messages
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                ✓
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Brings relevant information together
              </td>

            </tr>


            {/* Calendars & schedules */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Calendars & schedules
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                ✓
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Shared family view
              </td>

            </tr>


            {/* Documents & files */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Documents & files
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                ✓
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Turns information into action
              </td>

            </tr>


            {/* Tasks */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Tasks
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                Manual
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                AI-assisted task detection
              </td>

            </tr>


            {/* Who needs to do it? */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Who needs to do it?
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold leading-6 text-[#71827C] sm:px-8 sm:py-8">
                You figure it out
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Suggests who can take it on
              </td>

            </tr>


            {/* Reminders */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Reminders
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                Separate
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Connected to the task & person
              </td>

            </tr>


            {/* Daily overview */}
            <tr className="border-b border-[#DCE5DF]">

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Daily overview
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-xl font-medium text-[#A5B1AD] sm:px-8 sm:py-8">
                —
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                Family briefing
              </td>

            </tr>


            {/* Family coordination */}
            <tr>

              <td className="px-6 py-7 text-left text-lg font-bold text-[#2F3A45] sm:px-8 sm:py-8">
                Family coordination
              </td>

              <td className="border-l border-[#DCE5DF] px-6 py-7 text-center text-base font-semibold text-[#71827C] sm:px-8 sm:py-8">
                Scattered
              </td>

              <td className="border-l border-[#C9DED0] bg-[#EAF2EB] px-6 py-7 text-center text-base font-bold leading-6 text-[#1F5D4E] sm:px-8 sm:py-8">
                One connected system
              </td>

            </tr>

          </tbody>

        </table>

      </div>
    </div>


    {/* Supporting Statement */}
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <p className="max-w-2xl text-sm leading-6 text-[#BFD7CC]">
        You shouldn't have to search through conversations and calendars just
        to figure out what needs to happen next.
      </p>

      <span className="shrink-0 text-sm font-bold text-[#9BC9A5]">
        One family. One shared brain.
      </span>

    </div>

  </div>
</section>
        {/* =========================================================
    EARLY ACCESS
========================================================== */}

<section
  id="early-access"
  className="bg-[#F7F3EB] px-6 py-24 text-[#2F3A45] lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-4xl text-center">

    <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#1F5D4E]">
      Famorie is coming
    </p>

    <h2 className="famorie-heading mt-5 text-4xl font-bold tracking-[-0.055em] text-[#2F3A45] sm:text-6xl">
      Your family has enough to remember.
    </h2>

    <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#6D7E78]">
      Let Famorie remember the rest.
    </p>

    {!submitted ? (
      <form
        onSubmit={handleWaitlistSubmit}
        className="mx-auto mt-9 max-w-xl"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="min-w-0 flex-1 rounded-full border border-[#DCE5DF] bg-white px-5 py-4 text-[#2F3A45] outline-none placeholder:text-[#8B9B96] focus:ring-2 focus:ring-[#9BC9A5]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-center gap-2 rounded-full bg-[#1F5D4E] px-6 py-4 font-bold text-[#F7F3EB] transition hover:-translate-y-0.5 hover:bg-[#174F42] disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Joining..." : "Join Early Access"}

            {!isSubmitting && (
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </div>

        <p className="mt-5 text-xs text-[#7A8D87]">
          Be among the first to use Famorie.
        </p>
      </form>
    ) : (
      <div className="mx-auto mt-9 max-w-xl rounded-[2rem] border border-[#BFD7C7] bg-white p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#9BC9A5] text-[#1F5D4E]">
          <Check size={23} />
        </div>

        <h3 className="famorie-heading mt-5 text-2xl font-bold text-[#2F3A45]">
          You're on the list.
        </h3>

        <p className="mt-2 text-[#6D7E78]">
          We'll keep you posted as Famorie gets closer.
        </p>
      </div>
    )}
  </div>
</section>
        {/* =========================================================
    FAQ
========================================================== */}

<section
  id="faq"
  className="bg-[#1F5D4E] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-3xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#A8D4B2]">
        Frequently Asked Questions
      </p>

      <h2 className="famorie-heading mt-4 text-4xl font-bold tracking-[-0.055em] text-[#F7F3EB] sm:text-5xl">
        FAQs
      </h2>
    </div>

    <div className="mt-12 divide-y divide-white/15 rounded-[2rem] border border-white/15 bg-[#255F50] px-6 sm:px-8">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div key={faq.question}>
            <button
              onClick={() =>
                setOpenFaq(isOpen ? null : index)
              }
              className="flex w-full items-center justify-between gap-5 py-6 text-left"
            >
              <span className="famorie-heading font-bold text-[#F7F3EB]">
                {faq.question}
              </span>

              <ChevronDown
                size={19}
                className={`shrink-0 text-[#A8D4B2] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pr-8 leading-7 text-[#D5E6DF]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
</main>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="bg-[#F7F3EB] px-6 pb-10 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-[#D9E2DC] pt-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src={famorieLogo}
                  alt="Famorie"
                  className="h-10 w-10 rounded-xl object-cover"
                />

                <span className="famorie-heading text-xl font-bold tracking-[-0.04em] text-[#1F5D4E]">
                  Famorie
                </span>
              </div>

              <p className="mt-4 max-w-sm leading-7 text-[#71827C]">
                Because family comes first.
              </p>
            </div>

            <div>
              <p className="famorie-heading text-sm font-bold text-[#2F3A45]">
                Explore
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#71827C]">
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-left transition hover:text-[#1F5D4E]"
                >
                  How It Works
                </button>

                <button
                  onClick={() => scrollToSection("features")}
                  className="text-left transition hover:text-[#1F5D4E]"
                >
                  Features
                </button>

                <button
                  onClick={() => scrollToSection("why-famorie")}
                  className="text-left transition hover:text-[#1F5D4E]"
                >
                  Why Famorie
                </button>

                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-left transition hover:text-[#1F5D4E]"
                >
                  FAQ
                </button>
              </div>
            </div>

            <div>
              <p className="famorie-heading text-sm font-bold text-[#2F3A45]">
                Stay connected
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#71827C]">
                <button
                  onClick={() => scrollToSection("early-access")}
                  className="flex items-center gap-2 transition hover:text-[#1F5D4E]"
                >
                  Get Early Access
                  <ChevronRight size={15} />
                </button>

                <span>Made for families, with care.</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#D9E2DC] pt-6 text-xs text-[#8A9994] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Famorie. All rights reserved.</p>

            <p>Family life, beautifully organized.</p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2F3A45]/40 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-md scale-100 transform overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl transition-all">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 rounded-full p-2 text-[#6D7E78] transition-colors hover:bg-[#F7F3EB] hover:text-[#2F3A45]"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF2EB] text-[#1F5D4E]">
                 <svg
                    className="h-10 w-10 animate-[scale-in_0.5s_ease-out]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      className="animate-[dash_0.8s_ease-out_forwards]"
                      strokeDasharray="24"
                      strokeDashoffset="24"
                    />
                  </svg>
              </div>

              <h3 className="famorie-heading text-2xl font-bold text-[#2F3A45]">
                Thank you for signing up!
              </h3>
              
              <p className="mt-3 text-[#6D7E78]">
                You're on the list. Our team will contact you within 24 hours.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-8 w-full rounded-full bg-[#1F5D4E] py-4 font-bold text-white transition hover:bg-[#174F42]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;