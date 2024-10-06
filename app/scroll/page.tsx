"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContentSection {
  title: string;
  description: string;
}

const SideBySidePinScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const contentSections: ContentSection[] = [
    { title: "Section 1", description: "Description for section 1" },
    { title: "Section 2", description: "Description for section 2" },
    { title: "Section 3", description: "Description for section 3" },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const navbarTextColor = useTransform(
    heroScrollProgress,
    [0, 1],
    ["#FFFFFF", "#000000"]
  );

  return (
    <div ref={containerRef} style={{ minHeight: "300vh" }}>
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          color: navbarTextColor,
          zIndex: 1000,
        }}
      >
        <span>Logo</span>
        <span style={{ marginLeft: "auto" }}>Menu</span>
      </motion.nav>

      <div ref={heroRef} style={{ height: "100vh", background: "#333" }}>
        <h1 style={{ color: "#FFF", margin: 0, padding: "80px 20px 20px" }}>
          Hero Section
        </h1>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "50%",
            position: "sticky",
            top: "60px",
            height: "calc(100vh - 60px)",
          }}
        >
          <motion.img
            src="/api/placeholder/400/600"
            alt="Pinned Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ width: "50%", padding: "20px" }}>
          {contentSections.map((section, index) => (
            <motion.div
              key={index}
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: useTransform(
                  scrollYProgress,
                  [
                    index / contentSections.length,
                    (index + 1) / contentSections.length,
                  ],
                  [0, 1]
                ),
              }}
            >
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBySidePinScroll;
