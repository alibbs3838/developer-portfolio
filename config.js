import { FaDiscord, FaGithub, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail } from "react-icons/hi";

export const config = {
    developer: {
        name: "MrBuyukbas",
    },
    social: {
        github: "alibbs3838",
        discord: "732520401527373884"
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: false, // Enable/disable Spotify recent tracks
    projects: [
        {
            id: 1,
            title: "Personal Portfolio Website",
            description: "A modern and responsive portfolio website to showcase my projects, skills, and experiences. Built with Next.js and styled using TailwindCSS, this site provides a seamless user experience and a clean design that adapts to all devices.",
            image: "/projects/portfolio-app.png",
            technologies: ["Next.js", "TailwindCSS", "Framer Motion", "Vercel"],
            github: "",
            demo: ""
        },
        {
            id: 2,
            title: "Code Share Website",
            description: "A platform that allows users to share and review their code and profiles.",
            image: "/projects/code-share-app.png",
            technologies: ["Next.js", "MongoDB", "Express"],
            demo: ""
        },
        {
            id: 3,
            title: "Efsane Bot",
            description: "Enhance your server, simplify moderation, and boost engagement with a versatile Discord bot equipped with customizable commands and powerful features.",
            image: "/projects/wytra-bot-app.png",
            technologies: ["React", "Discord.js", "Node.js", "MongoDB"],
            github: "https://github.com",
            demo: ""
        }
    ],
    skills: [
        {
            title: "Frontend",
            icon: <HiCode />,
            description: "Modern web interfaces",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "Next.js 15", level: "Advanced", hot: true },
                { name: "React", level: "Advanced" },
                { name: "TailwindCSS", level: "Expert" },
                { name: "JavaScript", level: "Advanced" },
                { name: "Framer Motion", level: "Intermediate" }
            ]
        },
        {
            title: "Backend",
            icon: <HiDatabase />,
            description: "Server & Database",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Node.js", level: "Advanced", hot: true },
                { name: "MongoDB", level: "Advanced" },
                { name: "Express.js", level: "Advanced", hot: true }
            ]
        },
        {
            title: "Programs & Tools",
            icon: <HiCube />,
            description: "Development & Productivity Tools",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "VS Code", level: "Expert", hot: true },
                { name: "Postman", level: "Advanced" },
                { name: "Photoshop", level: "Intermediate" },
                { name: "Git", level: "Advanced" }
            ]
        }
    ],
    contactInfo: [
        {
            icon: <FaDiscord className="w-5 h-5" />,
            label: "Discord",
            value: "MrBuyukbas",
            link: `https://discord.com/users/darkking6912`
        },
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@alibbs3838",
            link: `https://github.com/alibbs3838`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "38alibuyukbas@gmail.com",
            link: "mailto:38alibuyukbas@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "Turkey",
            link: null
        }
    ]
}