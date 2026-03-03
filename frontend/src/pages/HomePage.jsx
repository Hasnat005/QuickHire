import { useState } from 'react'
import heroImage from '../../assets/image.png'
import patternImage from '../../assets/pattern.jpeg'
import amdLogo from '../../assets/company_logo/amd.png'
import intelLogo from '../../assets/company_logo/intel.png'
import talkitLogo from '../../assets/company_logo/talkit.png'
import teslaLogo from '../../assets/company_logo/tesla.png'
import vodaponeLogo from '../../assets/company_logo/vodapone.png'
import backgroundBlue from '../../assets/bg/background_blue.png'
import dashboardImage from '../../assets/bg/dashboard.png'
import companyLogo from '../../assets/bg/logo.png'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronDown,
  Code2,
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Megaphone,
  Monitor,
  PencilRuler,
  Search,
  Twitter,
  Users,
  Wallet,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const companyLogos = [
  { src: vodaponeLogo, alt: 'Vodafone' },
  { src: intelLogo, alt: 'Intel' },
  { src: teslaLogo, alt: 'Tesla' },
  { src: amdLogo, alt: 'AMD' },
  { src: talkitLogo, alt: 'Talkit' },
]

const categories = [
  { title: 'Design', jobs: 235, icon: PencilRuler },
  { title: 'Sales', jobs: 756, icon: BarChart3 },
  { title: 'Marketing', jobs: 140, icon: Megaphone, featured: true },
  { title: 'Finance', jobs: 325, icon: Wallet },
  { title: 'Technology', jobs: 436, icon: Monitor },
  { title: 'Engineering', jobs: 542, icon: Code2 },
  { title: 'Business', jobs: 211, icon: Briefcase },
  { title: 'Human Resource', jobs: 346, icon: Users },
]

const featuredJobs = [
  {
    id: 'revolut-email-marketing',
    logoText: 'R',
    logoClassName: 'text-[#2a3040] text-[52px] font-black italic',
    title: 'Email Marketing',
    company: 'Revolut',
    location: 'Madrid, Spain',
    description: 'Revolut is looking for Email Marketing to help team ma ...',
    tags: [
      { label: 'Marketing', className: 'bg-[#fdf1df] text-[#f8ae3f]' },
      { label: 'Design', className: 'bg-[#e8f8f3] text-[#43c6a2]' },
    ],
  },
  {
    id: 'dropbox-brand-designer',
    logoText: '◆',
    logoClassName: 'text-[#1d73f8] text-[40px] font-bold',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, US',
    description: 'Dropbox is looking for Brand Designer to help the team t ...',
    tags: [
      { label: 'Design', className: 'bg-[#e8f8f3] text-[#43c6a2]' },
      { label: 'Business', className: 'bg-[#edeafe] text-[#4f46e5]' },
    ],
  },
  {
    id: 'pitch-email-marketing',
    logoText: 'Pitch',
    logoClassName:
      'h-14 w-14 rounded-full bg-black text-white text-[20px] font-medium flex items-center justify-center',
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    description: 'Pitch is looking for Customer Manager to join marketing t ...',
    tags: [{ label: 'Marketing', className: 'bg-[#fdf1df] text-[#f8ae3f]' }],
  },
  {
    id: 'blinklist-visual-designer',
    logoText: '◔',
    logoClassName: 'text-[#32d583] text-[52px] font-bold',
    title: 'Visual Designer',
    company: 'Blinklist',
    location: 'Granada, Spain',
    description: 'Blinkist is looking for Visual Designer to help team desi ...',
    tags: [{ label: 'Design', className: 'bg-[#e8f8f3] text-[#43c6a2]' }],
  },
  {
    id: 'classpass-product-designer',
    logoText: '⊂',
    logoClassName:
      'h-14 w-14 rounded-full bg-[#1d73f8] text-white text-[46px] font-semibold flex items-center justify-center',
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    description: 'ClassPass is looking for Product Designer to help us...',
    tags: [
      { label: 'Marketing', className: 'bg-[#fdf1df] text-[#f8ae3f]' },
      { label: 'Design', className: 'bg-[#e8f8f3] text-[#43c6a2]' },
    ],
  },
  {
    id: 'canva-lead-designer',
    logoText: 'Canva',
    logoClassName:
      'h-14 w-14 rounded-full bg-[#44bfc2] text-white text-[18px] font-semibold italic flex items-center justify-center',
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    description: 'Canva is looking for Lead Engineer to help develop n ...',
    tags: [
      { label: 'Design', className: 'bg-[#e8f8f3] text-[#43c6a2]' },
      { label: 'Business', className: 'bg-[#edeafe] text-[#4f46e5]' },
    ],
  },
  {
    id: 'godaddy-brand-strategist',
    logoText: '∞',
    logoClassName: 'text-black text-[52px] font-semibold',
    title: 'Brand Strategist',
    company: 'GoDaddy',
    location: 'Marseille, France',
    description: 'GoDaddy is looking for Brand Strategist to join the team...',
    tags: [{ label: 'Marketing', className: 'bg-[#fdf1df] text-[#f8ae3f]' }],
  },
  {
    id: 'twitter-data-analyst',
    logoText: '🐦',
    logoClassName:
      'h-14 w-14 rounded-full bg-[#1d9bf0] text-white text-[28px] flex items-center justify-center',
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    description: 'Twitter is looking for Data Analyst to help team desi ...',
    tags: [{ label: 'Technology', className: 'bg-[#feeeea] text-[#ff6550]' }],
  },
]

const latestJobsOpen = [
  {
    id: 'nomad-social-media-assistant',
    logo: 'N',
    logoClassName: 'bg-[#65c8a8] text-white',
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
  },
  {
    id: 'netlify-social-media-assistant',
    logo: '✦',
    logoClassName: 'bg-[#35b8c9] text-white',
    title: 'Social Media Assistant',
    company: 'Netlify',
    location: 'Paris, France',
  },
  {
    id: 'dropbox-brand-designer',
    logo: '◆',
    logoClassName: 'bg-[#1d73f8] text-white',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, USA',
  },
  {
    id: 'maze-brand-designer',
    logo: '∞',
    logoClassName: 'bg-[#1d73f8] text-white',
    title: 'Brand Designer',
    company: 'Maze',
    location: 'San Fransisco, USA',
  },
  {
    id: 'terraform-interactive-developer',
    logo: 'T',
    logoClassName: 'bg-[#3ac2db] text-white',
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
  },
  {
    id: 'udacity-interactive-developer',
    logo: 'U',
    logoClassName: 'bg-[#13b0da] text-white',
    title: 'Interactive Developer',
    company: 'Udacity',
    location: 'Hamburg, Germany',
  },
  {
    id: 'packer-hr-manager',
    logo: 'P',
    logoClassName: 'bg-[#ff6a55] text-white',
    title: 'HR Manager',
    company: 'Packer',
    location: 'Lucern, Switzerland',
  },
  {
    id: 'webflow-hr-manager',
    logo: 'W',
    logoClassName: 'bg-[#4f46e5] text-white',
    title: 'HR Manager',
    company: 'Webflow',
    location: 'Lucern, Switzerland',
  },
]

function HomePage() {
  const navigate = useNavigate()
  const [heroKeyword, setHeroKeyword] = useState('')
  const [heroLocation, setHeroLocation] = useState('all')

  const handleHeroSearch = (event) => {
    event.preventDefault()

    const params = new URLSearchParams()

    if (heroKeyword.trim()) {
      params.set('q', heroKeyword.trim())
    }

    if (heroLocation !== 'all') {
      params.set('location', heroLocation)
    }

    navigate({
      pathname: '/jobs',
      search: params.toString() ? `?${params.toString()}` : '',
    })
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1536px] px-6 md:px-8 lg:px-10">
      <section className="relative overflow-hidden bg-[#f4f5fb] pb-12 pt-10 md:pb-16 md:pt-12">
        <img
          src={patternImage}
          alt=""
          className="pointer-events-none absolute right-[-140px] top-0 hidden h-[760px] max-w-none opacity-30 lg:block"
        />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6">
          <div className="max-w-[760px]">
            <h1 className="text-5xl font-extrabold leading-[0.98] tracking-tight text-[#243251] sm:text-6xl lg:text-[96px]">
              Discover
              <br />
              more than
              <br />
              <span className="text-[#2a9cf4]">5000+ Jobs</span>
            </h1>

            <div className="relative mt-5 h-7 w-full max-w-[560px] overflow-hidden">
              <span className="absolute left-0 top-0 h-[5px] w-[91%] rounded-full bg-[#2a9cf4]" />
              <span className="absolute left-1 top-[10px] h-[5px] w-[98%] rounded-full bg-[#2a9cf4]" />
              <span className="absolute left-3 top-[20px] h-[5px] w-[94%] rounded-full bg-[#2a9cf4]" />
            </div>

            <p className="mt-9 max-w-[740px] text-[22px] leading-[1.58] text-[#7f8a9f]">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            <form
              onSubmit={handleHeroSearch}
              className="mt-8 grid gap-0 border border-[#dbe0ec] bg-white md:grid-cols-[1.22fr_1fr_auto] md:items-center"
            >
              <div className="flex h-[90px] items-center gap-4 px-8">
                <Search className="h-8 w-8 shrink-0 text-[#2f3b56]" strokeWidth={2} />
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={heroKeyword}
                    onChange={(event) => setHeroKeyword(event.target.value)}
                    className="w-full border-none bg-transparent pb-4 text-base text-[#4d5975] outline-none placeholder:text-[#b0b7c4]"
                  />
                  <div className="h-px w-full bg-[#d7ddea]" />
                </div>
              </div>

              <div className="flex h-[90px] items-center gap-4 border-l border-[#e0e4ee] px-8">
                <MapPin className="h-8 w-8 shrink-0 text-[#2f3b56]" strokeWidth={2} />
                <div className="w-full">
                  <div className="relative">
                    <select
                      value={heroLocation}
                      onChange={(event) => setHeroLocation(event.target.value)}
                      className="w-full appearance-none border-none bg-transparent pb-4 pr-10 text-base text-[#3f4d68] outline-none"
                    >
                      <option value="all">All locations</option>
                      <option value="Florence, Italy">Florence, Italy</option>
                      <option value="Berlin, Germany">Berlin, Germany</option>
                      <option value="Paris, France">Paris, France</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-6 w-6 text-[#7f889b]" />
                  </div>
                  <div className="h-px w-full bg-[#d7ddea]" />
                </div>
              </div>

              <button
                type="submit"
                className="h-[90px] bg-indigo-600 px-12 text-base font-bold text-white transition hover:bg-indigo-700"
              >
                Search my job
              </button>
            </form>

            <p className="mt-5 text-sm text-[#6f788b]">
              Popular : UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          <div className="relative hidden min-h-[640px] items-end justify-end lg:flex">
            <img
              src={heroImage}
              alt="Job seeker"
              className="relative z-10 h-auto w-[630px] max-w-none xl:w-[690px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5fb] pb-14 pt-2 md:pb-16">
        <div className="px-2 md:px-0">
          <p className="text-[16px] font-medium text-[#818a9b]">Companies we helped grow</p>

          <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12">
            {companyLogos.map((logo) => (
              <div key={logo.alt} className="flex h-9 items-center justify-start lg:justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-9 w-auto opacity-45 grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5fb] pb-20 pt-4">
        <div className="px-0 py-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#243251] md:text-5xl">
              Explore by <span className="text-[#2a9cf4]">category</span>
            </h2>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition hover:text-indigo-700 md:text-lg"
            >
              Show all jobs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              const isFeatured = Boolean(category.featured)

              return (
                <article
                  key={category.title}
                  className={`group min-h-[252px] border px-7 py-8 transition-colors duration-200 lg:min-h-[300px] lg:px-9 lg:py-10 ${
                    isFeatured
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 bg-white text-[#243251] hover:border-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  <Icon className="h-10 w-10" />

                  <h3 className="mt-10 text-3xl font-bold leading-tight">{category.title}</h3>

                  <div
                    className={`mt-4 flex items-center justify-between text-lg ${
                      isFeatured ? 'text-white/95' : 'text-slate-500 group-hover:text-white/95'
                    }`}
                  >
                    <span>{category.jobs} jobs available</span>
                    <ArrowRight
                      className={`h-5 w-5 ${
                        isFeatured ? 'text-white' : 'text-[#243251] group-hover:text-white'
                      }`}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5fb] pb-24 pt-6 md:pt-8">
        <div className="relative overflow-hidden rounded-none">
          <img
            src={backgroundBlue}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative grid min-h-[420px] items-center gap-8 px-8 py-10 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-20 xl:min-h-[520px] xl:px-24">
            <div className="max-w-[460px] text-white lg:max-w-[540px]">
              <h2 className="text-5xl font-extrabold leading-[1.02] md:text-6xl lg:text-[72px]">
                Start posting
                <br />
                jobs today
              </h2>

              <p className="mt-7 text-2xl leading-[1.35] text-white/90 lg:text-lg">
                Start posting jobs for only $10.
              </p>

              <Link
                to="/admin/signup"
                className="mt-5 inline-flex h-16 items-center bg-white px-10 text-xl font-bold text-indigo-600 transition hover:bg-indigo-50 md:mt-10 md:h-15 md:px-12 md:text-base"
              >
                Sign Up For Free
              </Link>
            </div>

            <div className="relative hidden justify-end lg:flex">
              <img
                src={dashboardImage}
                alt="Recruiter dashboard preview"
                className="h-auto w-full max-w-[760px] xl:max-w-[820px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5fb] pb-20 pt-2 md:pt-4">
        <div className="px-0">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#243251] md:text-5xl">
              Featured <span className="text-[#2a9cf4]">jobs</span>
            </h2>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition hover:text-indigo-700 md:text-lg"
            >
              Show all jobs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featuredJobs.map((job) => (
              <article
                key={job.id}
                className="min-h-[272px] border border-[#d8dfef] bg-white px-6 py-6 lg:min-h-[390px] lg:px-7 lg:py-7"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 items-center">
                    {job.logoClassName.includes('h-14 w-14 rounded-full') ? (
                      <span className={job.logoClassName}>{job.logoText}</span>
                    ) : (
                      <span className={job.logoClassName}>{job.logoText}</span>
                    )}
                  </div>

                  <span className="inline-flex h-10 items-center border border-[#7166fd] px-4 text-sm font-medium text-[#5146ee]">
                    Full Time
                  </span>
                </div>

                <h3 className="mt-7 text-3xl font-bold leading-tight text-[#28344d]">{job.title}</h3>

                <p className="mt-2 text-lg text-[#5f6980]">
                  {job.company} <span className="px-1">·</span> {job.location}
                </p>

                <p className="mt-4 line-clamp-2 text-base leading-[1.45] text-[#818a9c]">
                  {job.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {job.tags.map((tag) => (
                    <span
                      key={`${job.id}-${tag.label}`}
                      className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4f5fb] pb-24 pt-2 md:pt-4">
        <img
          src={patternImage}
          alt=""
          className="pointer-events-none absolute right-[-210px] top-0 hidden h-[780px] max-w-none opacity-25 lg:block"
        />

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-[#243251] md:text-[64px]">
              Latest <span className="text-[#2a9cf4]">jobs open</span>
            </h2>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-4 text-xl font-semibold text-indigo-600 transition hover:text-indigo-700 md:text-lg"
            >
              Show all jobs
              <ArrowRight className="h-9 w-9" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {latestJobsOpen.map((job) => (
              <article
                key={job.id}
                className="flex items-start gap-5 border border-[#dbe1f0] bg-white px-6 py-6 lg:gap-7 lg:px-8 lg:py-8"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold lg:h-16 lg:w-16 lg:text-[28px] ${job.logoClassName}`}
                >
                  {job.logo}
                </div>

                <div className="min-w-0">
                  <h3 className="text-3xl font-bold leading-tight text-[#28344d]">{job.title}</h3>
                  <p className="mt-2 text-lg text-[#5f6980]">
                    {job.company} <span className="px-1">•</span> {job.location}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 lg:mt-5 lg:gap-4">
                    <span className="inline-flex h-9 items-center rounded-full bg-[#e8f8f3] px-4 text-sm font-semibold text-[#43c6a2]">
                      Full-Time
                    </span>
                    <span className="h-8 w-px bg-[#dce2ee] lg:h-10" />
                    <span className="inline-flex h-9 items-center rounded-full border border-[#f8ae3f] px-4 text-sm font-semibold text-[#f8ae3f]">
                      Marketing
                    </span>
                    <span className="inline-flex h-9 items-center rounded-full border border-[#5a52f5] px-4 text-sm font-semibold text-[#5a52f5]">
                      Design
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </div>

      <footer className="w-full bg-[#1f2538] pb-12 pt-14 text-white md:pb-14 md:pt-16">
        <div className="mx-auto w-full max-w-[1536px] px-6 md:px-8 lg:px-10">
          <div className="grid gap-10 [grid-template-columns:repeat(1,minmax(0,1fr))] md:[grid-template-columns:repeat(2,minmax(0,1fr))] lg:[grid-template-columns:repeat(4,minmax(0,1fr))] lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <img src={companyLogo} alt="QuickHire logo" className="h-11 w-11 object-contain" />
                <span className="text-4xl font-bold leading-none tracking-tight">QuickHire</span>
              </div>

              <p className="mt-8 max-w-[520px] text-lg leading-[1.7] text-[#d0d5e2]">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold">About</h3>
              <ul className="mt-6 space-y-4 text-lg leading-[1.7] text-[#d0d5e2]">
                <li>Companies</li>
                <li>Pricing</li>
                <li>Terms</li>
                <li>Advice</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold">Resources</h3>
              <ul className="mt-6 space-y-4 text-lg leading-[1.7] text-[#d0d5e2]">
                <li>Help Docs</li>
                <li>Guide</li>
                <li>Updates</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold leading-[1.2]">Get job notifications</h3>
              <p className="mt-6 max-w-[520px] text-lg leading-[1.7] text-[#d0d5e2]">
                The latest job news, articles, sent to your inbox weekly.
              </p>

              <div className="mt-8 flex w-full max-w-[620px] items-stretch gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-10 min-w-0 flex-1 border-none bg-white px-5 text-lg leading-none text-[#4b5567] outline-none placeholder:text-[#a3aab8]"
                />
                <button className="h-10 shrink-0 whitespace-nowrap bg-[#4f46e5] px-8 text-lg font-semibold leading-none text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>


          <div className="mt-12 border-t border-[#343b50]" />

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-lg leading-[1.6] text-[#9aa2b4]">2021 @ QuickHire. All rights reserved.</p>

            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#343b4e] text-white transition hover:bg-[#4f46e5]"
                  aria-label="social link"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage