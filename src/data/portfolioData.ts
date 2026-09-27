import type {
  ProfileData,
  Project,
  TechItem,
  ExperienceItem,
  CertificateItem
} from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Aditya Permana',

  tagline: 'Rekayasa Perangkat Lunak • Administrasi • Data Management • Web Development',

  education: 'Rekayasa Perangkat Lunak (RPL) • SMK Bina Cendekia Cirebon',

  status: 'Terbuka untuk Peluang Kerja dan Pengembangan Sistem Digital',

  bio: 'Saya lulusan Rekayasa Perangkat Lunak dari SMK Bina Cendekia Cirebon dengan nilai akhir 90. Memiliki pengalaman di bidang administrasi, pengelolaan data, pengembangan sistem digital sederhana, serta F&B sebagai kasir dan kitchen. Terbiasa melakukan data entry, verifikasi data, pengelolaan dokumen, pembuatan laporan, serta menggunakan berbagai sistem kerja digital seperti Microsoft Office, Accurate, IDOS, dan sistem administrasi lainnya. Memiliki ketelitian, kemampuan komunikasi yang baik, mampu bekerja secara individu maupun dalam tim, terbiasa bekerja dengan target, menangani volume pekerjaan yang tinggi, serta mengikuti prosedur kerja (SOP). Memiliki kemampuan dasar pengembangan website, mampu beradaptasi dengan lingkungan kerja baru, disiplin, bertanggung jawab, proaktif, dan berorientasi pada penyelesaian pekerjaan.',

  experienceStart: 'Web Development & Administration',

  avatarUrl: '/avatar.svg',

  interests: [
    'Web Development',
    'Pengembangan Sistem Digital',
    'Pengelolaan Data',
    'Data Entry & Data Verification',
    'Digitalisasi Arsip & Dokumen',
    'Administrasi Dokumen',
    'Administrasi Penjualan',
    'Customer Service',
    'F&B & Operasional'
  ],

  contact: {
    email: 'adityapermana2970@gmail.com',
    github: 'GITHUB_KAMU',
    linkedin: 'LINKEDIN_KAMU',
    location: 'Cirebon Jawa Barat, Indonesia'
  }
};

export const techStackData: TechItem[] = [
  {
    name: 'HTML',
    category: 'frontend',
    layer: 'client',
    iconKey: 'html5',
    color: '#e34f26',
    roleTag: 'Frontend Development',
    usageContext: 'Membangun struktur website yang semantik, terstruktur, dan responsif.',
    projectLinks: ['jokitugas-id', 'atul-buket', 'bagus-konstruksi', 'ukk-school-project']
  },

  {
    name: 'CSS',
    category: 'frontend',
    layer: 'client',
    iconKey: 'css3',
    color: '#1572b6',
    roleTag: 'UI Styling',
    usageContext: 'Membangun tampilan website responsif dengan layout modern dan konsisten.',
    projectLinks: ['jokitugas-id', 'atul-buket', 'bagus-konstruksi', 'ukk-school-project']
  },

  {
    name: 'JavaScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'javascript',
    color: '#f7df1e',
    roleTag: 'Web Programming',
    usageContext: 'Membangun interaksi, logika aplikasi, dan fitur dinamis pada website.',
    projectLinks: ['jokitugas-id', 'digital-cashier', 'ukk-school-project']
  },

  {
    name: 'TypeScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'typescript',
    color: '#3178c6',
    roleTag: 'Typed Development',
    usageContext: 'Membangun aplikasi React yang lebih terstruktur dan mudah dikembangkan.',
    projectLinks: ['jokitugas-id', 'bagus-konstruksi']
  },

  {
    name: 'React',
    category: 'frontend',
    layer: 'client',
    iconKey: 'react',
    color: '#61dafb',
    roleTag: 'Frontend Framework',
    usageContext: 'Membangun interface interaktif dan component-based.',
    projectLinks: ['jokitugas-id', 'bagus-konstruksi', 'atul-buket']
  },

  {
    name: 'Vite',
    category: 'frontend',
    layer: 'devops',
    iconKey: 'vite',
    color: '#646cff',
    roleTag: 'Build Tool',
    usageContext: 'Development dan build aplikasi frontend modern.',
    projectLinks: ['jokitugas-id', 'bagus-konstruksi', 'atul-buket']
  },

  {
    name: 'Tailwind CSS',
    category: 'frontend',
    layer: 'client',
    iconKey: 'tailwindcss',
    color: '#06b6d4',
    roleTag: 'UI Framework',
    usageContext: 'Membangun interface responsif dengan utility-first CSS.',
    projectLinks: ['jokitugas-id', 'bagus-konstruksi', 'atul-buket']
  },

  {
    name: 'PHP',
    category: 'backend',
    layer: 'backend',
    iconKey: 'php',
    color: '#777bb4',
    roleTag: 'Backend Development',
    usageContext: 'Membangun backend website dan sistem berbasis PHP.',
    projectLinks: ['sipandi', 'ukk-school-project']
  },

  {
    name: 'CodeIgniter',
    category: 'backend',
    layer: 'backend',
    iconKey: 'codeigniter',
    color: '#ef4223',
    roleTag: 'Backend Framework',
    usageContext: 'Membangun sistem informasi dengan arsitektur MVC menggunakan CodeIgniter 3.',
    projectLinks: ['sipandi']
  },

  {
    name: 'MySQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'mysql',
    color: '#4479a1',
    roleTag: 'Database',
    usageContext: 'Menyimpan dan mengelola data aplikasi secara terstruktur.',
    projectLinks: ['sipandi', 'ukk-school-project']
  },

  {
    name: 'Git & GitHub',
    category: 'tools',
    layer: 'devops',
    iconKey: 'github',
    color: '#ffffff',
    roleTag: 'Version Control',
    usageContext: 'Mengelola source code, repository, version control, dan deployment workflow.',
    projectLinks: ['jokitugas-id', 'sipandi', 'bagus-konstruksi']
  },

  {
    name: 'Figma',
    category: 'tools',
    layer: 'client',
    iconKey: 'figma',
    color: '#f24e1e',
    roleTag: 'UI/UX Design',
    usageContext: 'Membuat rancangan interface dan visual website sebelum development.',
    projectLinks: ['jokitugas-id']
  }
];

export const projectsData: Project[] = [
  {
    id: 'sipandi',
    title: 'SIPANDI — Sistem Peminjaman Arsip',
    subtitle: 'Sistem Informasi Peminjaman Arsip Disdukcapil',
    category: 'fullstack',
    summary: 'Sistem informasi untuk membantu proses peminjaman dan pengembalian arsip secara digital dan terstruktur.',
    description: 'SIPANDI dikembangkan untuk membantu pengelolaan peminjaman arsip, pencatatan data pengguna, stok opname, serta proses pengembalian dokumen. Sistem dikembangkan menggunakan CodeIgniter dan MySQL.',
    architecture: [
      'Login dan autentikasi pengguna',
      'Manajemen data peminjaman arsip',
      'Pencatatan pengembalian dokumen',
      'Manajemen stok opname',
      'Database MySQL',
      'Export data dan dokumentasi sistem'
    ],
    stack: [
      'PHP',
      'CodeIgniter 3',
      'MySQL',
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap'
    ],
    highlights: [
      'Membantu digitalisasi proses peminjaman arsip',
      'Pencarian dokumen menjadi lebih terstruktur',
      'Data peminjaman dan pengembalian tersimpan dalam database'
    ],
    challenges: 'Mengubah proses pencatatan arsip manual menjadi sistem digital yang lebih terstruktur dan mudah digunakan.',
    role: 'Web Developer',
    githubUrl: 'GITHUB_SIPANDI',
    demoUrl: 'DEMO_SIPANDI',
    isMobileApp: false,
    imageUrl: '/projects/sipandi.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Web Developer' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Framework', value: 'CodeIgniter 3' }
    ]
  },

  {
    id: 'jokitugas-id',
    title: 'JokiTugas ID',
    subtitle: 'Platform Digital Jasa Bantuan Tugas',
    category: 'fullstack',
    summary: 'Website modern untuk memperkenalkan layanan JokiTugas ID dengan sistem pemesanan yang diarahkan langsung ke WhatsApp.',
    description: 'JokiTugas ID merupakan platform website yang dirancang dengan tampilan modern dan responsif untuk menampilkan layanan, informasi pengerjaan, testimoni, serta alur pemesanan melalui WhatsApp.',
    architecture: [
      'Landing page modern',
      'Daftar layanan',
      'Detail layanan',
      'Order melalui WhatsApp',
      'Testimoni pelanggan',
      'Responsive mobile design',
      'Progressive Web App experience'
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'WhatsApp'
    ],
    highlights: [
      'Interface modern dan responsive',
      'Order langsung melalui WhatsApp',
      'Fokus pada pengalaman pengguna mobile'
    ],
    challenges: 'Membuat website layanan yang mudah dipahami dan mempermudah calon pelanggan melakukan pemesanan.',
    role: 'Frontend Developer',
    demoUrl: 'https://jokitugassid.vercel.app',
    isMobileApp: false,
    imageUrl: '/projects/jokitugas.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Frontend Developer' },
      { label: 'Stack', value: 'React + TypeScript' },
      { label: 'Status', value: 'Live' }
    ]
  },

  {
    id: 'bagus-konstruksi',
    title: 'PT Bagus Konstruksi Indonesia',
    subtitle: 'Website Company Profile & Digital Business',
    category: 'fullstack',
    summary: 'Website profesional untuk memperkuat kehadiran digital dan memperkenalkan layanan perusahaan konstruksi.',
    description: 'Website dikembangkan menggunakan teknologi frontend modern dengan fokus pada tampilan profesional, responsive design, struktur informasi yang jelas, dan optimasi untuk kebutuhan bisnis.',
    architecture: [
      'Responsive company profile',
      'Business information',
      'Service presentation',
      'Project showcase',
      'Contact integration',
      'SEO-friendly structure'
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'TanStack'
    ],
    highlights: [
      'Responsive pada desktop dan mobile',
      'Interface profesional untuk kebutuhan bisnis',
      'Struktur halaman yang mendukung SEO'
    ],
    challenges: 'Menyajikan informasi perusahaan secara profesional sekaligus menjaga performa dan pengalaman pengguna.',
    role: 'Web Developer',
    demoUrl: 'https://baguskonstruksi.site',
    isMobileApp: false,
    imageUrl: '/projects/bagus-konstruksi.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Web Developer' },
      { label: 'Framework', value: 'React' },
      { label: 'Status', value: 'Live' }
    ]
  },

  {
    id: 'atul-buket',
    title: 'Atul Buket Cirebon',
    subtitle: 'Website Pemesanan Buket',
    category: 'fullstack',
    summary: 'Website pemesanan buket yang memudahkan pelanggan memilih produk dan mengirim detail pesanan melalui WhatsApp.',
    description: 'Website dibuat untuk membantu bisnis buket memiliki katalog digital yang lebih profesional dengan alur pemesanan yang sederhana dan terintegrasi dengan WhatsApp.',
    architecture: [
      'Katalog produk',
      'Detail produk',
      'Pemilihan buket',
      'Pesan melalui WhatsApp',
      'Responsive design'
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'WhatsApp'
    ],
    highlights: [
      'Katalog produk digital',
      'Pemesanan langsung melalui WhatsApp',
      'Mobile-friendly interface'
    ],
    challenges: 'Membuat proses pemilihan produk dan pemesanan menjadi sederhana bagi pelanggan.',
    role: 'Web Developer',
    demoUrl: 'DEMO_ATUL_BUKET',
    isMobileApp: false,
    imageUrl: '/projects/atul-buket.png',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Role', value: 'Web Developer' },
      { label: 'Stack', value: 'React + Vite' },
      { label: 'Order', value: 'WhatsApp' }
    ]
  },

  {
    id: 'qr-menu-order',
    title: 'QR Menu & Order',
    subtitle: 'Digital Menu & Table Ordering System',
    category: 'fullstack',
    summary: 'Sistem menu digital yang memungkinkan pelanggan melakukan scan QR di meja, melihat menu, memilih pesanan, dan mengirim order ke sistem admin.',
    description: 'Sistem pemesanan digital untuk cafe dan restoran. Pelanggan melakukan scan QR code dari meja, melihat menu berdasarkan kategori, memilih produk, menentukan jumlah pesanan, kemudian mengirimkan pesanan. Admin menerima order secara real-time dan dapat memantau meja serta status pesanan.',
    architecture: [
      'QR code berbeda untuk setiap meja',
      'Digital menu',
      'Kategori menu',
      'Pencarian menu',
      'Detail produk dan pilihan',
      'Nomor meja',
      'Order management',
      'Admin dashboard',
      'Real-time order notification'
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Database',
      'QR Code'
    ],
    highlights: [
      'Pelanggan dapat memesan langsung dari meja',
      'Admin dapat menerima dan memantau order',
      'Tidak membutuhkan aplikasi tambahan dari pelanggan'
    ],
    challenges: 'Membuat alur pemesanan digital yang sederhana untuk pelanggan sekaligus mudah digunakan oleh admin restoran.',
    role: 'Full Stack Web Developer',
    demoUrl: 'DEMO_QR_ORDER',
    isMobileApp: false,
    imageUrl: '/projects/qr-order.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'System', value: 'QR Ordering' },
      { label: 'Platform', value: 'Web App' }
    ]
  },

  {
    id: 'qr-menu-order',
    title: 'QR Menu & Order',
    subtitle: 'Digital Menu & Table Ordering System',
    category: 'fullstack',
    summary: 'Sistem menu digital yang memungkinkan pelanggan melakukan scan QR di meja, melihat menu, memilih pesanan, dan mengirim order ke sistem admin.',
    description: 'Sistem pemesanan digital untuk cafe dan restoran. Pelanggan melakukan scan QR code dari meja, melihat menu berdasarkan kategori, memilih produk, menentukan jumlah pesanan, kemudian mengirimkan pesanan. Admin menerima order secara real-time dan dapat memantau meja serta status pesanan.',
    architecture: [
      'QR code berbeda untuk setiap meja',
      'Digital menu',
      'Kategori menu',
      'Pencarian menu',
      'Detail produk dan pilihan',
      'Nomor meja',
      'Order management',
      'Admin dashboard',
      'Real-time order notification'
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Database',
      'QR Code'
    ],
    highlights: [
      'Pelanggan dapat memesan langsung dari meja',
      'Admin dapat menerima dan memantau order',
      'Tidak membutuhkan aplikasi tambahan dari pelanggan'
    ],
    challenges: 'Membuat alur pemesanan digital yang sederhana untuk pelanggan sekaligus mudah digunakan oleh admin restoran.',
    role: 'Full Stack Web Developer',
    demoUrl: 'DEMO_QR_ORDER',
    isMobileApp: false,
    imageUrl: '/projects/qr-order.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'System', value: 'QR Ordering' },
      { label: 'Platform', value: 'Web App' }
    ]
  },

  {
    id: 'ukk-school-project',
    title: 'Sistem Pengaduan Sarana Sekolah',
    subtitle: 'Website Pengelolaan Pengaduan Fasilitas Sekolah',
    category: 'fullstack',
    summary: 'Aplikasi website untuk membantu sekolah mengelola pengaduan sarana dan fasilitas secara lebih terstruktur.',
    description: 'Sistem dikembangkan sebagai proyek Ujian Kompetensi Keahlian Rekayasa Perangkat Lunak untuk membantu proses penyampaian dan pengelolaan pengaduan sarana sekolah. Sistem dirancang dengan antarmuka sederhana agar mudah digunakan oleh pengguna.',
    architecture: [
      'Pengelolaan data pengaduan',
      'Form pengaduan sarana sekolah',
      'Manajemen data',
      'Interface sederhana dan responsif',
      'Database MySQL'
    ],
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'MySQL'
    ],
    highlights: [
      'Dikembangkan sebagai Project Ujian Kompetensi Keahlian',
      'Diuji dan dipresentasikan di hadapan penguji dari PT Len Industri Persero',
      'Memperoleh nilai Ujian Kompetensi Keahlian sebesar 90'
    ],
    challenges: 'Membangun sistem pengaduan yang mudah digunakan sekaligus mampu mengelola data laporan sarana sekolah secara terstruktur.',
    role: 'Web Developer',
    githubUrl: 'GITHUB_UKK_SCHOOL',
    demoUrl: 'DEMO_UKK_SCHOOL',
    isMobileApp: false,
    imageUrl: '/projects/ukk-school.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Role', value: 'Web Developer' },
      { label: 'Score', value: '90' },
      { label: 'Project', value: 'UKK RPL' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
  id: 'education-rpl',
  period: '2023 - 2026',
  role: 'Rekayasa Perangkat Lunak (RPL)',
  organization: 'SMK Bina Cendekia Cirebon',
  badge: 'Pendidikan',
  category: 'education',
  description:
    'Menempuh pendidikan Rekayasa Perangkat Lunak di SMK Bina Cendekia Cirebon dengan fokus pada pengembangan website, pemrograman, database, dan sistem digital.',
  highlights: [
    'Nilai Akhir Ujian Kompetensi Keahlian: 90',
    'Pengembangan website dan sistem digital',
    'Pembelajaran pemrograman dan database',
    'Anggota Organisasi Sinematografi'
  ],
  tech: [
    'HTML',
    'PHP',
    'CSS',
    'CodeIgniter 3',
    'React',
    'Git'
  ]
},

  {
  id: 'pkl-disdukcapil',
  period: '28 Apr - 29 Aug 2025',
  role: 'Kearsipan dan Pelayanan',
  organization: 'DisdukCapil Kota Cirebon',
  badge: 'PKL',
  category: 'project',
  description:
    'Melaksanakan praktik kerja lapangan pada bagian kearsipan dan pelayanan dengan menangani administrasi dokumen, digitalisasi arsip, pengelolaan data, verifikasi dokumen, serta membantu pengembangan sistem kearsipan sederhana.',
  highlights: [
    'Melayani sekitar 30–50 permohonan administrasi per hari',
    'Melakukan digitalisasi dan pengarsipan lebih dari 100 dokumen',
    'Mengelola data peminjaman dan pengembalian buku, berkas, dan dokumen',
    'Mengembangkan aplikasi sistem kearsipan sederhana',
    'Melakukan verifikasi dan pengecekan kelengkapan data dokumen',
    'Memberikan pelayanan dan arahan kepada masyarakat',
    'Bekerja sama dengan tim dalam proses pelayanan dan administrasi'
  ],
  tech: [
    'Data Entry',
    'Data Verification',
    'Digitalisasi Arsip',
    'Administrasi Dokumen',
    'Microsoft Office'
  ]
},

  {
  id: 'kedai-bintang',
  period: 'Jan - Mar 2026',
  role: 'Crew Outlet',
  organization: 'Kedai Bintang',
  badge: 'Work Experience',
  category: 'project',
  description:
    'Menangani pelayanan pelanggan, pencatatan pesanan, pengantaran makanan, persiapan makanan, delivery, serta membantu operasional outlet pada kondisi ramai.',
  highlights: [
    'Melayani pelanggan secara langsung dalam proses pemesanan makanan',
    'Mencatat dan mengelola pesanan pelanggan secara akurat',
    'Mengantarkan pesanan kepada pelanggan di tempat maupun melalui delivery',
    'Menyiapkan dan memasak makanan sesuai SOP',
    'Mengelola pesanan delivery',
    'Bekerja sama dengan tim saat jam operasional sibuk',
    'Mengembangkan sistem pemesanan digital berbasis scan barcode yang terintegrasi dengan WhatsApp'
  ],
  tech: [
    'Customer Service',
    'Order Management',
    'Barcode',
    'WhatsApp',
    'Digital System'
  ]
},

  {
  id: 'dimsum-narawi',
  period: 'Apr - Aug 2026',
  role: 'Kasir & Kitchen',
  organization: 'Dimsum Narawi',
  badge: 'Work Experience',
  category: 'project',
  description:
    'Menangani persiapan produk, proses pemesanan, transaksi, packing, pelayanan pelanggan, kebersihan outlet, dan kerja sama tim sesuai SOP.',
  highlights: [
    'Menyiapkan dan melakukan refill dimsum sebelum stok habis',
    'Memastikan kematangan produk sesuai SOP',
    'Menyiapkan dimsum goreng dan pangsit goreng',
    'Membuat dan melakukan refill saus mentai sesuai resep',
    'Menyiapkan pesanan dalam berbagai ukuran porsi',
    'Melakukan proses packing pesanan dengan cepat dan rapi',
    'Melakukan input pesanan dan pengecekan transaksi',
    'Melayani pelanggan dengan ramah dan profesional',
    'Menjaga kebersihan area outlet saat opening dan closing',
    'Bekerja sama dengan tim saat jam sibuk'
  ],
  tech: [
    'Point of Sale',
    'Customer Service',
    'Order Management',
    'Data Entry',
    'Teamwork',
    'SOP'
  ]
},
{
  id: 'cv-makmur-bersama-maju',
  period: 'Aug - Sep 2026',
  role: 'Admin Penjualan',
  organization: 'CV Makmur Bersama Maju',
  badge: 'Work Experience',
  category: 'project',
  description:
    'Menangani administrasi penjualan, pembuatan dokumen pengiriman, input data menggunakan Accurate dan IDOS, pengecekan dokumen, serta pengelolaan data dalam jumlah besar.',
  highlights: [
    'Membuat dan mencetak invoice, faktur, nota resmi tagihan, serta surat jalan',
    'Menginput dan mencetak surat pengepakan menggunakan sistem Accurate',
    'Melakukan pengecekan data surat pengepakan dengan sistem dan kondisi fisik barang',
    'Menginput nomor surat jalan dan nomor plat kendaraan',
    'Melakukan perhitungan kubikasi barang',
    'Melakukan pengecekan dan pengelompokan dokumen berdasarkan nama toko',
    'Menangani sekitar 100 surat jalan per hari',
    'Menangani sekitar 40–60 surat pengepakan per hari',
    'Mengoperasikan IDOS untuk input data order return',
    'Melakukan input dan verifikasi data secara teliti dan konsisten'
  ],
  tech: [
    'Accurate',
    'IDOS',
    'Microsoft Excel',
    'Data Entry',
    'Data Verification',
    'Administrasi Penjualan',
    'Invoice & Faktur',
    'Surat Jalan',
    'Surat Pengepakan'
  ]
},

  {
    id: 'ukk-school-project',
    period: '2026',
    role: 'Developer — Pengaduan Sarana Sekolah',
    organization: 'Proyek UKK RPL',
    badge: 'Project',
    category: 'project',
    description:
      'Mengembangkan sistem pengaduan sarana sekolah sebagai proyek kompetensi keahlian Rekayasa Perangkat Lunak.',
    highlights: [
      'Project diuji oleh PT Len Industri Persero',
      'Memperoleh nilai 90',
      'Mengembangkan sistem berbasis kebutuhan sekolah'
    ],
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'MySQL'
    ]
  },

  {
    id: 'portfolio-development',
    period: '2025 - Sekarang',
    role: 'Junior Web Developer',
    organization: 'Personal & Freelance Projects',
    badge: 'Development',
    category: 'project',
    description:
      'Mengembangkan berbagai website dan sistem digital untuk kebutuhan personal, bisnis, UMKM, dan portofolio menggunakan teknologi web modern.',
    highlights: [
      'Membangun website bisnis dan UMKM',
      'Mengembangkan sistem informasi',
      'Membuat interface responsive',
      'Integrasi pemesanan melalui WhatsApp',
      'Deployment menggunakan platform web modern'
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'PHP',
      'CodeIgniter',
      'MySQL',
      'GitHub'
    ]
  }
];

export const certificatesData: CertificateItem[] = [
  {
    id: 'sertifikat-ukk',
    title: 'Uji Kompetensi Keahlian Rekayasa Perangkat Lunak',
    issuer: 'SMK Bina Cendekia Cirebon',
    year: '2026',
    description:
      'Sertifikasi/pencapaian kompetensi dalam pengembangan sistem informasi dan aplikasi berbasis kebutuhan pengguna.',
    imageUrl: '/certificates/ukk.png'
  },

  {
    id: 'sertifikat-pkl',
    title: 'Praktik Kerja Lapangan',
    issuer: 'Disdukcapil Kota Cirebon',
    year: '2025',
    description:
      'Pengalaman praktik kerja lapangan dalam pengelolaan data, digitalisasi arsip, administrasi, pelayanan, dan pengembangan sistem sederhana.',
    imageUrl: '/certificates/pkl.png'
  },

  {
    id: 'sertifikat-rpl',
    title: 'Kompetensi Rekayasa Perangkat Lunak',
    issuer: 'SMK Bina Cendekia Cirebon',
    year: '2026',
    description:
      'Pencapaian pembelajaran dalam pemrograman, pengembangan website, database, dan sistem informasi.',
    imageUrl: '/certificates/rpl.png'
  }
];
